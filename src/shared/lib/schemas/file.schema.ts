import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES =["image/jpeg", "image/jpg", "image/png", "image/webp"];

export function fileSchema(options?: {
  maxSize?: number;
  types?: string[];
}) {
  const maxSize = options?.maxSize ?? MAX_FILE_SIZE;
  const types = options?.types ?? ACCEPTED_IMAGE_TYPES;

  return z.preprocess(
    (val) => {
      if (val instanceof File && val.size === 0) return undefined;
      if (!val) return undefined;
      return val;
    },
    z.instanceof(File)
      .optional()
      .refine((file) => !file || file.size <= maxSize)
      .refine((file) => !file || types.includes(file.type))
  );
}