"use client";

import { useState, useEffect } from "react";

export default function StickyFooterCTA() {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const onScroll = () => {
			const registerSection = document.getElementById("register");
			if (!registerSection) return;

			const rect = registerSection.getBoundingClientRect();
			// Hide when the register section is visible in viewport
			setVisible(rect.top > window.innerHeight);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	if (!visible) return null;

	return (
		<div className="fixed right-0 bottom-0 left-0 z-50 border-t border-white/10 bg-gray-900/95 backdrop-blur-md">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				<div className="hidden sm:block">
					<p className="text-sm font-semibold text-white">
						Hành trình <span className="text-gradient">10X YOUR BIZ</span>
					</p>
					<p className="text-xs text-gray-400">3 ngày chuyển hóa tâm thức lãnh đạo</p>
				</div>
				<a
					href="#register"
					className="bg-yup hover:bg-yup-dark w-full rounded-full px-6 py-2.5 text-center text-sm font-bold text-white transition-all hover:scale-105 sm:w-auto"
				>
					Đăng ký ngay
				</a>
			</div>
		</div>
	);
}
