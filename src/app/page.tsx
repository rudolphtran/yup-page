import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "YUP Education - Nền tảng giáo dục doanh nghiệp",
	description:
		"YUP Education cung cấp các chương trình đào tạo chuyên sâu dành cho doanh nghiệp, giúp nâng cao năng lực và phát triển bền vững.",
};

export default function HomePage() {
	return (
		<main>
			<section className="flex min-h-screen flex-col items-center justify-center bg-white">
				<div className="container mx-auto px-4 text-center">
					<h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-6xl">YUP Education</h1>
					<p className="mb-8 text-xl text-gray-600 md:text-2xl">
						Nền tảng giáo dục doanh nghiệp hàng đầu Việt Nam
					</p>
					<a
						href="#contact"
						className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
					>
						Tìm hiểu thêm
					</a>
				</div>
			</section>
		</main>
	);
}
