import { ALL_IMAGES } from "../data/image_store";
import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Image } from "../types";

export class ImageCreate extends OpenAPIRoute {
	schema = {
		tags: ["Images"],
		summary: "Create a new Image",
		request: {
			body: {
				content: {
					"application/json": {
						schema: Image,
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Returns the created image",
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
		},
	};

	async handle(c) {
		// Get validated data
		const data = await this.getValidatedData<typeof this.schema>();

		// Retrieve the validated request body
		const imageToCreate = data.body;

		// Implement your own object insertion here
		const newImage = {
				id: parseInt(imageToCreate.id),
				url: imageToCreate.url,
				author: imageToCreate.author,
			}
		ALL_IMAGES.unshift(newImage)

		// return the new image
		return {
			success: true,
			image: newImage,
		};
	}
}
