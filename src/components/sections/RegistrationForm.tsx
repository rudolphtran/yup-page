"use client";

import { useState, type FormEvent } from "react";

const revenueOptions = [
	"Dưới 1 tỷ / năm",
	"1 - 5 tỷ / năm",
	"5 - 20 tỷ / năm",
	"20 - 100 tỷ / năm",
	"Trên 100 tỷ / năm",
];

export default function RegistrationForm() {
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setError("");

		const formData = new FormData(e.currentTarget);
		const data = {
			fullName: formData.get("fullName"),
			phone: formData.get("phone"),
			email: formData.get("email"),
			industry: formData.get("industry"),
			revenue: formData.get("revenue"),
		};

		try {
			const res = await fetch("/api/registrations", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				const body = await res.json();
				throw new Error(body.error || "Đã có lỗi xảy ra");
			}

			setSubmitted(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra, vui lòng thử lại.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<section id="register" className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24">
			{/* Decorative */}
			<div className="absolute top-0 left-0 h-full w-full opacity-30">
				<div className="absolute top-10 left-1/4 h-64 w-64 rounded-full bg-yup/20 blur-3xl" />
				<div className="absolute right-1/4 bottom-10 h-64 w-64 rounded-full bg-yup/15 blur-3xl" />
			</div>

			<div className="container relative z-10 mx-auto px-4">
				<div className="mx-auto mb-12 max-w-3xl text-center">
					<span className="mb-4 inline-block rounded-full border border-yup/30 bg-yup/10 px-4 py-1.5 text-sm font-semibold text-yup-light">
						Đăng ký tham gia
					</span>
					<h2 className="mb-4 text-3xl font-extrabold text-white md:text-5xl">
						Sẵn sàng bắt đầu hành trình <span className="text-gradient">10X YOUR BIZ?</span>
					</h2>
					<p className="text-lg text-gray-400">
						Hãy cho phép bản thân được dừng lại để nhìn rõ hơn con đường phía trước. Điền thông tin bên dưới, đội ngũ YUP sẽ liên hệ xác nhận trong vòng 24 giờ.
					</p>
				</div>

				<div className="mx-auto max-w-xl">
					{submitted ? (
						<div className="rounded-2xl border border-yup/30 bg-yup/10 p-8 text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yup">
								<svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
								</svg>
							</div>
							<h3 className="mb-2 text-2xl font-bold text-white">Đăng ký thành công!</h3>
							<p className="text-gray-400">
								Cảm ơn bạn đã đăng ký. Đội ngũ YUP Education sẽ liên hệ với bạn trong thời gian sớm nhất.
							</p>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
							{/* Họ tên */}
							<div>
								<label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-gray-300">
									Họ và tên <span className="text-red-400">*</span>
								</label>
								<input
									id="fullName"
									name="fullName"
									type="text"
									required
									placeholder="Nguyễn Văn A"
									className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-yup focus:ring-1 focus:ring-yup"
								/>
							</div>

							{/* Số điện thoại */}
							<div>
								<label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-300">
									Số điện thoại <span className="text-red-400">*</span>
								</label>
								<input
									id="phone"
									name="phone"
									type="tel"
									required
									placeholder="0912 345 678"
									className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-yup focus:ring-1 focus:ring-yup"
								/>
							</div>

							{/* Email */}
							<div>
								<label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
									Email <span className="text-red-400">*</span>
								</label>
								<input
									id="email"
									name="email"
									type="email"
									required
									placeholder="email@company.com"
									className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-yup focus:ring-1 focus:ring-yup"
								/>
							</div>

							{/* Ngành nghề kinh doanh */}
							<div>
								<label htmlFor="industry" className="mb-1.5 block text-sm font-medium text-gray-300">
									Ngành nghề kinh doanh <span className="text-red-400">*</span>
								</label>
								<input
									id="industry"
									name="industry"
									type="text"
									required
									placeholder="VD: F&B, Bất động sản, Công nghệ..."
									className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-yup focus:ring-1 focus:ring-yup"
								/>
							</div>

							{/* Quy mô doanh thu */}
							<div>
								<label htmlFor="revenue" className="mb-1.5 block text-sm font-medium text-gray-300">
									Quy mô doanh thu <span className="text-red-400">*</span>
								</label>
								<select
									id="revenue"
									name="revenue"
									required
									defaultValue=""
									className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-yup focus:ring-1 focus:ring-yup [&>option]:text-gray-900"
								>
									<option value="" disabled>
										Chọn quy mô doanh thu
									</option>
									{revenueOptions.map((opt) => (
										<option key={opt} value={opt}>
											{opt}
										</option>
									))}
								</select>
							</div>

							<button
								type="submit"
								disabled={loading}
								className="bg-yup hover:bg-yup-dark w-full rounded-xl py-3.5 text-lg font-bold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
							>
								{loading ? (
									<span className="inline-flex items-center gap-2">
										<svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
										</svg>
										Đang gửi...
									</span>
								) : (
									"Đăng ký ngay"
								)}
							</button>

							<p className="text-center text-xs text-gray-500">
								Thông tin của bạn được bảo mật và chỉ sử dụng cho mục đích liên hệ.
							</p>

							{error && (
								<p className="rounded-lg bg-red-500/10 px-4 py-2 text-center text-sm text-red-400">
									{error}
								</p>
							)}
						</form>
					)}
				</div>
			</div>
		</section>
	);
}
