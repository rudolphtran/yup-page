import { defineType, defineField } from "sanity";

export const postSchema = defineType({
	name: "post",
	title: "Bài viết",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Tiêu đề",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "title", maxLength: 96 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "excerpt",
			title: "Mô tả ngắn",
			type: "text",
			rows: 3,
		}),
		defineField({
			name: "mainImage",
			title: "Ảnh chính",
			type: "image",
			options: { hotspot: true },
			fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
		}),
		defineField({
			name: "categories",
			title: "Danh mục",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
		}),
		defineField({
			name: "publishedAt",
			title: "Ngày đăng",
			type: "datetime",
		}),
		defineField({
			name: "body",
			title: "Nội dung",
			type: "array",
			of: [{ type: "block" }, { type: "image" }],
		}),
		defineField({
			name: "seo",
			title: "SEO",
			type: "object",
			fields: [
				defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
				defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 2 }),
				defineField({ name: "ogImage", title: "OG Image", type: "image" }),
			],
		}),
	],
	preview: {
		select: { title: "title", media: "mainImage" },
	},
});
