import { ALL_IMAGES } from "../data/image_store";
import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Image } from "../types";

export class ImageList extends OpenAPIRoute {
	schema = {
		tags: ["Images"],
		summary: "List Images",
		request: {
			query: z.object({
				page: Num({
					description: "Page number",
					default: 0,
				}),

			}),
		},
		responses: {
			"200": {
				description: "Returns a list of images",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								result: z.object({
									images: Image.array(),
								}),
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

		// Retrieve the validated parameters
		const { page } = data.query;

		// Implement your own object list here

		return {
			success: true,
			images: ALL_IMAGES,
		};
	}
}

