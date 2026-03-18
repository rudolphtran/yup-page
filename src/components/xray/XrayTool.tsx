"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import * as XLSX from "xlsx";
import {
	pillars,
	DIAGNOSIS_LEVELS,
	PILLAR_DIAGNOSIS,
	type AnswerValue,
	type Pillar,
} from "./data";

const LS_KEY = "yup-xray-data";

interface ActionPlanRow {
	pillar: string;
	criteria: string;
	consequence: string;
	action: string;
	deadline: string;
}

interface SavedData {
	businessName: string;
	answers: Record<number, AnswerValue>;
	actionPlans: ActionPlanRow[];
	savedAt: string;
}

/* ─────────────── helpers ─────────────── */
function getPillarDiagnosis(ratio: number) {
	if (ratio >= PILLAR_DIAGNOSIS.good.min) return PILLAR_DIAGNOSIS.good;
	if (ratio >= PILLAR_DIAGNOSIS.developing.min) return PILLAR_DIAGNOSIS.developing;
	if (ratio >= PILLAR_DIAGNOSIS.weak.min) return PILLAR_DIAGNOSIS.weak;
	return PILLAR_DIAGNOSIS.critical;
}

function getOverallDiagnosis(score: number) {
	return DIAGNOSIS_LEVELS.find((d) => score >= d.min && score <= d.max) ?? DIAGNOSIS_LEVELS[0];
}

const colorMap: Record<string, { bg: string; text: string; border: string; barBg: string }> = {
	red: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", barBg: "bg-red-500" },
	yellow: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", barBg: "bg-yellow-500" },
	blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", barBg: "bg-blue-500" },
	green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", barBg: "bg-green-500" },
	emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", barBg: "bg-emerald-500" },
};

/* ─────────────── types ─────────────── */
type Answers = Record<number, AnswerValue>;

