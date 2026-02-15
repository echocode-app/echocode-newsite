import { z } from 'zod';
import {
  ALLOWED_DOCUMENT_MIME_TYPES,
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_DOCUMENT_SIZE_BYTES,
  MAX_IMAGE_SIZE_BYTES,
  candidateCvFileSchema,
  isDocumentMimeType,
  isImageMimeType,
  projectAttachmentSchema,
  type UploadedFileInput,
} from '@/shared/validation/submissions.files';
import {
  candidateSubmissionSchema,
  type CandidateSubmissionInput,
} from '@/shared/validation/submissions.candidate';
import {
  projectSubmissionSchema,
  type ProjectSubmissionInput,
} from '@/shared/validation/submissions.project';

/** Main create-submission contract for API body validation. */
export const submissionCreateSchema = z.discriminatedUnion('formType', [
  projectSubmissionSchema,
  candidateSubmissionSchema,
]);

export {
  ALLOWED_DOCUMENT_MIME_TYPES,
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_DOCUMENT_SIZE_BYTES,
  MAX_IMAGE_SIZE_BYTES,
  candidateCvFileSchema,
  candidateSubmissionSchema,
  isDocumentMimeType,
  isImageMimeType,
  projectAttachmentSchema,
  projectSubmissionSchema,
  type CandidateSubmissionInput,
  type ProjectSubmissionInput,
  type UploadedFileInput,
};

export type SubmissionCreateInput = z.infer<typeof submissionCreateSchema>;
