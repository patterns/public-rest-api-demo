import { DateTime, Str } from "chanfana";
import { z } from "zod";

export const Task = z.object({
	name: Str({ example: "lorem" }),
	slug: Str(),
	description: Str({ required: false }),
	completed: z.boolean().default(false),
	due_date: DateTime(),
});

export const Image = z.object({
	id: z.number().int().positive(),
	url: Str({ example: "https://example.dev/img1" }),
	author: Str({ example: "Mary Shelly" }),
});
