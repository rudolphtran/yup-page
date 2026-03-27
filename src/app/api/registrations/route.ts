import { NextResponse, type NextRequest } from "next/server";

const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const { fullName, phone, email, industry, revenue } = body;

		// Validate required fields
		if (!fullName || !phone || !email || !industry || !revenue) {
			return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin." }, { status: 400 });
		}

		if (!GOOGLE_SHEET_WEBHOOK_URL) {
			console.error("GOOGLE_SHEET_WEBHOOK_URL is not configured");
			return NextResponse.json({ error: "Hệ thống đang bảo trì, vui lòng thử lại sau." }, { status: 500 });
		}

		// Forward to Google Apps Script webhook
		const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				fullName,
				phone,
				email,
				industry,
				revenue,
				source: "10X Your Biz Landing Page",
				submittedAt: new Date().toISOString(),
			}),
		});

		if (!response.ok) {
			console.error("Google Sheet webhook failed:", response.status);
			return NextResponse.json({ error: "Gửi thông tin thất bại, vui lòng thử lại." }, { status: 502 });
		}

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Đã có lỗi xảy ra, vui lòng thử lại." }, { status: 500 });
	}
}
