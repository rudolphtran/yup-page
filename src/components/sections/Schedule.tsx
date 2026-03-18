const timeline = [
	{
		phase: "Giai đoạn 1",
		date: "15 - 17 Tháng 5, 2026",
		title: "Nền tảng & Chiến lược",
		desc: "Xây dựng tầm nhìn, phân tích thị trường và thiết lập chiến lược tăng trưởng 10X.",
		icon: (
			<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
			</svg>
		),
	},
	{
		phase: "Giai đoạn 2",
		date: "12 - 14 Tháng 6, 2026",
		title: "Hệ thống & Vận hành",
		desc: "Hệ thống hóa doanh nghiệp, xây dựng quy trình chuẩn và KPI cho từng bộ phận.",
		icon: (
			<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
			</svg>
		),
	},
	{
		phase: "Giai đoạn 3",
		date: "10 - 12 Tháng 7, 2026",
		title: "Tăng trưởng & Mở rộng",
		desc: "Marketing đột phá, chiến lược bán hàng và mở rộng quy mô doanh nghiệp.",
		icon: (
			<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
			</svg>
		),
	},
];

export default function Schedule() {
	return (
		<section id="schedule" className="relative overflow-hidden bg-white py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<span className="mb-4 inline-block rounded-full bg-yup-50 px-4 py-1.5 text-sm font-semibold text-yup-dark">
						Thời gian diễn ra
					</span>
					<h2 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl">
						Lộ trình <span className="text-gradient">3 giai đoạn</span>
					</h2>
					<p className="text-lg text-gray-600">
						Mỗi giai đoạn kéo dài 3 ngày chuyên sâu, kết hợp lý thuyết và thực hành ngay tại lớp.
					</p>
				</div>

				{/* Timeline */}
				<div className="mx-auto max-w-4xl">
					<div className="relative">
						{/* Vertical line */}
						<div className="absolute top-0 left-6 hidden h-full w-0.5 bg-gradient-to-b from-yup/20 via-yup to-yup/20 md:left-1/2 md:block" />

						<div className="space-y-12">
							{timeline.map((item, i) => (
								<div key={item.phase} className="relative">
									{/* Connector dot */}
									<div className="absolute top-6 left-6 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-yup shadow-md md:left-1/2 md:block" />

									<div
										className={`flex flex-col gap-6 md:flex-row md:items-start ${
											i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
										}`}
									>
										{/* Content card */}
										<div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
											<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-yup/20 hover:shadow-lg">
												<div className={`mb-3 flex items-center gap-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
													<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yup text-white">
														{item.icon}
													</div>
													<span className="text-sm font-semibold text-yup">{item.phase}</span>
												</div>
												<div className="mb-2 text-sm font-medium text-gray-500">{item.date}</div>
												<h3 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
												<p className="text-gray-600">{item.desc}</p>
											</div>
										</div>

										{/* Empty space for the other side */}
										<div className="hidden md:block md:w-1/2" />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Location note */}
				<div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-yup/20 bg-yup-50 p-6 text-center">
					<div className="mb-2 flex items-center justify-center gap-2">
						<svg className="h-5 w-5 text-yup" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
							<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
						</svg>
						<span className="font-bold text-gray-900">Địa điểm tổ chức</span>
					</div>
					<p className="text-gray-600">TP. Hồ Chí Minh &mdash; Thông tin chi tiết sẽ được gửi sau khi đăng ký</p>
				</div>
			</div>
		</section>
	);
}
