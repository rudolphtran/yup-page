import { defineType, defineField } from "sanity";

export const categorySchema = defineType({
	name: "category",
	title: "Danh mục",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Tên danh mục",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "title" },
		}),
		defineField({
			name: "description",
			title: "Mô tả",
			type: "text",
		}),
	],
});
