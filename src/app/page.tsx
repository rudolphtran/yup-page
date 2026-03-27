import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/sections/HeroBanner";
import ProgramIntro from "@/components/sections/ProgramIntro";
import ProgramContent from "@/components/sections/ProgramContent";
import Schedule from "@/components/sections/Schedule";
import RegistrationForm from "@/components/sections/RegistrationForm";

export const metadata: Metadata = {
	title: "10X Your Biz: Kiến tạo sự tự do và bứt phá đích thực | YUP Education",
	description:
		"Hành trình 3 ngày chuyển hóa tâm thức lãnh đạo — giúp bạn bứt phá gấp 10 lần một cách nhẹ nhàng và tĩnh tại, không phải bằng sự cật lực.",
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
				<RegistrationForm />
			</main>
			<Footer />
		</>
	);
}
