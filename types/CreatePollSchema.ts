import { z } from "zod";

export const CreateNewPollSchema = z.object({
  question: z.string().min(3, "at least 3 characters long"),
  description: z.string().optional(),
  choice: z.enum(["single", "multiple"]),
  answerOptions: z.array(
    z.object({
      option: z.string().min(1, "at least 1 character long"),
    })
  ),
});

export type CreateNewPoll = z.infer<typeof CreateNewPollSchema>;