/* ─────────────── component ─────────────── */
export default function XrayTool() {
	const totalSteps = pillars.length + 2; // intro + 5 pillars + result
	const [step, setStep] = useState(0);
	const [businessName, setBusinessName] = useState("");
	const [answers, setAnswers] = useState<Answers>({});
	const [actionPlans, setActionPlans] = useState<ActionPlanRow[]>(() => {
		const defaultRows: ActionPlanRow[] = pillars.map((p) => ({
			pillar: p.name,
			criteria: "",
			consequence: "",
			action: "",
			deadline: "",
		}));
		return defaultRows;
	});
	const [hasPrevious, setHasPrevious] = useState(false);

	/* ─────── localStorage: load on mount ─────── */
	useEffect(() => {
		try {
			const raw = localStorage.getItem(LS_KEY);
			if (!raw) return;
			const saved: SavedData = JSON.parse(raw);
			if (saved.businessName) setBusinessName(saved.businessName);
			if (saved.answers && typeof saved.answers === "object") {
				setAnswers(saved.answers);
			}
			if (Array.isArray(saved.actionPlans) && saved.actionPlans.length >= 1) {
				setActionPlans(saved.actionPlans);
			}
			setHasPrevious(true);
		} catch { /* ignore corrupt data */ }
	}, []);

	const answeredInPillar = (pillar: Pillar) =>
		pillar.criteria.filter((c) => answers[c.id] !== undefined).length;

	const allAnswered = pillars.every(
		(p) => answeredInPillar(p) === p.criteria.length,
	);

	/* ─────── localStorage: save when reaching results ─────── */
	useEffect(() => {
		if (step === totalSteps - 1 && allAnswered) {
			const data: SavedData = {
				businessName,
				answers,
				actionPlans,
				savedAt: new Date().toISOString(),
			};
			localStorage.setItem(LS_KEY, JSON.stringify(data));
		}
	}, [step, totalSteps, allAnswered, businessName, answers, actionPlans]);

	/* computed results */
	const results = useMemo(() => {
		const pillarResults = pillars.map((p) => {
			let score = 0;
			let co = 0;
			let dang = 0;
			let chua = 0;
			p.criteria.forEach((c) => {
				const a = answers[c.id];
				if (a === "co_he_thong") {
					score += 2;
					co++;
				} else if (a === "dang_xay_dung") {
					score += 1;
					dang++;
				} else {
					chua++;
				}
			});
			const maxScore = p.criteria.length * 2;
			const ratio = score / maxScore;
			return { pillar: p, score, maxScore, ratio, co, dang, chua, diagnosis: getPillarDiagnosis(ratio) };
		});

		const totalScore = pillarResults.reduce((s, r) => s + r.score, 0);
		const totalCo = pillarResults.reduce((s, r) => s + r.co, 0);
		const totalDang = pillarResults.reduce((s, r) => s + r.dang, 0);
		const totalChua = pillarResults.reduce((s, r) => s + r.chua, 0);

		return { pillarResults, totalScore, totalCo, totalDang, totalChua, overall: getOverallDiagnosis(totalScore) };
	}, [answers]);

	function setAnswer(criterionId: number, value: AnswerValue) {
		setAnswers((prev) => ({ ...prev, [criterionId]: value }));
	}

	const handleNext = useCallback(() => {
		if (step >= 1 && step <= pillars.length) {
			const pillar = pillars[step - 1];
			const firstUnanswered = pillar.criteria.find((c) => answers[c.id] === undefined);
			if (firstUnanswered) {
				const el = document.getElementById(`question-${firstUnanswered.id}`);
				if (el) {
					el.scrollIntoView({ behavior: "smooth", block: "center" });
					el.classList.add("ring-2", "ring-yup", "ring-offset-2");
					setTimeout(() => el.classList.remove("ring-2", "ring-yup", "ring-offset-2"), 2000);
				}
				return;
			}
			// All answered in this pillar — advance
			window.scrollTo({ top: 0, behavior: "smooth" });
			if (step < pillars.length) {
				setStep(step + 1);
			} else if (allAnswered) {
				setStep(totalSteps - 1);
			}
		}
	}, [step, answers, allAnswered, totalSteps]);

	const handleExportExcel = useCallback(() => {
		const wb = XLSX.utils.book_new();
		const date = new Date().toLocaleDateString("vi-VN");
		const bizLabel = businessName || "Doanh nghiệp";

		/* ═══ Sheet 1: Kết quả chẩn đoán ═══ */
		const ws1Data: (string | number)[][] = [];

		// Row 0: Title (will be merged A1:F1)
		ws1Data.push(["BẢN CHỤP X-QUANG DOANH NGHIỆP", "", "", "", "", ""]);
		// Row 1: Business name (merged A2:F2)
		ws1Data.push([bizLabel, "", "", "", "", ""]);
		// Row 2: Date + Score (merged A3:C3, D3:F3)
		ws1Data.push([`Ngày chẩn đoán: ${date}`, "", "", `Tổng điểm: ${results.totalScore}/100 — ${results.overall.label}`, "", ""]);
		// Row 3: Blank
		ws1Data.push([""]);
		// Row 4: Headers
		ws1Data.push(["STT", "Trụ cột", "Điểm", "Chẩn đoán", "Có hệ thống", "Đang xây dựng", "Chưa có"]);
		// Row 5–9: Data
		results.pillarResults.forEach((r, i) => {
			ws1Data.push([
				i + 1,
				r.pillar.name,
				`${r.score}/${r.maxScore}`,
				`${r.diagnosis.emoji} ${r.diagnosis.label}`,
				r.co,
				r.dang,
				r.chua,
			]);
		});
		// Row 10: Total
		ws1Data.push(["", "TỔNG CỘNG", `${results.totalScore}/100`, `${results.overall.emoji} ${results.overall.label}`, results.totalCo, results.totalDang, results.totalChua]);
		// Blank row
		ws1Data.push([""]);
		// Diagnostic scale
		ws1Data.push(["BẢNG THAM CHIẾU CHẨN ĐOÁN", "", "", "", "", "", ""]);
		DIAGNOSIS_LEVELS.forEach((level) => {
			const isCurrent = results.totalScore >= level.min && results.totalScore <= level.max;
			ws1Data.push([
				`${level.emoji} ${level.range} điểm`,
				level.label,
				level.description,
				"",
				"",
				"",
				isCurrent ? "◄ VỊ TRÍ CỦA BẠN" : "",
			]);
		});
		// Blank + footer
		ws1Data.push([""]);
		ws1Data.push(["© YUP Education — Tài liệu độc quyền, lưu hành nội bộ — Giải Mã 2026", "", "", "", "", "", ""]);

		const ws1 = XLSX.utils.aoa_to_sheet(ws1Data);
		ws1["!cols"] = [
			{ wch: 22 }, // A: STT / Scale
			{ wch: 28 }, // B: Trụ cột / Label
			{ wch: 50 }, // C: Điểm / Description
			{ wch: 22 }, // D: Chẩn đoán
			{ wch: 14 }, // E: Có HT
			{ wch: 14 }, // F: Đang XD
			{ wch: 18 }, // G: Chưa có
		];
		ws1["!merges"] = [
			{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }, // Title row
			{ s: { r: 1, c: 0 }, e: { r: 1, c: 6 } }, // Biz name row
			{ s: { r: 2, c: 0 }, e: { r: 2, c: 2 } }, // Date
			{ s: { r: 2, c: 3 }, e: { r: 2, c: 6 } }, // Score
			{ s: { r: 12, c: 0 }, e: { r: 12, c: 6 } }, // Scale header
			{ s: { r: 18, c: 0 }, e: { r: 18, c: 6 } }, // Footer
		];
		// Row heights for title
		ws1["!rows"] = [{ hpt: 32 }, { hpt: 24 }, { hpt: 20 }];
		XLSX.utils.book_append_sheet(wb, ws1, "Kết quả chẩn đoán");

		/* ═══ Sheet 2: Kế hoạch hành động ═══ */
		const ws2Data: (string | number)[][] = [];
		ws2Data.push(["KẾ HOẠCH HÀNH ĐỘNG 90 NGÀY", "", "", "", ""]);
		ws2Data.push([`${bizLabel} — Ngày lập: ${date}`, "", "", "", ""]);
		ws2Data.push([""]);
		ws2Data.push(["Trụ cột / Hạng mục", "Tiêu chí nổi bật", "Hậu quả đang xảy ra", "Hành động cụ thể", "Deadline"]);

		// Pillar-based rows sorted weakest first
		const sortedPillars = results.pillarResults.slice().sort((a, b) => a.ratio - b.ratio);
		sortedPillars.forEach((r) => {
			const rowIdx = pillars.findIndex((p) => p.id === r.pillar.id);
			const row = actionPlans[rowIdx];
			ws2Data.push([
				`${r.pillar.name} (${r.diagnosis.emoji} ${r.score}/${r.maxScore})`,
				row?.criteria || "",
				row?.consequence || "",
				row?.action || "",
				row?.deadline || "",
			]);
		});

		// Extra custom rows
		actionPlans.slice(pillars.length).forEach((row) => {
			ws2Data.push([
				row.pillar || "(Tự thêm)",
				row.criteria || "",
				row.consequence || "",
				row.action || "",
				row.deadline || "",
			]);
		});

		ws2Data.push([""]);
		ws2Data.push(["© YUP Education — Tài liệu độc quyền, lưu hành nội bộ — Giải Mã 2026", "", "", "", ""]);

		const ws2 = XLSX.utils.aoa_to_sheet(ws2Data);
		ws2["!cols"] = [
			{ wch: 35 }, // A
			{ wch: 30 }, // B
			{ wch: 30 }, // C
			{ wch: 35 }, // D
			{ wch: 16 }, // E
		];
		const lastActionRow = 4 + sortedPillars.length + actionPlans.slice(pillars.length).length + 1;
		ws2["!merges"] = [
			{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
			{ s: { r: 1, c: 0 }, e: { r: 1, c: 4 } },
			{ s: { r: lastActionRow, c: 0 }, e: { r: lastActionRow, c: 4 } },
		];
		ws2["!rows"] = [{ hpt: 30 }, { hpt: 22 }];
		XLSX.utils.book_append_sheet(wb, ws2, "Kế hoạch hành động");

		XLSX.writeFile(wb, `XQuang-${(businessName || "DoanhNghiep").replace(/\s+/g, "_")}-${new Date().toISOString().slice(0, 10)}.xlsx`);
	}, [businessName, actionPlans, results]);

	/* ─────── rendering ─────── */

	// Step 0: Intro
	if (step === 0) {
		return (
			<div className="mx-auto max-w-3xl py-16">
				{/* Header */}
				<div className="mb-12 text-center">
					<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-yup/10">
						<svg className="h-10 w-10 text-yup" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
						</svg>
					</div>
					<h1 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
						Bản chụp <span className="text-gradient">X-Quang</span> Doanh Nghiệp
					</h1>
					<p className="text-lg text-gray-500">
						50 tiêu chí &middot; 3 bậc &middot; Chẩn đoán sức khỏe doanh nghiệp
					</p>
				</div>

				{/* Instructions */}
				<div className="mb-10 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
					<h2 className="mb-6 text-lg font-bold text-gray-900">📋 Hướng dẫn sử dụng (20–30 phút)</h2>
					<div className="space-y-4">
						{[
							"Điền tên doanh nghiệp bên dưới.",
							"Với mỗi tiêu chí, đọc câu hỏi rồi chọn một trong 3 đáp án.",
							"Đọc mô tả 3 đáp án ở bên dưới nếu chưa chắc mình đang ở mức nào.",
							"Hoàn thành 50 câu hỏi, điểm số sẽ tự động hiện ra.",
							"Mang kết quả đến buổi đào tạo để YUP hỗ trợ lập Lộ trình hành động 90 ngày.",
						].map((text, i) => (
							<div key={i} className="flex items-start gap-3">
								<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yup text-xs font-bold text-white">
									{i + 1}
								</span>
								<span className="text-gray-600">{text}</span>
							</div>
						))}
					</div>
				</div>

				{/* Scoring legend */}
				<div className="mb-10 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
					<h2 className="mb-4 text-lg font-bold text-gray-900">🎯 Thang điểm &middot; Tổng tối đa 100 điểm</h2>
					<div className="space-y-3">
						<div className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3">
							<span className="text-xl">✅</span>
							<div>
								<span className="font-semibold text-green-800">Có hệ thống</span>
								<span className="ml-2 text-sm text-green-600">— 2 điểm</span>
								<p className="text-sm text-green-600">Đang làm tốt, nhất quán và có thể chứng minh</p>
							</div>
						</div>
						<div className="flex items-center gap-3 rounded-xl bg-yellow-50 px-4 py-3">
							<span className="text-xl">🔄</span>
							<div>
								<span className="font-semibold text-yellow-800">Đang xây dựng</span>
								<span className="ml-2 text-sm text-yellow-600">— 1 điểm</span>
								<p className="text-sm text-yellow-600">Đã bắt đầu nhưng chưa ổn định, còn phụ thuộc vào người</p>
							</div>
						</div>
						<div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3">
							<span className="text-xl">❌</span>
							<div>
								<span className="font-semibold text-red-800">Chưa có</span>
								<span className="ml-2 text-sm text-red-600">— 0 điểm</span>
								<p className="text-sm text-red-600">Chưa làm, làm theo cảm tính hoặc không biết bắt đầu từ đâu</p>
							</div>
						</div>
					</div>
				</div>

				{/* Business name input */}
				<div className="mb-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
					<label htmlFor="bizName" className="mb-2 block text-sm font-medium text-gray-700">
						Tên doanh nghiệp / cửa hàng
					</label>
					<input
						id="bizName"
						type="text"
						value={businessName}
						onChange={(e) => setBusinessName(e.target.value)}
						placeholder="VD: Công ty TNHH ABC"
						className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-yup focus:ring-1 focus:ring-yup"
					/>
				</div>

				<button
					onClick={() => setStep(1)}
					className="bg-yup hover:bg-yup-dark w-full rounded-xl py-4 text-lg font-bold text-white transition-all hover:scale-[1.01]"
				>
					{hasPrevious ? "Tiếp tục chẩn đoán (đã lưu lần trước)" : "Bắt đầu chẩn đoán"}
				</button>
			</div>
		);
	}

	// Steps 1–5: Pillar questions
	if (step >= 1 && step <= pillars.length) {
		const pillar = pillars[step - 1];
		const progress = answeredInPillar(pillar);

		return (
			<div className="mx-auto max-w-3xl py-12">
				{/* Progress overview */}
				<div className="mb-8">
					<div className="mb-3 flex items-center justify-between">
						<span className="text-sm font-medium text-gray-500">
							Trụ cột {step} / {pillars.length}
						</span>
						<span className="text-sm text-gray-400">
							{progress}/{pillar.criteria.length} câu hỏi
						</span>
					</div>
					{/* Step pills */}
					<div className="flex gap-1.5">
						{pillars.map((p, i) => (
							<button
								key={p.id}
								onClick={() => setStep(i + 1)}
								className={`h-2 flex-1 rounded-full transition-colors ${
									i + 1 === step
										? "bg-yup"
										: i + 1 < step
											? "bg-yup/40"
											: "bg-gray-200"
								}`}
							/>
						))}
					</div>
				</div>

				{/* Pillar header */}
				<div className="mb-8 rounded-2xl border border-yup/10 bg-yup-50 p-6">
					<div className="flex items-center gap-3">
						<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yup text-lg font-bold text-white">
							{pillar.id}
						</span>
						<div>
							<h2 className="text-xl font-bold text-gray-900">
								{pillar.name}
							</h2>
							<p className="text-sm text-gray-600">{pillar.description}</p>
						</div>
					</div>
				</div>

				{/* Questions */}
				<div className="space-y-6">
					{pillar.criteria.map((criterion) => {
						const selected = answers[criterion.id];
						return (
							<div
								key={criterion.id}
								id={`question-${criterion.id}`}
								className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
							>
								<div className="mb-4 flex items-start gap-3">
									<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
										{criterion.id}
									</span>
									<p className="font-medium text-gray-900">{criterion.question}</p>
								</div>

								<div className="space-y-2">
									{criterion.answers.map((opt) => {
										const isSelected = selected === opt.value;
										let borderColor = "border-gray-200 hover:border-gray-300";
										let bgColor = "bg-white";
										if (isSelected) {
											if (opt.value === "co_he_thong") {
												borderColor = "border-green-400";
												bgColor = "bg-green-50";
											} else if (opt.value === "dang_xay_dung") {
												borderColor = "border-yellow-400";
												bgColor = "bg-yellow-50";
											} else {
												borderColor = "border-red-400";
												bgColor = "bg-red-50";
											}
										}

										return (
											<button
												key={opt.value}
												type="button"
												onClick={() => setAnswer(criterion.id, opt.value)}
												className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${borderColor} ${bgColor}`}
											>
												<span className="mt-0.5 text-lg">{opt.emoji}</span>
												<div className="flex-1">
													<span className="text-sm font-semibold text-gray-900">
														{opt.label}
													</span>
													<span className="ml-2 text-xs text-gray-400">
														({opt.points} điểm)
													</span>
													<p className="mt-0.5 text-sm text-gray-500">
														{opt.description}
													</p>
												</div>
												{/* Radio */}
												<div className={`mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${isSelected ? "border-yup bg-yup" : "border-gray-300"}`}>
													{isSelected && (
														<svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
															<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
														</svg>
													)}
												</div>
											</button>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>

				{/* Navigation */}
				<div className="mt-10 flex gap-4">
					<button
						onClick={() => setStep(step - 1)}
						className="rounded-xl border-2 border-gray-200 px-6 py-3 font-semibold text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900"
					>
						Quay lại
					</button>
					<button
						onClick={handleNext}
						className="bg-yup hover:bg-yup-dark flex-1 rounded-xl py-3 font-bold text-white transition-all hover:scale-[1.01]"
					>
						{(() => {
							const unanswered = pillars[step - 1].criteria.filter((c) => answers[c.id] === undefined).length;
							if (unanswered > 0) return `Còn ${unanswered} câu chưa trả lời`;
							if (step < pillars.length) return "Tiếp theo →";
							return allAnswered ? "Xem kết quả chẩn đoán" : "Tiếp theo →";
						})()}
					</button>
				</div>
			</div>
		);
	}

	// Final step: Results
	return (
		<div className="mx-auto max-w-4xl py-12">
			{/* Header */}
			<div className="mb-10 text-center">
				<h1 className="mb-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
					📈 Kết Quả Chẩn Đoán
				</h1>
				{businessName && (
					<p className="text-lg text-gray-500">{businessName}</p>
				)}
			</div>

			{/* Overall score */}
			<div className="mb-10 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
				<h2 className="mb-6 text-center text-lg font-bold text-gray-500 uppercase tracking-wider">
					Kết quả tổng quan
				</h2>

				{/* Big score */}
				<div className="mb-8 flex flex-col items-center">
					<div className="relative mb-4">
						<svg className="h-48 w-48" viewBox="0 0 200 200">
							<circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" />
							<circle
								cx="100"
								cy="100"
								r="90"
								fill="none"
								stroke={results.totalScore >= 75 ? "#0b9444" : results.totalScore >= 60 ? "#3b82f6" : results.totalScore >= 40 ? "#eab308" : "#ef4444"}
								strokeWidth="12"
								strokeLinecap="round"
								strokeDasharray={`${(results.totalScore / 100) * 565.48} 565.48`}
								transform="rotate(-90 100 100)"
								className="transition-all duration-1000"
							/>
						</svg>
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<span className="text-5xl font-extrabold text-gray-900">
								{results.totalScore}
							</span>
							<span className="text-sm text-gray-400">/ 100 điểm</span>
						</div>
					</div>

					{/* Diagnosis label */}
					{(() => {
						const c = colorMap[results.overall.color] ?? colorMap.red;
						return (
							<div className={`rounded-xl px-6 py-3 text-center ${c.bg} ${c.border} border`}>
								<span className="text-2xl">{results.overall.emoji}</span>
								<span className={`ml-2 text-lg font-bold ${c.text}`}>
									{results.overall.label}
								</span>
								<p className={`mt-1 text-sm ${c.text} opacity-80`}>
									{results.overall.description}
								</p>
							</div>
						);
					})()}
				</div>

				{/* Summary stats */}
				<div className="grid grid-cols-3 gap-4 text-center">
					<div className="rounded-xl bg-green-50 p-4">
						<div className="text-2xl font-extrabold text-green-700">{results.totalCo}</div>
						<div className="text-xs text-green-600">✅ Có hệ thống</div>
					</div>
					<div className="rounded-xl bg-yellow-50 p-4">
						<div className="text-2xl font-extrabold text-yellow-700">{results.totalDang}</div>
						<div className="text-xs text-yellow-600">🔄 Đang xây dựng</div>
					</div>
					<div className="rounded-xl bg-red-50 p-4">
						<div className="text-2xl font-extrabold text-red-700">{results.totalChua}</div>
						<div className="text-xs text-red-600">❌ Chưa có</div>
					</div>
				</div>
			</div>

			{/* Per-pillar scores */}
			<div className="mb-10 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
				<h2 className="mb-6 text-center text-lg font-bold text-gray-500 uppercase tracking-wider">
					Điểm theo 5 trụ cột
				</h2>
				<div className="space-y-5">
					{results.pillarResults.map((r) => {
						const c = colorMap[r.diagnosis.color] ?? colorMap.red;
						return (
							<div key={r.pillar.id} className="rounded-xl border border-gray-100 p-5">
								<div className="mb-2 flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yup/10 text-sm font-bold text-yup">
											{r.pillar.id}
										</span>
										<span className="font-semibold text-gray-900">{r.pillar.name}</span>
									</div>
									<span className="text-sm font-bold text-gray-700">
										{r.score} / {r.maxScore}
									</span>
								</div>
								{/* Bar */}
								<div className="mb-2 h-3 overflow-hidden rounded-full bg-gray-100">
									<div
										className={`h-full rounded-full transition-all duration-700 ${c.barBg}`}
										style={{ width: `${r.ratio * 100}%` }}
									/>
								</div>
								{/* Diagnosis */}
								<div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${c.bg} ${c.text}`}>
									<span>{r.diagnosis.emoji}</span>
									<span>{r.diagnosis.label}</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Diagnosis scale reference */}
			<div className="mb-10 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
				<h2 className="mb-6 text-center text-lg font-bold text-gray-500 uppercase tracking-wider">
					Bảng chẩn đoán tổng thể
				</h2>
				<div className="space-y-3">
					{DIAGNOSIS_LEVELS.map((level) => {
						const c = colorMap[level.color] ?? colorMap.red;
						const isCurrentLevel = results.totalScore >= level.min && results.totalScore <= level.max;
						return (
							<div
								key={level.range}
								className={`flex items-start gap-4 rounded-xl border-2 p-4 transition-all ${
									isCurrentLevel
										? `${c.border} ${c.bg} shadow-md`
										: "border-transparent bg-gray-50"
								}`}
							>
								<span className="text-2xl">{level.emoji}</span>
								<div className="flex-1">
									<div className="flex items-center gap-2">
										<span className="text-sm font-bold text-gray-900">
											{level.range} điểm
										</span>
										<span className={`rounded-full px-2 py-0.5 text-xs font-bold ${c.bg} ${c.text}`}>
											{level.label}
										</span>
										{isCurrentLevel && (
											<span className="rounded-full bg-yup/10 px-2 py-0.5 text-xs font-bold text-yup">
												← Bạn đang ở đây
											</span>
										)}
									</div>
									<p className="mt-1 text-sm text-gray-600">{level.description}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Action Plan Table */}
			<div className="mb-10 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
				<h2 className="mb-2 text-center text-lg font-bold text-gray-500 uppercase tracking-wider">
					📝 Kế hoạch hành động 90 ngày
				</h2>
				<p className="mb-6 text-center text-sm text-gray-400">
					Điền vào bảng bên dưới để lập kế hoạch cải thiện cho từng trụ cột.
				</p>
				<div className="overflow-x-auto">
					<table className="w-full min-w-[800px] border-collapse text-sm">
						<thead>
							<tr className="bg-gray-50">
								<th className="border border-gray-200 px-3 py-3 text-left font-bold text-gray-700 w-[160px]">Trụ cột / Hạng mục</th>
								<th className="border border-gray-200 px-3 py-3 text-left font-bold text-gray-700">Tiêu chí nổi bật</th>
								<th className="border border-gray-200 px-3 py-3 text-left font-bold text-gray-700">Hậu quả đang xảy ra</th>
								<th className="border border-gray-200 px-3 py-3 text-left font-bold text-gray-700">Hành động cụ thể</th>
								<th className="border border-gray-200 px-3 py-3 text-left font-bold text-gray-700 w-[120px]">Deadline</th>
								<th className="border border-gray-200 px-3 py-3 w-[40px]"></th>
							</tr>
						</thead>
						<tbody>
							{/* Pillar rows sorted weakest first */}
							{results.pillarResults
								.slice()
								.sort((a, b) => a.ratio - b.ratio)
								.map((r) => {
									const c = colorMap[r.diagnosis.color] ?? colorMap.red;
									const rowIdx = pillars.findIndex((p) => p.id === r.pillar.id);
									const row = actionPlans[rowIdx];
									const update = (field: keyof ActionPlanRow, val: string) => {
										setActionPlans((prev) => {
											const next = [...prev];
											next[rowIdx] = { ...next[rowIdx], [field]: val };
											return next;
										});
									};
									return (
										<tr key={r.pillar.id} className="align-top">
											<td className="border border-gray-200 px-3 py-2">
												<div className="font-semibold text-gray-900">{r.pillar.name}</div>
												<div className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${c.bg} ${c.text}`}>
													{r.diagnosis.emoji} {r.score}/{r.maxScore}
												</div>
											</td>
											<td className="border border-gray-200 px-3 py-2">
												<textarea
													value={row?.criteria ?? ""}
													onChange={(e) => update("criteria", e.target.value)}
													placeholder="VD: Chưa có báo cáo dòng tiền..."
													rows={2}
													className="w-full resize-none rounded-lg border border-gray-100 px-2 py-1.5 text-sm outline-none focus:border-yup focus:ring-1 focus:ring-yup"
												/>
											</td>
											<td className="border border-gray-200 px-3 py-2">
												<textarea
													value={row?.consequence ?? ""}
													onChange={(e) => update("consequence", e.target.value)}
													placeholder="VD: Hết tiền mặt giữa tháng..."
													rows={2}
													className="w-full resize-none rounded-lg border border-gray-100 px-2 py-1.5 text-sm outline-none focus:border-yup focus:ring-1 focus:ring-yup"
												/>
											</td>
											<td className="border border-gray-200 px-3 py-2">
												<textarea
													value={row?.action ?? ""}
													onChange={(e) => update("action", e.target.value)}
													placeholder="VD: Lập bảng cash flow hàng tuần..."
													rows={2}
													className="w-full resize-none rounded-lg border border-gray-100 px-2 py-1.5 text-sm outline-none focus:border-yup focus:ring-1 focus:ring-yup"
												/>
											</td>
											<td className="border border-gray-200 px-3 py-2">
												<input
													type="date"
													value={row?.deadline ?? ""}
													onChange={(e) => update("deadline", e.target.value)}
													className="w-full rounded-lg border border-gray-100 px-2 py-1.5 text-sm outline-none focus:border-yup focus:ring-1 focus:ring-yup"
												/>
											</td>
											<td className="border border-gray-200 px-1 py-2 text-center"></td>
										</tr>
									);
								})}
							{/* User-added custom rows */}
							{actionPlans.slice(pillars.length).map((row, i) => {
								const absIdx = pillars.length + i;
								const update = (field: keyof ActionPlanRow, val: string) => {
									setActionPlans((prev) => {
										const next = [...prev];
										next[absIdx] = { ...next[absIdx], [field]: val };
										return next;
									});
								};
								return (
									<tr key={`custom-${i}`} className="align-top bg-yup-50/30">
										<td className="border border-gray-200 px-3 py-2">
											<input
												type="text"
												value={row.pillar}
												onChange={(e) => update("pillar", e.target.value)}
												placeholder="Tên hạng mục..."
												className="w-full rounded-lg border border-gray-100 px-2 py-1.5 text-sm font-semibold text-gray-900 outline-none focus:border-yup focus:ring-1 focus:ring-yup"
											/>
										</td>
										<td className="border border-gray-200 px-3 py-2">
											<textarea value={row.criteria} onChange={(e) => update("criteria", e.target.value)} placeholder="Tiêu chí..." rows={2} className="w-full resize-none rounded-lg border border-gray-100 px-2 py-1.5 text-sm outline-none focus:border-yup focus:ring-1 focus:ring-yup" />
										</td>
										<td className="border border-gray-200 px-3 py-2">
											<textarea value={row.consequence} onChange={(e) => update("consequence", e.target.value)} placeholder="Hậu quả..." rows={2} className="w-full resize-none rounded-lg border border-gray-100 px-2 py-1.5 text-sm outline-none focus:border-yup focus:ring-1 focus:ring-yup" />
										</td>
										<td className="border border-gray-200 px-3 py-2">
											<textarea value={row.action} onChange={(e) => update("action", e.target.value)} placeholder="Hành động..." rows={2} className="w-full resize-none rounded-lg border border-gray-100 px-2 py-1.5 text-sm outline-none focus:border-yup focus:ring-1 focus:ring-yup" />
										</td>
										<td className="border border-gray-200 px-3 py-2">
											<input type="date" value={row.deadline} onChange={(e) => update("deadline", e.target.value)} className="w-full rounded-lg border border-gray-100 px-2 py-1.5 text-sm outline-none focus:border-yup focus:ring-1 focus:ring-yup" />
										</td>
										<td className="border border-gray-200 px-1 py-2 text-center">
											<button
												type="button"
												onClick={() => setActionPlans((prev) => prev.filter((_, idx) => idx !== absIdx))}
												className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
												title="Xóa hàng"
											>
												<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
													<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{/* Add row button */}
				<button
					type="button"
					onClick={() => setActionPlans((prev) => [...prev, { pillar: "", criteria: "", consequence: "", action: "", deadline: "" }])}
					className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:border-yup hover:text-yup"
				>
					<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
					</svg>
					Thêm hàng mới
				</button>
			</div>

			{/* Export & CTA */}
			<div className="rounded-2xl border border-yup/20 bg-yup-50 p-8 text-center">
				<p className="mb-4 text-lg font-bold text-gray-900">
					💡 Mang kết quả này đến buổi đào tạo — YUP sẽ hỗ trợ thiết kế Lộ trình hành động 90 ngày cho riêng bạn.
				</p>
				<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
					<button
						onClick={handleExportExcel}
						className="inline-flex items-center gap-2 rounded-xl border-2 border-yup px-6 py-3 font-semibold text-yup transition-colors hover:bg-yup hover:text-white"
					>
						<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						Tải xuống Excel
					</button>
					<button
						onClick={() => {
							setStep(0);
							// Keep previous answers for autofill — don't clear answers
						}}
						className="rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:border-yup hover:text-yup"
					>
						Làm lại từ đầu
					</button>
					{/* <a
						href="/#register"
						className="bg-yup hover:bg-yup-dark inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-white transition-all hover:scale-[1.02]"
					>
						Đăng ký chương trình 10X Your Business
						<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a> */}
				</div>
			</div>

			<p className="mt-8 text-center text-xs text-gray-400">
				© YUP Education &middot; Tài liệu độc quyền – Lưu hành nội bộ &middot; Giải Mã 2026
			</p>
		</div>
	);
}
