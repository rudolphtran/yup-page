const audiences = [
	{
		icon: (
			<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
				/>
			</svg>
		),
		title: "Lãnh đạo hoặc chủ doanh nghiệp",
		desc: "Bạn là người đã dành tâm huyết để gầy dựng nên cơ nghiệp. Thế nhưng, ở hiện tại, bạn đang mắc kẹt trong mớ bòng bong của sự vụ tiểu tiết. Bạn muốn nghỉ ngơi một ngày trọn vẹn bên gia đình cũng cảm thấy bất an vì vắng bạn là mọi thứ rối tung. Bạn khát khao tìm lại sự tự do và khoảng không gian tĩnh tại mà ngày đầu khởi nghiệp bạn từng mơ ước.",
	},
	{
		icon: (
			<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
				/>
			</svg>
		),
		title: "Bạn đang muốn có sự bứt phá trong sự nghiệp",
		desc: 'Bạn nhận ra cách làm cũ đã chạm ngưỡng. Việc cố gắng làm việc 14 tiếng mỗi ngày, ôm đồm mọi việc để mục tiêu KPI đang vắt kiệt cả "Thân" lẫn "Tâm" của bạn. Bạn cần một cú hích đủ mạnh để bẻ gãy những giới hạn cũ, tìm ra một đòn bẩy mới mẻ giúp bản thân, đội ngũ và doanh nghiệp vươn lên một nấc thang hoàn toàn khác biệt mà không phải đánh đổi bằng sức khỏe hay sự bình an.',
	},
	{
		icon: (
			<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
				/>
			</svg>
		),
		title: "Bạn đang tìm kiếm một mục tiêu truyền cảm hứng",
		desc: "Những con số tài chính khô khan không còn làm bạn rung động như trước. Bạn đang đi tìm một ý nghĩa sâu sắc hơn cho công việc kinh doanh của mình. Bạn cần một bức tranh 10X toàn diện: không chỉ là sự dồi dào về vật chất, mà còn là sự gia tăng gấp 10 lần thời gian dành cho bản thân, 10X chất lượng những người bạn đồng hành và 10X sự tĩnh lặng, trọn vẹn trong tâm trí.",
	},
];

export default function ProgramIntro() {
	return (
		<section id="audience" className="relative overflow-hidden bg-white py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-3xl text-center">
					<span className="mb-4 inline-block rounded-full bg-yup-50 px-4 py-1.5 text-sm font-semibold text-yup-dark">
						Dành cho ai?
					</span>

					<h2 className="mb-6 text-3xl font-extrabold text-gray-900 md:text-5xl">
						Chương trình này là lời đồng hành{" "}
						<span className="text-gradient">dành cho ai?</span>
					</h2>
				</div>

				<div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
					{audiences.map((item) => (
						<div
							key={item.title}
							className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yup/20 hover:shadow-lg"
						>
							<div className="mb-4 inline-flex rounded-xl bg-yup-50 p-3 text-yup transition-colors group-hover:bg-yup group-hover:text-white">
								{item.icon}
							</div>
							<h3 className="mb-3 text-xl font-bold text-gray-900">{item.title}</h3>
							<p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
