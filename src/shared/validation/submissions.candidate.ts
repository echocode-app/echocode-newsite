import { z } from 'zod';
import { profileUrlSchema } from '@/shared/validation/submissions.common';
import { candidateCvFileSchema } from '@/shared/validation/submissions.files';

/** Candidate form payload: CV + profile link only for current UX contract. */
export const candidateSubmissionSchema = z.object({
  formType: z.literal('candidate'),
  profileUrl: profileUrlSchema,
  cvFile: candidateCvFileSchema,
});

export type CandidateSubmissionInput = z.infer<typeof candidateSubmissionSchema>;
