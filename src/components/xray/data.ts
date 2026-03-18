export type AnswerValue = "co_he_thong" | "dang_xay_dung" | "chua_co";

export interface AnswerOption {
	value: AnswerValue;
	label: string;
	emoji: string;
	points: number;
	description: string;
}

export interface Criterion {
	id: number;
	question: string;
	answers: [AnswerOption, AnswerOption, AnswerOption]; // co_he_thong, dang_xay_dung, chua_co
}

export interface Pillar {
	id: number;
	name: string;
	shortName: string;
	description: string;
	criteria: Criterion[];
}

export interface DiagnosisLevel {
	range: string;
	min: number;
	max: number;
	emoji: string;
	label: string;
	color: string;
	description: string;
}

export const ANSWER_OPTIONS: Record<AnswerValue, { label: string; emoji: string; points: number }> = {
	co_he_thong: { label: "Có hệ thống", emoji: "✅", points: 2 },
	dang_xay_dung: { label: "Đang xây dựng", emoji: "🔄", points: 1 },
	chua_co: { label: "Chưa có", emoji: "❌", points: 0 },
};

export const DIAGNOSIS_LEVELS: DiagnosisLevel[] = [
	{
		range: "0–39",
		min: 0,
		max: 39,
		emoji: "🔴",
		label: "KHẨN CẤP",
		color: "red",
		description:
			"Nhiều lỗ hổng nguy hiểm đang tồn tại. Dừng mở rộng, tập trung vá lỗ hổng trước tiên.",
	},
	{
		range: "40–59",
		min: 40,
		max: 59,
		emoji: "🟡",
		label: "CẦN CẢI THIỆN",
		color: "yellow",
		description:
			"Có nền tảng nhưng nhiều điểm nghẽn. Chọn 2–3 trụ cột yếu nhất để cải thiện trong 90 ngày.",
	},
	{
		range: "60–74",
		min: 60,
		max: 74,
		emoji: "🔵",
		label: "ĐANG PHÁT TRIỂN",
		color: "blue",
		description:
			"Vận hành ổn nhưng chưa tối ưu. Bắt đầu hệ thống hóa và phân quyền để thoát bẫy 'khổ chủ'.",
	},
	{
		range: "75–89",
		min: 75,
		max: 89,
		emoji: "🟢",
		label: "SỨC KHỎE TỐT",
		color: "green",
		description:
			"Nền tảng vững chắc. Sẵn sàng tăng trưởng có hệ thống — tập trung vào chiến lược mở rộng.",
	},
	{
		range: "90–100",
		min: 90,
		max: 100,
		emoji: "✅",
		label: "DOANH NGHIỆP BỀN VỮNG",
		color: "emerald",
		description:
			"Đẳng cấp vận hành cao. Sẵn sàng mở rộng quy mô, nhượng quyền hoặc thu hút nhà đầu tư.",
	},
];

export const PILLAR_DIAGNOSIS = {
	good: { min: 0.75, emoji: "🟢", label: "Tốt – Duy trì & nâng cao", color: "green" },
	developing: {
		min: 0.6,
		emoji: "🔵",
		label: "Đang phát triển – Tối ưu thêm",
		color: "blue",
	},
	weak: { min: 0.4, emoji: "🟡", label: "Yếu – Cải thiện trong 30 ngày", color: "yellow" },
	critical: { min: 0, emoji: "🔴", label: "Nguy hiểm – Ưu tiên xử lý ngay", color: "red" },
};

