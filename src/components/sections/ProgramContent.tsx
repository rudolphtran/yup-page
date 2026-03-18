const modules = [
	{
		number: "01",
		title: "Xây dựng tầm nhìn & chiến lược",
		desc: "Thiết lập mục tiêu rõ ràng, xây dựng chiến lược kinh doanh bài bản và roadmap tăng trưởng 10X.",
		topics: ["Phân tích thị trường", "Định vị thương hiệu", "Mô hình kinh doanh"],
	},
	{
		number: "02",
		title: "Hệ thống hóa vận hành",
		desc: "Tối ưu hóa quy trình, xây dựng hệ thống vận hành tự động giúp doanh nghiệp hoạt động hiệu quả.",
		topics: ["Quy trình chuẩn hóa", "KPI & OKR", "Tự động hóa"],
	},
	{
		number: "03",
		title: "Marketing & bán hàng đột phá",
		desc: "Chiến lược marketing đa kênh, xây dựng phễu bán hàng và kỹ thuật chuyển đổi hiệu quả.",
		topics: ["Digital Marketing", "Sales Funnel", "Content Strategy"],
	},
	{
		number: "04",
		title: "Quản trị tài chính & nhân sự",
		desc: "Xây dựng đội ngũ mạnh, quản trị dòng tiền và tài chính doanh nghiệp một cách thông minh.",
		topics: ["Quản trị nhân sự", "Dòng tiền", "Văn hóa doanh nghiệp"],
	},
	{
		number: "05",
		title: "Mở rộng & nhân bản mô hình",
		desc: "Chiến lược mở rộng thị trường, nhân bản mô hình kinh doanh và xây dựng hệ sinh thái.",
		topics: ["Franchise & License", "Mở rộng thị trường", "Partnership"],
	},
];

export default function ProgramContent() {
	return (
		<section id="content" className="relative bg-gray-50 py-24">
			{/* Decorative */}
			<div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-yup/20 to-transparent" />

			<div className="container mx-auto px-4">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<span className="mb-4 inline-block rounded-full bg-yup-50 px-4 py-1.5 text-sm font-semibold text-yup-dark">
						Nội dung chương trình
					</span>
					<h2 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl">
						5 Module <span className="text-gradient">đột phá</span>
					</h2>
					<p className="text-lg text-gray-600">
						Chương trình được thiết kế theo lộ trình rõ ràng, từ nền tảng đến nâng cao, giúp bạn ứng dụng ngay vào doanh nghiệp.
					</p>
				</div>

				<div className="mx-auto max-w-4xl space-y-6">
					{modules.map((mod) => (
						<div
							key={mod.number}
							className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-yup/20 hover:shadow-lg md:p-8"
						>
							{/* Number accent */}
							<div className="absolute -top-4 -right-4 text-8xl font-extrabold text-yup/5 transition-colors group-hover:text-yup/10">
								{mod.number}
							</div>

							<div className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
								{/* Number badge */}
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yup text-lg font-bold text-white">
									{mod.number}
								</div>

								<div className="flex-1">
									<h3 className="mb-2 text-xl font-bold text-gray-900">{mod.title}</h3>
									<p className="mb-4 text-gray-600">{mod.desc}</p>
									<div className="flex flex-wrap gap-2">
										{mod.topics.map((t) => (
											<span
												key={t}
												className="rounded-full bg-yup-50 px-3 py-1 text-xs font-medium text-yup-dark"
											>
												{t}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
