import { quakeResponseSchema, type QuakeResponse } from '../schemas';

const FEED_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/';

export async function fetchEarthquakes(feed: string): Promise<QuakeResponse> {
  console.log('Making API request');

  const response = await fetch(`${FEED_URL}${feed}.geojson`);
  if (!response.ok) {
    throw new Error(`Failed to fetch quakes: ${response.status}`);
  }
  const json: unknown = await response.json();
  console.log('API response received', json);
  return quakeResponseSchema.parse(json);
}
