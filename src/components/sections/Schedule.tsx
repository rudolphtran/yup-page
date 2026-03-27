const benefits = [
	{
		icon: (
			<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
				/>
			</svg>
		),
		title: "3 ngày học tập và thấu cảm sâu sắc",
		desc: "Trải qua trọn vẹn những cung bậc cảm xúc để đánh thức người lãnh đạo điềm tĩnh, thông tuệ bên trong bạn.",
	},
	{
		icon: (
			<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
				/>
			</svg>
		),
		title: "Workbook độc quyền từ YUP",
		desc: "Cuốn sổ tay phản tư được biên soạn tỉ mỉ, giúp bạn ghi lại những khoảnh khắc thức tỉnh và đóng gói những góc nhìn mới mẻ thành một hành trình rõ ràng.",
	},
	{
		icon: (
			<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-3.77 1.522m0 0a6.003 6.003 0 01-3.77-1.522"
				/>
			</svg>
		),
		title: "Cơ hội nhận Học bổng X1 (Khởi Chánh Nghiệp)",
		desc: "Dành cho những ai thực sự dấn thân, hoàn thành thử thách chia sẻ mục tiêu 10X. Đây là chiếc chìa khóa để bạn chính thức bước vào một cộng đồng kinh doanh tử tế, nơi sự thành công luôn song hành cùng lòng trắc ẩn và sự bình an.",
	},
];

export default function Schedule() {
	return (
		<section id="values" className="relative overflow-hidden bg-white py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<span className="mb-4 inline-block rounded-full bg-yup-50 px-4 py-1.5 text-sm font-semibold text-yup-dark">
						Giá trị mang về
					</span>
					<h2 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl">
						Những giá trị bạn sẽ <span className="text-gradient">mang về</span> sau chương trình
					</h2>
					<p className="text-lg leading-relaxed text-gray-600">
						Bước ra khỏi 3 ngày đồng hành, bạn không chỉ mang về những kiến thức, mà là{" "}
						<strong className="text-gray-900">một sự chuyển dịch mạnh mẽ từ bên trong.</strong>
					</p>
				</div>

				<div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
					{benefits.map((item) => (
						<div
							key={item.title}
							className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yup/20 hover:shadow-lg"
						>
							<div className="h-2 bg-gradient-to-r from-yup to-yup-light transition-all duration-300 group-hover:h-2.5" />
							<div className="p-8">
								<div className="mb-4 inline-flex rounded-xl bg-yup-50 p-3 text-yup transition-colors group-hover:bg-yup group-hover:text-white">
									{item.icon}
								</div>
								<h3 className="mb-3 text-lg font-bold text-gray-900">{item.title}</h3>
								<p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
							</div>
						</div>
					))}
				</div>

				{/* Closing CTA */}
				<div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-yup/20 bg-yup-50 p-8 text-center">
					<p className="mb-4 text-lg leading-relaxed text-gray-700">
						Hãy cho phép bản thân được dừng lại để nhìn rõ hơn con đường phía trước.
					</p>
					<p className="text-xl font-bold text-gray-900">
						YUP chờ bạn ở hành trình <span className="text-gradient">10X YOUR BIZ!</span>
					</p>
				</div>
			</div>
		</section>
	);
}
