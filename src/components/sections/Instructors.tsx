const instructors = [
	{
		name: "Nguyễn Văn Minh",
		role: "CEO & Founder, YUP Education",
		bio: "Hơn 15 năm kinh nghiệm trong lĩnh vực đào tạo doanh nghiệp. Đã training cho hơn 300+ doanh nghiệp trên khắp Việt Nam.",
		expertise: ["Chiến lược kinh doanh", "Leadership", "Business Scaling"],
	},
	{
		name: "Trần Thị Hương",
		role: "Giám đốc Đào tạo, YUP Education",
		bio: "Chuyên gia về hệ thống vận hành và quản trị nhân sự. 12 năm kinh nghiệm tư vấn cho các tập đoàn lớn tại Việt Nam.",
		expertise: ["Operations", "HR Management", "Process Optimization"],
	},
	{
		name: "Lê Hoàng Phúc",
		role: "Giám đốc Marketing, YUP Education",
		bio: "Chuyên gia marketing với hơn 10 năm kinh nghiệm. Đã giúp hàng trăm doanh nghiệp tăng trưởng doanh thu đột phá.",
		expertise: ["Digital Marketing", "Growth Hacking", "Brand Strategy"],
	},
];

export default function Instructors() {
	return (
		<section id="instructors" className="bg-gray-50 py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<span className="mb-4 inline-block rounded-full bg-yup-50 px-4 py-1.5 text-sm font-semibold text-yup-dark">
						Đội ngũ giảng viên
					</span>
					<h2 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl">
						Chuyên gia <span className="text-gradient">hàng đầu</span>
					</h2>
					<p className="text-lg text-gray-600">
						Đội ngũ giảng viên giàu kinh nghiệm thực chiến, đã đồng hành cùng hàng trăm doanh nghiệp trên con đường tăng trưởng.
					</p>
				</div>

				<div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
					{instructors.map((inst) => (
						<div
							key={inst.name}
							className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yup/20 hover:shadow-lg"
						>
							{/* Avatar placeholder */}
							<div className="relative h-56 bg-gradient-to-br from-yup/10 to-yup/5">
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-yup/10 shadow-lg">
										<svg className="h-14 w-14 text-yup/40" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
										</svg>
									</div>
								</div>
								{/* Green accent bar */}
								<div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-yup to-yup-light transition-all duration-300 group-hover:h-1.5" />
							</div>

							<div className="p-6">
								<h3 className="text-xl font-bold text-gray-900">{inst.name}</h3>
								<p className="mb-3 text-sm font-medium text-yup">{inst.role}</p>
								<p className="mb-4 text-sm leading-relaxed text-gray-600">{inst.bio}</p>

								<div className="flex flex-wrap gap-2">
									{inst.expertise.map((exp) => (
										<span
											key={exp}
											className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600"
										>
											{exp}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