export const pillars: Pillar[] = [
	{
		id: 1,
		name: "TÀI CHÍNH & DÒNG TIỀN",
		shortName: "Tài chính",
		description: "Phát hiện lãi ảo, dòng tiền âm, lỗ hổng thuế và rủi ro pháp lý",
		criteria: [
			{
				id: 1,
				question:
					"Tài khoản ngân hàng kinh doanh có được tách biệt hoàn toàn với tài khoản cá nhân?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description: "Có tài khoản riêng, KHÔNG có giao dịch cá nhân lẫn vào",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description: "Có tài khoản riêng nhưng đôi khi vẫn dùng lẫn với cá nhân",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Dùng chung một tài khoản cho cả kinh doanh và cá nhân",
					},
				],
			},
			{
				id: 2,
				question:
					"Bạn phân biệt được 'Lãi Thật' (tiền mặt thực có) với 'Lãi Ảo' (lãi trên sổ sách nhưng tiền đang bị chôn ở hàng tồn/công nợ)?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description: "Theo dõi cả hai, biết ngay con số mỗi cuối tháng",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description: "Hiểu khái niệm nhưng chưa theo dõi thường xuyên",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Không phân biệt được, chỉ nhìn vào doanh thu",
					},
				],
			},
			{
				id: 3,
				question:
					"Bạn biết điểm hòa vốn (doanh thu tối thiểu để không lỗ) của tháng này là bao nhiêu?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description: "Biết con số chính xác và theo dõi hàng tháng",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description: "Biết ước chừng nhưng chưa tính chính xác",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Không biết, chưa bao giờ tính",
					},
				],
			},
			{
				id: 4,
				question:
					"Doanh nghiệp có quỹ dự phòng để vận hành tiếp nếu tháng tới doanh thu giảm mạnh?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description: "Có quỹ dự phòng ≥ 2 tháng chi phí vận hành",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description: "Có dự phòng nhưng chỉ đủ dưới 1 tháng",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Không có quỹ dự phòng, tháng nào tiêu tháng đó",
					},
				],
			},
			{
				id: 5,
				question:
					"Toàn bộ chi phí cố định hàng tháng có được liệt kê đầy đủ và xem xét định kỳ?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description: "Có bảng chi phí đầy đủ, xem lại ít nhất mỗi quý",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description: "Có liệt kê nhưng chưa đầy đủ hoặc lâu không cập nhật",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Chưa bao giờ liệt kê, không biết tổng chi phí cố định",
					},
				],
			},
			{
				id: 6,
				question:
					"Toàn bộ doanh thu (tiền mặt, chuyển khoản, ví điện tử) có được ghi nhận đầy đủ vào một hệ thống theo dõi duy nhất?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description: "100% doanh thu được ghi nhận, có thể truy xuất bất kỳ lúc nào",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Phần lớn được ghi nhận nhưng vẫn có khoản thu ngoài hệ thống",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Không ghi nhận đủ, chủ yếu nhớ trong đầu hoặc ghi tay rời rạc",
					},
				],
			},
			{
				id: 7,
				question:
					"Dòng tiền thực tế (tiền trong tài khoản) có khớp với doanh thu — tức không xảy ra tình trạng doanh thu cao nhưng hết tiền mặt?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description: "Dòng tiền luôn dương, không bị hụt tiền cuối tháng",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description: "Thỉnh thoảng bị căng tiền dù doanh thu ổn",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Thường xuyên hết tiền trước cuối tháng dù báo cáo có lãi",
					},
				],
			},
			{
				id: 8,
				question:
					"Công nợ khách hàng còn nợ (nếu có) có được theo dõi có hạn thanh toán và quy trình đòi nợ rõ ràng?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có danh sách công nợ chi tiết, có hạn thanh toán và nhắc tự động",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description: "Có theo dõi nhưng không nhất quán, hay bị bỏ sót",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Không theo dõi, không biết ai đang nợ mình bao nhiêu",
					},
				],
			},
			{
				id: 9,
				question:
					"Doanh nghiệp đang kê khai thuế đúng hạn và không có khoản phạt hay vi phạm thuế tồn đọng?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description: "Kê khai đúng hạn, không có phạt, sổ sách minh bạch",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Cơ bản đúng hạn nhưng còn một số khoản chưa rõ ràng",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Đang có vi phạm hoặc kê khai không đầy đủ",
					},
				],
			},
			{
				id: 10,
				question:
					"Bạn có thể trả lời ngay 'Tháng trước lãi (hoặc lỗ) bao nhiêu tiền thực tế?' mà không cần tra sổ?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description: "Biết ngay, có thể trả lời trong vòng 1 phút",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description: "Biết gần đúng nhưng phải tra lại để có số chính xác",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Không biết, phải mất nhiều thời gian mới tính được",
					},
				],
			},
		],
	},
	{
		id: 2,
		name: "DOANH THU & KHÁCH HÀNG",
		shortName: "Doanh thu",
		description:
			"Đánh giá khả năng giữ chân khách, hiệu quả marketing và đa dạng doanh thu",
		criteria: [
			{
				id: 11,
				question:
					"Tỷ lệ khách hàng cũ quay lại mua tiếp (không cần chạy quảng cáo lại) đang ở mức nào?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description: "Hơn 40% doanh thu đến từ khách cũ tự quay lại",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có khách quay lại nhưng dưới 40%, phần lớn vẫn phụ thuộc quảng cáo",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Hầu hết khách chỉ mua một lần, phải liên tục tìm khách mới",
					},
				],
			},
			{
				id: 12,
				question:
					"Doanh nghiệp có quy trình chăm sóc sau bán hàng được thực hiện nhất quán cho mọi khách?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có quy trình rõ ràng (gọi điện, nhắn tin, email) — nhân viên thực hiện được mà không cần nhắc",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có làm nhưng không nhất quán, phụ thuộc vào tâm trạng hoặc chỉ khi nhớ",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Chưa có, bán xong là xong",
					},
				],
			},
			{
				id: 13,
				question:
					"Bạn biết sản phẩm hoặc dịch vụ nào đang tạo ra phần lớn doanh thu của mình?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Biết rõ top 3 sản phẩm/dịch vụ chiếm >60% doanh thu, có dữ liệu chứng minh",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Biết ước chừng nhưng chưa có số liệu cụ thể để chứng minh",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Không biết, bán gì cũng như nhau trong mắt mình",
					},
				],
			},
			{
				id: 14,
				question:
					"Tỷ lệ đơn hàng bị hoàn trả, đổi trả hoặc khiếu nại đang ở mức nào?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Dưới 3% — có quy trình xử lý rõ ràng và đang cải thiện liên tục",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Từ 3–7% — có xảy ra nhưng chưa tìm được nguyên nhân gốc rễ",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Trên 7% hoặc không biết tỷ lệ vì chưa bao giờ đo",
					},
				],
			},
			{
				id: 15,
				question:
					"Doanh nghiệp có ít nhất 2 kênh bán hàng độc lập đang hoạt động song song?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description: "Có ≥ 2 kênh, không kênh nào chiếm quá 60% doanh thu",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Đang có 2 kênh nhưng 1 kênh chiếm trên 80% — còn phụ thuộc nhiều",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Chỉ có 1 kênh duy nhất",
					},
				],
			},
			{
				id: 16,
				question:
					"Khi có khách hàng phàn nàn hoặc đánh giá tiêu cực, doanh nghiệp xử lý như thế nào?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có quy trình xử lý rõ ràng, phản hồi trong 24 giờ, có người chịu trách nhiệm",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có xử lý nhưng không nhất quán, đôi khi chậm hoặc bỏ sót",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chưa có quy trình, xử lý theo cảm tính hoặc thường bỏ qua",
					},
				],
			},
			{
				id: 17,
				question:
					"Bạn nắm rõ thông tin về nhóm khách hàng thân thiết nhất của mình?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có danh sách khách VIP, biết lịch sử mua hàng và có chiến lược chăm sóc riêng",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Biết mặt biết tên nhưng chưa có hệ thống lưu trữ hay chăm sóc bài bản",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chưa phân loại khách hàng, đối xử như nhau với tất cả",
					},
				],
			},
			{
				id: 18,
				question:
					"Doanh thu có được phân bổ từ nhiều nguồn thay vì phụ thuộc vào 1 khách hàng lớn hoặc 1 hợp đồng?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Không có khách/hợp đồng nào chiếm quá 30% tổng doanh thu",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description: "Có 1 nguồn chiếm 30–50% — đang ở ngưỡng rủi ro",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Có nguồn chiếm trên 50% — nếu mất nguồn đó sẽ nguy hiểm ngay",
					},
				],
			},
			{
				id: 19,
				question:
					"Bạn đo lường được tỷ lệ chuyển đổi từ người hỏi/xem → người mua thực tế?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Đo được, biết con số và đang tối ưu từng bước trong phễu",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description: "Biết ước chừng nhưng chưa theo dõi hệ thống",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chưa bao giờ đo, không biết mình đang mất khách ở bước nào",
					},
				],
			},
			{
				id: 20,
				question:
					"Trong 6 tháng gần nhất, doanh nghiệp có thu thập phản hồi chính thức về mức độ hài lòng của khách hàng?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có khảo sát định kỳ, phân tích kết quả và điều chỉnh dịch vụ theo phản hồi",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có hỏi thăm không chính thức nhưng chưa thu thập có hệ thống",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chưa bao giờ khảo sát, tự cho rằng khách hàng hài lòng",
					},
				],
			},
		],
	},
	{
		id: 3,
		name: "VẬN HÀNH & QUY TRÌNH",
		shortName: "Vận hành",
		description:
			"Kiểm tra SOP, kiểm soát kho, phát hiện thất thoát và năng suất vận hành",
		criteria: [
			{
				id: 21,
				question:
					"Quy trình bán hàng từ lúc khách hỏi đến lúc nhận tiền có được viết thành tài liệu?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có SOP bằng văn bản, nhân viên đang thực hiện theo và được cập nhật định kỳ",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có phác thảo quy trình nhưng nhân viên vẫn làm theo nhiều cách khác nhau",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chưa có văn bản, quy trình chỉ nằm trong đầu chủ",
					},
				],
			},
			{
				id: 22,
				question:
					"Nếu nhân viên chủ chốt nghỉ đột xuất, hoạt động kinh doanh vẫn diễn ra bình thường?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có người thay thế được ngay, quy trình đủ rõ để người khác tiếp quản",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Bị xáo trộn một chút nhưng vẫn xử lý được sau 1–2 ngày",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Gần như tê liệt — không ai biết làm thay, buộc phải gọi người nghỉ quay lại",
					},
				],
			},
			{
				id: 23,
				question:
					"Tồn kho hàng hóa hoặc nguyên vật liệu có được theo dõi bằng công cụ (phần mềm hoặc bảng tính)?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có hệ thống theo dõi real-time, biết số lượng tồn chính xác bất kỳ lúc nào",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có theo dõi nhưng không liên tục, phải kiểm kho thủ công định kỳ",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Dựa vào trí nhớ hoặc ước tính, không có công cụ theo dõi",
					},
				],
			},
			{
				id: 24,
				question:
					"Doanh nghiệp có cơ chế phát hiện thất thoát tiền hoặc hàng trong vòng 24 giờ?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có kiểm tra chéo hàng ngày, sai lệch được phát hiện và xử lý ngay trong ngày",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Phát hiện được nhưng thường mất vài ngày mới nhận ra",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chỉ phát hiện cuối tháng khi cộng sổ, thiệt hại đã xảy ra mới biết",
					},
				],
			},
			{
				id: 25,
				question:
					"Tỷ lệ sai sót trong vận hành (giao nhầm hàng, làm sai dịch vụ, phải làm lại) đang ở mức nào?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Dưới 2% — có quy trình kiểm tra chất lượng trước khi giao tới khách",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Từ 2–5% — có xảy ra nhưng chưa giải quyết được triệt để",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Trên 5% hoặc không biết tỷ lệ vì chưa bao giờ đo",
					},
				],
			},
			{
				id: 26,
				question:
					"Khi giao việc cho nhân viên, mức độ hoàn thành đúng hạn và đúng yêu cầu như thế nào?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Trên 80% việc hoàn thành đúng yêu cầu mà không cần nhắc lại",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Khoảng 50–80% — phải nhắc thường xuyên hoặc phải sửa lại",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Dưới 50% — giao việc xong phải theo sau để kiểm tra liên tục",
					},
				],
			},
			{
				id: 27,
				question:
					"Doanh nghiệp có sử dụng phần mềm quản lý (bán hàng, kho, kế toán) thay vì ghi tay hoặc dùng nhóm chat để theo dõi đơn hàng?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có phần mềm, toàn bộ đội ngũ đang sử dụng nhất quán",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có phần mềm nhưng chỉ dùng một phần, vẫn còn ghi tay song song",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chưa có phần mềm, dùng zalo/messenger hoặc ghi tay",
					},
				],
			},
			{
				id: 28,
				question:
					"Việc nhập hàng hoặc đặt nguyên liệu được quyết định dựa trên điều gì?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Dựa trên dữ liệu bán hàng thực tế và dự báo nhu cầu",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Kết hợp giữa số liệu và cảm tính, đôi khi vẫn nhập sai",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Hoàn toàn theo cảm tính hoặc theo thói quen cũ",
					},
				],
			},
			{
				id: 29,
				question:
					"Dữ liệu quan trọng (mật khẩu phần mềm, tài khoản mạng xã hội, danh sách khách hàng) có được lưu trữ an toàn và phân quyền truy cập?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có hệ thống lưu trữ an toàn, có phân quyền — không phụ thuộc vào trí nhớ một người",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có lưu nhưng chưa phân quyền rõ ràng, dễ bị lộ hoặc mất quyền kiểm soát",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Không có hệ thống lưu trữ, phụ thuộc vào trí nhớ hoặc điện thoại cá nhân",
					},
				],
			},
			{
				id: 30,
				question:
					"Bạn có ít nhất 5 chỉ số vận hành (doanh thu ngày, số đơn, tỷ lệ hoàn hàng…) được theo dõi định kỳ hàng tuần?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có dashboard theo dõi ít nhất 5 KPI ops hàng tuần, có phân tích xu hướng",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Theo dõi 1–3 chỉ số cơ bản, chưa đủ toàn diện",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Chưa có chỉ số nào được theo dõi hệ thống",
					},
				],
			},
		],
	},
	{
		id: 4,
		name: "NHÂN SỰ & ĐỘI NGŨ",
		shortName: "Nhân sự",
		description:
			"Chẩn đoán năng lực đội ngũ, khả năng phân quyền và văn hóa nội bộ",
		criteria: [
			{
				id: 31,
				question:
					"Mỗi nhân viên có bản mô tả công việc với KPI đo lường và tiêu chí đánh giá rõ ràng?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Tất cả vị trí có JD và KPI bằng văn bản, nhân viên hiểu và ký xác nhận",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Một số vị trí có JD nhưng chưa đầy đủ hoặc chưa cập nhật",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description: "Chưa có JD cho bất kỳ vị trí nào, phân công bằng miệng",
					},
				],
			},
			{
				id: 32,
				question:
					"Bạn đo được năng suất của từng nhân viên bằng con số cụ thể?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có chỉ số năng suất cho từng người (doanh thu/người, đơn/ca…), xem lại hàng tuần",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Biết ước chừng ai làm tốt hơn nhưng không có số liệu để chứng minh",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Không đo được, không biết ai đang làm hiệu quả và ai đang 'ngồi chơi'",
					},
				],
			},
			{
				id: 33,
				question:
					"Khi nhân viên mới vào, họ mất bao lâu để làm việc độc lập mà không cần bạn cầm tay chỉ việc?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"3–7 ngày — có quy trình onboarding bài bản và tài liệu hướng dẫn đầy đủ",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"1–2 tuần — có hướng dẫn cơ bản nhưng phải kèm cặp nhiều",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Vài tuần đến vài tháng — phải cầm tay chỉ việc liên tục, rất tốn sức",
					},
				],
			},
			{
				id: 34,
				question:
					"Tỷ lệ nhân viên nghỉ việc trong 3 tháng đầu (early turnover) đang ở mức nào?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Dưới 20% — nhân viên mới thường ở lại và phát triển tốt",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"20–40% — có nhân viên nghỉ sớm nhưng chưa tìm được nguyên nhân",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Trên 40% — tuyển liên tục vẫn thiếu người, vòng lặp tốn kém không dứt",
					},
				],
			},
			{
				id: 35,
				question:
					"Hệ thống thưởng/phạt có được quy định bằng văn bản và áp dụng nhất quán với tất cả mọi người?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có quy định rõ bằng văn bản, áp dụng công bằng — không phụ thuộc tâm trạng chủ",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có quy định nhưng áp dụng chưa nhất quán, đôi khi theo cảm tính",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Không có quy định văn bản, thưởng phạt hoàn toàn theo quyết định tức thời của chủ",
					},
				],
			},
			{
				id: 36,
				question:
					"Nhân viên có được đào tạo về kỹ năng hoặc quy trình mới trong 6 tháng gần nhất?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có ít nhất 1 buổi đào tạo chính thức trong 6 tháng qua với nội dung cụ thể",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có hướng dẫn thêm nhưng không có chương trình đào tạo bài bản",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chưa có đào tạo gì, nhân viên tự mày mò hoặc học từ người cũ",
					},
				],
			},
			{
				id: 37,
				question:
					"Có ít nhất 1 nhân viên có thể điều phối hoạt động hàng ngày thay bạn khi bạn vắng mặt?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có 1–2 người có thể thay thế, đã được đào tạo và thử nghiệm thực tế",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có người tiềm năng nhưng chưa được đào tạo bài bản để đảm nhận thực sự",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chưa có ai — khi bạn vắng thì mọi thứ dừng lại",
					},
				],
			},
			{
				id: 38,
				question:
					"Bạn có trao đổi 1-1 hoặc họp nhóm định kỳ để nắm tâm tư và tháo gỡ vướng mắc cho nhân viên?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Họp hoặc 1-1 ít nhất 2 tuần/lần, có ghi chú và theo dõi hành động sau họp",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có họp nhưng không đều đặn, thường chỉ khi có vấn đề phát sinh",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Không họp định kỳ, chỉ trao đổi khi có sự cố",
					},
				],
			},
			{
				id: 39,
				question:
					"Nhân viên của bạn có thể hoàn thành phần lớn công việc hàng ngày mà không cần hỏi ý kiến bạn?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Hơn 70% công việc họ tự xử lý được — bạn chỉ cần quyết định những việc quan trọng",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Khoảng 40–70% — họ vẫn cần hỏi bạn nhiều việc không cần thiết",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Dưới 40% — hầu hết việc gì cũng phải hỏi bạn, bạn là 'bottleneck' của mọi thứ",
					},
				],
			},
			{
				id: 40,
				question:
					"Doanh nghiệp có ít nhất 3 giá trị văn hóa rõ ràng được nhân viên biết và thể hiện?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có 3+ giá trị được phổ biến, nhân viên biết và thể hiện trong hành vi hàng ngày",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có định nghĩa văn hóa nhưng chủ yếu nằm trên giấy, chưa thấm vào đội ngũ",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chưa có giá trị văn hóa được định nghĩa, mỗi người làm theo chuẩn riêng",
					},
				],
			},
		],
	},
	{
		id: 5,
		name: "LÃNH ĐẠO & TĂNG TRƯỞNG",
		shortName: "Lãnh đạo",
		description:
			"Tư duy chủ, sự sẵn sàng mở rộng và nền tảng pháp lý bền vững",
		criteria: [
			{
				id: 41,
				question:
					"Trong một tuần làm việc bình thường, bạn dành bao nhiêu thời gian cho công việc chiến lược (phát triển, cải tiến, mở rộng)?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Ít nhất 4 tiếng/tuần cho chiến lược — không bị sự vụ hàng ngày chiếm toàn bộ",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"1–3 tiếng — muốn làm nhưng hay bị sự vụ chen vào",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Gần như 0 — toàn bộ thời gian bị chiếm bởi sự vụ hàng ngày",
					},
				],
			},
			{
				id: 42,
				question:
					"Doanh nghiệp có kế hoạch kinh doanh với mục tiêu cụ thể cho ít nhất 6 tháng tới?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có kế hoạch bằng văn bản với mục tiêu doanh thu, lợi nhuận và các mốc hành động",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có mục tiêu trong đầu nhưng chưa viết ra hoặc chưa chia sẻ với đội ngũ",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Không có kế hoạch, kinh doanh theo phản xạ tháng nào biết tháng đó",
					},
				],
			},
			{
				id: 43,
				question:
					"Nếu bạn vắng mặt hoàn toàn 1 tuần, doanh nghiệp vận hành như thế nào?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Vẫn chạy bình thường — doanh thu không giảm, không có sự cố lớn",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Vẫn chạy nhưng có một số việc bị trì hoãn hoặc cần xử lý sau khi bạn về",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Gần như tê liệt hoặc có nguy cơ xảy ra sự cố nghiêm trọng",
					},
				],
			},
			{
				id: 44,
				question:
					"Doanh nghiệp đang tuân thủ đầy đủ các nghĩa vụ pháp lý (đăng ký kinh doanh, thuế, bảo hiểm xã hội)?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Đầy đủ giấy phép, kê khai đúng hạn, đóng BHXH đủ cho nhân viên",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Cơ bản đúng nhưng còn một số khoản chưa hoàn thiện",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Đang có thiếu sót hoặc vi phạm pháp lý chưa được xử lý",
					},
				],
			},
			{
				id: 45,
				question:
					"Bạn có mentor, cố vấn hoặc cộng đồng doanh nhân để nhận góc nhìn khách quan về doanh nghiệp mình?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có mentor hoặc cộng đồng đang hoạt động, gặp gỡ trao đổi ít nhất mỗi quý",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có mối quan hệ với doanh nhân khác nhưng chưa có cố vấn chính thức",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Hoàn toàn tự quyết mọi thứ, không có nguồn tham khảo bên ngoài",
					},
				],
			},
			{
				id: 46,
				question:
					"Bạn có thói quen học hỏi kiến thức quản trị kinh doanh định kỳ?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Học ít nhất 1 nội dung mới/tháng (sách, khóa học, podcast, hội thảo)",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Học nhưng không đều đặn — khi rảnh hoặc khi có vấn đề cần giải quyết",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Hiếm khi học, cảm thấy không có thời gian hoặc không cần thiết",
					},
				],
			},
			{
				id: 47,
				question:
					"Dữ liệu khách hàng có được bảo mật và chỉ nhân viên có thẩm quyền mới được truy cập?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có chính sách bảo mật rõ ràng, phân quyền truy cập theo vai trò",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có ý thức bảo mật nhưng chưa có chính sách chính thức hay phân quyền cụ thể",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Dữ liệu khách hàng có thể được truy cập tự do bởi bất kỳ nhân viên nào",
					},
				],
			},
			{
				id: 48,
				question:
					"Bạn theo dõi các chỉ số tài chính chiến lược (biên lợi nhuận, tăng trưởng doanh thu, ROI marketing) hàng tháng?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Theo dõi ≥ 3 chỉ số chiến lược hàng tháng, có phân tích xu hướng",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Theo dõi doanh thu cơ bản nhưng chưa đi sâu vào các chỉ số chiến lược",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chỉ nhìn vào tiền trong tài khoản, chưa phân tích chỉ số kinh doanh",
					},
				],
			},
			{
				id: 49,
				question:
					"Nếu có nhà đầu tư hỏi mua lại hoặc hợp tác, doanh nghiệp có sổ sách minh bạch để trình bày?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có thể cung cấp báo cáo tài chính 2 năm gần nhất trong vòng 48 giờ",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có một phần sổ sách nhưng chưa đầy đủ hoặc chưa đủ minh bạch",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chưa có hồ sơ tài chính bài bản, không thể trình bày cho bên ngoài",
					},
				],
			},
			{
				id: 50,
				question:
					"Bạn đã xác định rõ mô hình tăng trưởng cho 2–3 năm tới và đang thực hiện ít nhất 1 bước đi cụ thể hướng đến đó?",
				answers: [
					{
						value: "co_he_thong",
						label: "Có hệ thống",
						emoji: "✅",
						points: 2,
						description:
							"Có mô hình tăng trưởng rõ ràng (mở rộng, online scale, đa dạng hóa…) và đang triển khai",
					},
					{
						value: "dang_xay_dung",
						label: "Đang xây dựng",
						emoji: "🔄",
						points: 1,
						description:
							"Có suy nghĩ về tăng trưởng nhưng chưa có kế hoạch cụ thể hay bước đi đầu tiên",
					},
					{
						value: "chua_co",
						label: "Chưa có",
						emoji: "❌",
						points: 0,
						description:
							"Chưa nghĩ đến tăng trưởng, đang tập trung sống sót qua từng tháng",
					},
				],
			},
		],
	},
];
