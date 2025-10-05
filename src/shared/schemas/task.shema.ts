import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'The title length must be one or more simbols')
    .max(60, 'The title length must be less then 60 simbols'),
  description: z
    .string()
    .min(3, 'The description length must be more then 2 simbols')
    .max(255, 'The description length must be less then 256 simbols'),
});
