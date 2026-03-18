import { defineType, defineField } from "sanity";

export const landingPageSchema = defineType({
	name: "landingPage",
	title: "Landing Page",
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
			options: { source: "title" },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "program",
			title: "Chương trình",
			type: "string",
		}),
		defineField({
			name: "heroHeadline",
			title: "Hero Headline",
			type: "string",
		}),
		defineField({
			name: "heroSubheadline",
			title: "Hero Subheadline",
			type: "text",
			rows: 2,
		}),
		defineField({
			name: "heroImage",
			title: "Hero Image",
			type: "image",
			options: { hotspot: true },
		}),
		defineField({
			name: "ctaText",
			title: "CTA Button Text",
			type: "string",
		}),
		defineField({
			name: "content",
			title: "Nội dung",
			type: "array",
			of: [{ type: "block" }],
		}),
		defineField({
			name: "seo",
			title: "SEO",
			type: "object",
			fields: [
				defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
				defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 2 }),
				defineField({ name: "ogImage", title: "OG Image", type: "image" }),
				defineField({
					name: "keywords",
					title: "Keywords",
					type: "array",
					of: [{ type: "string" }],
				}),
			],
		}),
	],
});
