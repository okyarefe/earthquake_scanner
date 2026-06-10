import { z } from 'zod';
import { quakeFeatureSchema } from './quakeFeature';

/**
 * Validate each feature on its own and drop the ones that fail, so a single
 * malformed earthquake can't blow away the entire feed. Invalid records are
 * logged (not silently eaten) so we still notice if something is off.
 */
const resilientFeatures = z.array(z.unknown()).transform((items) =>
  items.flatMap((item) => {
    const result = quakeFeatureSchema.safeParse(item);
    if (!result.success) {
      console.warn('Skipping invalid quake feature:', result.error.issues, item);
      return [];
    }
    return [result.data];
  }),
);

export const quakeResponseSchema = z.object({
  type: z.literal('FeatureCollection'),
  metadata: z.object({
    api: z.string(),
    count: z.number(),
    generated: z.number(),
    status: z.number(),
    title: z.string(),
    url: z.string(),
  }),
  features: resilientFeatures,
  // USGS omits bbox entirely when a feed has zero earthquakes.
  bbox: z.array(z.number()).optional(),
});

export type QuakeResponse = z.infer<typeof quakeResponseSchema>;
