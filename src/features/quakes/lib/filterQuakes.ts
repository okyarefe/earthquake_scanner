import type { QuakeFeature } from '../schemas/quakeFeature';

export interface QuakeFilters {
  minMagnitude: number;
}

const matchesMagnitude = (quake: QuakeFeature, minMagnitude: number): boolean =>
  typeof quake.properties.mag === 'number' &&
  quake.properties.mag >= minMagnitude;

export const filterQuakes = (
  quakes: QuakeFeature[],
  { minMagnitude }: QuakeFilters,
): QuakeFeature[] =>
  quakes.filter((quake) => matchesMagnitude(quake, minMagnitude));
