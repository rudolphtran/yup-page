import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import XrayTool from "@/components/xray/XrayTool";

export const metadata: Metadata = {
	title: "X-Quang Doanh Nghiệp | YUP Education",
	description:
		"Công cụ chẩn đoán sức khỏe doanh nghiệp với 50 tiêu chí vận hành bền vững. Khám phá điểm mạnh và lỗ hổng trong doanh nghiệp của bạn.",
};

export default function XrayYourBizPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen bg-gray-50 pt-24">
				<div className="container mx-auto px-4">
					<XrayTool />
				</div>
			</main>
			<Footer />
		</>
	);
}
