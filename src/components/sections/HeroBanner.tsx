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
						<span className="text-sm font-medium text-yup-dark">Hành trình 3 ngày chuyển hóa</span>
					</div>

					{/* Headline */}
					<h1 className="animate-fade-in-up animation-delay-200 mb-4 text-4xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
						<span className="text-gradient">10X</span> Your Biz
					</h1>

					<p className="animate-fade-in-up animation-delay-300 mb-8 text-xl font-semibold text-gray-800 md:text-2xl">
						Kiến tạo sự tự do và bứt phá đích thực
					</p>

					{/* Subtitle */}
					<p className="animate-fade-in-up animation-delay-400 mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
						Giữa những guồng quay không ngừng nghỉ của công việc, đã bao giờ bạn dừng lại và tự hỏi:{" "}
						<strong className="text-gray-900">
							Liệu mình đang thực sự làm chủ doanh nghiệp, hay đang vô tình trở thành người làm thuê mẫn cán nhất cho chính đứa con tinh thần của mình?
						</strong>
					</p>

					<p className="animate-fade-in-up animation-delay-400 mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
						Hành trình 3 ngày &ldquo;10X YOUR BIZ&rdquo; không phải là nơi hướng dẫn bạn cách làm việc nhiều hơn để kiếm thêm tiền. Đây là khoảng không gian để bạn đập bỏ lối mòn của sự cật lực, sắp xếp lại tâm thức và nhận ra rằng:{" "}
						<strong className="text-gray-900">
							Sự bứt phá gấp 10 lần (10X) đôi khi lại nhẹ nhàng và tĩnh tại hơn rất nhiều so với việc cố gắng đạt KPI áp lực hiện tại.
						</strong>
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
							href="#audience"
							className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all hover:border-yup hover:text-yup"
						>
							Tìm hiểu thêm
						</a>
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
