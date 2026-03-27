const days = [
	{
		number: "01",
		label: "Ngày 1",
		title: "Thiết lập tiêu chuẩn 10X — Quyền năng của sự kiến tạo mới",
		desc: "Mọi sự tái sinh đều bắt đầu khi ta dũng cảm bước qua những điều đã cũ. Trong ngày đầu tiên, chúng ta sẽ cùng nhau bóc tách khái niệm \"10X\". Đặt mục tiêu 10X không phải là làm nhiều việc hơn gấp 10 lần, mà là ép não bộ từ bỏ hoàn toàn những phương cách cũ kỹ. Bởi lẽ, có hàng trăm cách để bạn nhích thêm 2X, nhưng chỉ có một vài con đường thật sự tập trung giúp bạn chạm đến 10X. Bạn sẽ được hướng dẫn để viết xuống một bức tranh 10X đích thực cho chính mình — đó sẽ là bản cam kết với sự tự do, với chất lượng sống và với một tâm thế làm việc rành mạch, thư thái.",
		keywords: ["Tái sinh tư duy", "Bức tranh 10X", "Cam kết tự do"],
	},
	{
		number: "02",
		label: "Ngày 2",
		title: "Nghệ thuật buông bỏ & Đòn bẩy nguồn lực — Trí tuệ của sự tĩnh lặng",
		desc: "Sự bứt phá lớn nhất thường đến từ việc biết buông bỏ những thứ không còn thuộc về mình. Ngày thứ hai là không gian để bạn thực hành phản tư, tìm ra đúng 20% những điều tinh túy nhất cần tập trung. Bạn sẽ học cách vận hành doanh nghiệp bằng lòng trắc ẩn: Khi bạn giúp những người cộng sự, đối tác và khách hàng của mình đạt được 10X, những nguồn lực mầu nhiệm từ vũ trụ sẽ tự động mang phần thưởng 10X quay trở lại với bạn một cách thuận tự nhiên.",
		keywords: ["Buông bỏ tinh hoa", "Quy tắc 20%", "Lòng trắc ẩn"],
	},
	{
		number: "03",
		label: "Ngày 3",
		title: "Chân dung người dẫn dắt & Tấm bản đồ vững chãi",
		desc: "Hành trình lột xác từ một người quản lý luôn soi xét từng tiểu tiết trở thành một người dẫn dắt có khả năng chuyển hóa và thấu tỏ nhân tâm. Chúng ta sẽ cùng nhau đẩy những rung động cảm xúc lên mức cao nhất thông qua trải nghiệm kết nối sâu sắc với mục tiêu 10X từ tận cùng cội rễ. Và để ngày mai thức dậy, bạn không bị rơi lại vào cái bẫy của sự bận rộn cũ kỹ, chúng ta sẽ mở ra cánh cửa của Hành trình Khởi Chánh Nghiệp — một tấm bản đồ vững chãi, một cộng đồng tử tế để cùng bạn đi những bước dài và bình an nhất.",
		keywords: ["Người dẫn dắt", "Khởi Chánh Nghiệp", "Cộng đồng tử tế"],
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
						Hành trình <span className="text-gradient">3 ngày</span> chuyển hóa tâm thức lãnh đạo
					</h2>
				</div>

				<div className="mx-auto max-w-4xl space-y-6">
					{days.map((day) => (
						<div
							key={day.number}
							className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-yup/20 hover:shadow-lg md:p-8"
						>
							{/* Number accent */}
							<div className="absolute -top-4 -right-4 text-8xl font-extrabold text-yup/5 transition-colors group-hover:text-yup/10">
								{day.number}
							</div>

							<div className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
								{/* Number badge */}
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yup text-lg font-bold text-white">
									{day.number}
								</div>

								<div className="flex-1">
									<div className="mb-1 text-sm font-semibold text-yup">{day.label}</div>
									<h3 className="mb-3 text-xl font-bold text-gray-900">{day.title}</h3>
									<p className="mb-4 leading-relaxed text-gray-600">{day.desc}</p>
									<div className="flex flex-wrap gap-2">
										{day.keywords.map((k) => (
											<span
												key={k}
												className="rounded-full bg-yup-50 px-3 py-1 text-xs font-medium text-yup-dark"
											>
												{k}
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
