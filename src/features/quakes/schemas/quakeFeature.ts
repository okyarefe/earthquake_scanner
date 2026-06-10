import { z } from 'zod';

export const quakeFeatureSchema = z.object({
  type: z.literal('Feature'),
  id: z.string(),
  geometry: z.object({
    type: z.literal('Point'),
    coordinates: z.array(z.number()),
  }),
  properties: z.object({
    alert: z.string().nullable(),
    cdi: z.number().nullable(),
    code: z.string(),
    detail: z.string(),
    dmin: z.number().nullable(),
    felt: z.number().nullable(),
    gap: z.number().nullable(),
    ids: z.string(),
    mag: z.number().nullable(),
    magType: z.string().nullable(),
    mmi: z.number().nullable(),
    net: z.string(),
    nst: z.number().nullable(),
    place: z.string().nullable(),
    rms: z.number().nullable(),
    sig: z.number(),
    sources: z.string(),
    status: z.string(),
    time: z.number(),
    title: z.string(),
    tsunami: z.number(),
    type: z.string(),
    types: z.string(),
    tz: z.number().nullable(),
    updated: z.number(),
    url: z.string(),
  }),
});

export type QuakeFeature = z.infer<typeof quakeFeatureSchema>;
