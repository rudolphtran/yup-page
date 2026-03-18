export default function HeroBanner() {
	return (
		<section className="hero-pattern relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
			{/* Decorative elements */}
			<div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-yup/5 blur-3xl" />
			<div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-yup/8 blur-3xl" />
			<div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yup/3 blur-3xl" />

			<div className="container relative z-10 mx-auto px-4 py-32">
				<div className="mx-auto max-w-4xl text-center">
					{/* Badge */}
					<div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-yup/20 bg-yup-50 px-4 py-2">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yup opacity-75" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-yup" />
						</span>
						<span className="text-sm font-medium text-yup-dark">Chương trình đặc biệt 2026</span>
					</div>

					{/* Headline */}
					<h1 className="animate-fade-in-up animation-delay-200 mb-6 text-5xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-7xl lg:text-8xl">
						<span className="text-gradient">10X</span> Your{" "}
						<span className="relative">
							Business
							<svg
								className="absolute -bottom-2 left-0 w-full"
								viewBox="0 0 300 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8"
									stroke="#0b9444"
									strokeWidth="3"
									strokeLinecap="round"
								/>
							</svg>
						</span>
					</h1>

					{/* Subtitle */}
					<p className="animate-fade-in-up animation-delay-400 mx-auto mb-8 max-w-2xl text-lg text-gray-600 md:text-xl">
						Chương trình đào tạo chuyên sâu giúp doanh nghiệp <strong className="text-gray-900">tăng trưởng đột phá gấp 10 lần</strong> với chiến lược bài bản và đội ngũ chuyên gia hàng đầu.
					</p>

					{/* CTA */}
					<div className="animate-fade-in-up animation-delay-600 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<a
							href="#register"
							className="animate-pulse-glow bg-yup hover:bg-yup-dark inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105"
						>
							Đăng ký tham gia
							<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</a>
						<a
							href="#content"
							className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all hover:border-yup hover:text-yup"
						>
							Xem chi tiết
						</a>
					</div>

					{/* Stats */}
					<div className="animate-fade-in-up animation-delay-800 mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
						{[
							{ value: "500+", label: "Doanh nghiệp đã tham gia" },
							{ value: "95%", label: "Hài lòng sau khóa học" },
							{ value: "10X", label: "Tăng trưởng trung bình" },
							{ value: "50+", label: "Chuyên gia đồng hành" },
						].map((stat) => (
							<div key={stat.label} className="text-center">
								<div className="text-gradient text-3xl font-extrabold md:text-4xl">{stat.value}</div>
								<div className="mt-1 text-sm text-gray-500">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
				<svg className="h-6 w-6 text-yup" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
			</div>
		</section>
	);
}
