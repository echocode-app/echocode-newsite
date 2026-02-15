import { z } from 'zod';

/** Must stay in sync with `storage.rules` and upload checks. */
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
export const MAX_DOCUMENT_SIZE_BYTES = 20 * 1024 * 1024;

/** Allowed MIME types for uploaded images. */
export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/bmp',
  'image/tiff',
  'image/heic',
  'image/heif',
] as const;

/** Allowed MIME types for CVs and document attachments. */
export const ALLOWED_DOCUMENT_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/rtf',
  'application/vnd.oasis.opendocument.text',
  'text/plain',
] as const;

type ImageMime = (typeof ALLOWED_IMAGE_MIME_TYPES)[number];
type DocumentMime = (typeof ALLOWED_DOCUMENT_MIME_TYPES)[number];

const SAFE_STORAGE_PATH_PATTERN = /^uploads\/[a-z0-9/_-]+$/;

/** File metadata returned by upload flow and revalidated on submit. */
export const uploadFileBaseSchema = z.object({
  path: z
    .string()
    .trim()
    .min(5, 'Path is required')
    .max(512, 'Path is too long')
    .regex(SAFE_STORAGE_PATH_PATTERN, 'Invalid storage path format'),
  originalName: z
    .string()
    .trim()
    .min(1, 'File name is required')
    .max(255, 'File name is too long'),
  mimeType: z
    .string()
    .trim()
    .min(1, 'MIME type is required')
    .max(128, 'MIME type is too long'),
  sizeBytes: z.number().int().positive('File size must be greater than 0'),
});

export function isImageMimeType(value: string): value is ImageMime {
  return ALLOWED_IMAGE_MIME_TYPES.includes(value as ImageMime);
}

export function isDocumentMimeType(value: string): value is DocumentMime {
  return ALLOWED_DOCUMENT_MIME_TYPES.includes(value as DocumentMime);
}

/** Project attachment accepts one image or one document. */
export const projectAttachmentSchema = uploadFileBaseSchema
  .refine((value) => isImageMimeType(value.mimeType) || isDocumentMimeType(value.mimeType), {
    message: 'Unsupported attachment MIME type',
    path: ['mimeType'],
  })
  .refine(
    (value) =>
      isImageMimeType(value.mimeType)
        ? value.sizeBytes <= MAX_IMAGE_SIZE_BYTES
        : value.sizeBytes <= MAX_DOCUMENT_SIZE_BYTES,
    {
      message: 'Attachment exceeds allowed size',
      path: ['sizeBytes'],
    },
  );

/** Candidate CV accepts only document formats. */
export const candidateCvFileSchema = uploadFileBaseSchema
  .refine((value) => isDocumentMimeType(value.mimeType), {
    message: 'Unsupported CV MIME type',
    path: ['mimeType'],
  })
  .refine((value) => value.sizeBytes <= MAX_DOCUMENT_SIZE_BYTES, {
    message: 'CV exceeds 20MB limit',
    path: ['sizeBytes'],
  });

export type UploadedFileInput = z.infer<typeof uploadFileBaseSchema>;
