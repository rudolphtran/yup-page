export default function ProgramIntro() {
	return (
		<section id="intro" className="relative overflow-hidden bg-white py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-3xl text-center">
					{/* Section label */}
					<span className="mb-4 inline-block rounded-full bg-yup-50 px-4 py-1.5 text-sm font-semibold text-yup-dark">
						Giới thiệu chương trình
					</span>

					<h2 className="mb-6 text-3xl font-extrabold text-gray-900 md:text-5xl">
						Nhân <span className="text-gradient">10 lần</span> giá trị doanh nghiệp của bạn
					</h2>

					<p className="mb-8 text-lg leading-relaxed text-gray-600">
						<strong className="text-gray-900">&ldquo;10X Your Business&rdquo;</strong> là chương trình đào tạo
						chuyên sâu dành riêng cho các chủ doanh nghiệp và nhà quản lý, được thiết kế bởi đội ngũ chuyên gia
						hàng đầu tại YUP Education. Chương trình cung cấp hệ thống chiến lược, công cụ và tư duy đột phá giúp
						bạn tối ưu hóa vận hành và mở rộng quy mô doanh nghiệp một cách bền vững.
					</p>
				</div>

				{/* Highlights grid */}
				<div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
					{[
						{
							icon: (
								<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
								</svg>
							),
							title: "Tư duy đột phá",
							desc: "Thay đổi tư duy kinh doanh truyền thống, xây dựng tầm nhìn chiến lược cho sự tăng trưởng vượt bậc.",
						},
						{
							icon: (
								<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
								</svg>
							),
							title: "Chiến lược tăng trưởng",
							desc: "Hệ thống chiến lược đã được kiểm chứng giúp hàng trăm doanh nghiệp nhân 10 lần doanh thu.",
						},
						{
							icon: (
								<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
								</svg>
							),
							title: "Cộng đồng doanh nhân",
							desc: "Kết nối với mạng lưới doanh nhân thành công, chia sẻ kinh nghiệm và cơ hội hợp tác kinh doanh.",
						},
					].map((item) => (
						<div
							key={item.title}
							className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yup/20 hover:shadow-lg"
						>
							<div className="mb-4 inline-flex rounded-xl bg-yup-50 p-3 text-yup transition-colors group-hover:bg-yup group-hover:text-white">
								{item.icon}
							</div>
							<h3 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
							<p className="leading-relaxed text-gray-600">{item.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
