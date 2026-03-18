import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/sections/HeroBanner";
import ProgramIntro from "@/components/sections/ProgramIntro";
import ProgramContent from "@/components/sections/ProgramContent";
import Schedule from "@/components/sections/Schedule";
import Instructors from "@/components/sections/Instructors";
import RegistrationForm from "@/components/sections/RegistrationForm";

export const metadata: Metadata = {
	title: "10X Your Business | YUP Education",
	description:
		"Chương trình đào tạo chuyên sâu giúp doanh nghiệp tăng trưởng đột phá gấp 10 lần với chiến lược bài bản và đội ngũ chuyên gia hàng đầu.",
};

export default function HomePage() {
	return (
		<>
			<Header />
			<main>
				<HeroBanner />
				<ProgramIntro />
				<ProgramContent />
				<Schedule />
				<Instructors />
				<RegistrationForm />
			</main>
			<Footer />
		</>
	);
}
