import { z } from 'zod';

const NAME_PATTERN = /^[\p{L}\p{M}' -]+$/u;
const HTTP_URL_PATTERN = /^https?:\/\//i;

/** Person name: trimmed, 2-20 chars, letters/spaces/apostrophe/hyphen only. */
export const personNameSchema = z
  .string()
  .trim()
  .min(2, 'Must contain at least 2 characters')
  .max(20, 'Must contain at most 20 characters')
  .regex(NAME_PATTERN, 'Only letters, spaces, apostrophes and hyphens are allowed');

/** Main optional project note field. */
export const projectNeedsSchema = z
  .string()
  .trim()
  .min(10, 'Must contain at least 10 characters')
  .max(1000, 'Must contain at most 1000 characters');

/** External profile link (LinkedIn/GitHub/etc), http/https only. */
export const profileUrlSchema = z
  .string()
  .trim()
  .url({ message: 'Must be a valid URL' })
  .max(2048, 'Must contain at most 2048 characters')
  .refine((value) => HTTP_URL_PATTERN.test(value), {
    message: 'URL must start with http:// or https://',
  });

/** Shared identity fields for project form. */
export const projectIdentitySchema = z.object({
  firstName: personNameSchema,
  lastName: personNameSchema,
  email: z.string().trim().email('Must be a valid email').max(30, 'Email is too long'),
});
