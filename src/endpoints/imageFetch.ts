import { ALL_IMAGES } from "../data/image_store";
import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { Image } from "../types";

export class ImageFetch extends OpenAPIRoute {
	schema = {
		tags: ["Images"],
		summary: "Get a single image by slug",
		request: {
			params: z.object({
				taskSlug: Str({ description: "Image slug" }),
			}),
		},
		responses: {
			"200": {
				description: "Returns a single image if found",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								result: z.object({
									image: Image,
								}),
							}),
						}),
					},
				},
			},
			"404": {
				description: "Image not found",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								error: Str(),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c) {
		// Get validated data
		const data = await this.getValidatedData<typeof this.schema>();

		// Retrieve the validated slug
		const { imageSlug } = data.params;

		// Implement your own object fetch here
		let​ imageMatch = ALL_IMAGES.find(i => i.id == imageSlug)
		const exists = (imageMatch || false);

		// @ts-ignore: check if the object exists
		if (exists === false) {
			return Response.json(
				{
					success: false,
					error: "Object not found",
				},
				{
					status: 404,
				},
			);
		}

		return {
			success: true,
			image: imageMatch,
		};
	}
}
