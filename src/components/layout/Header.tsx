"use client";

import { useState, useEffect } from "react";

const navLinks = [
	{ label: "Giới thiệu", href: "#intro" },
	{ label: "Nội dung", href: "#content" },
	{ label: "Lịch trình", href: "#schedule" },
	{ label: "Giảng viên", href: "#instructors" },
	{ label: "Đăng ký", href: "#register" },
];

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
				scrolled ? "glass shadow-lg" : "bg-transparent"
			}`}
		>
			{/* Top bar – external YUP links */}
			{/* <div className="bg-yup text-xs text-white">
				<div className="container mx-auto flex items-center justify-end gap-4 px-4 py-1">
					<a href="https://yup.edu.vn" target="_blank" rel="noopener noreferrer" className="hover:underline">
						yup.edu.vn
					</a>
				</div>
			</div> */}

			{/* Main nav */}
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				{/* Logo */}
				<a href="#" className="flex items-center gap-2">
					<span className="text-yup text-2xl font-extrabold tracking-tight">YUP</span>
					<span className="hidden text-sm font-medium text-gray-600 sm:inline">Education</span>
				</a>

				{/* Desktop links */}
				<nav className="hidden items-center gap-6 md:flex">
					{navLinks.map((l) => (
						<a
							key={l.href}
							href={l.href}
							className="text-sm font-medium text-gray-700 transition-colors hover:text-yup"
						>
							{l.label}
						</a>
					))}
					<a
						href="#register"
						className="bg-yup hover:bg-yup-dark rounded-full px-5 py-2 text-sm font-semibold text-white transition-colors"
					>
						Đăng ký ngay
					</a>
				</nav>

				{/* Mobile toggle */}
				<button
					type="button"
					className="flex flex-col gap-1.5 md:hidden"
					onClick={() => setMobileOpen(!mobileOpen)}
					aria-label="Toggle menu"
				>
					<span
						className={`block h-0.5 w-6 bg-gray-700 transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
					/>
					<span
						className={`block h-0.5 w-6 bg-gray-700 transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
					/>
					<span
						className={`block h-0.5 w-6 bg-gray-700 transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
					/>
				</button>
			</div>

			{/* Mobile menu */}
			{mobileOpen && (
				<nav className="glass border-t border-gray-100 md:hidden">
					<div className="container mx-auto flex flex-col gap-2 px-4 py-4">
						{navLinks.map((l) => (
							<a
								key={l.href}
								href={l.href}
								className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-yup-50 hover:text-yup"
								onClick={() => setMobileOpen(false)}
							>
								{l.label}
							</a>
						))}
						<a
							href="#register"
							className="bg-yup hover:bg-yup-dark mt-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors"
							onClick={() => setMobileOpen(false)}
						>
							Đăng ký ngay
						</a>
					</div>
				</nav>
			)}
		</header>
	);
}
