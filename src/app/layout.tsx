import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yup.edu.vn";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "YUP Education - Nền tảng giáo dục doanh nghiệp",
		template: "%s | YUP Education",
	},
	description:
		"YUP Education cung cấp các chương trình đào tạo chuyên sâu dành cho doanh nghiệp, giúp nâng cao năng lực và phát triển bền vững.",
	keywords: ["YUP Education", "đào tạo doanh nghiệp", "giáo dục", "phát triển nhân lực"],
	authors: [{ name: "YUP Education" }],
	creator: "YUP Education",
	icons: {
		icon: [
			{ url: "/favicon_io/favicon.ico", sizes: "any" },
			{ url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: "/favicon_io/apple-touch-icon.png",
	},
	manifest: "/favicon_io/site.webmanifest",
	openGraph: {
		type: "website",
		locale: "vi_VN",
		url: siteUrl,
		siteName: "YUP Education",
		title: "YUP Education - Nền tảng giáo dục doanh nghiệp",
		description:
			"YUP Education cung cấp các chương trình đào tạo chuyên sâu dành cho doanh nghiệp.",
	},
	twitter: {
		card: "summary_large_image",
		title: "YUP Education",
		description: "Nền tảng giáo dục doanh nghiệp hàng đầu Việt Nam",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}
