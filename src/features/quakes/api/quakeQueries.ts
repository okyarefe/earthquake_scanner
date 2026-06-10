import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { fetchEarthquakes } from './fetchEarthquakes';

const QUAKE_POLL_INTERVAL_MS = 5 * 60 * 1000;
const QUAKE_STALE_TIME_MS = 60 * 1000;

export const quakeFeedQuery = (feed: string) =>
  queryOptions({
    queryKey: ['earthquakes', feed],
    queryFn: () => fetchEarthquakes(feed),
    refetchInterval: QUAKE_POLL_INTERVAL_MS,
    staleTime: QUAKE_STALE_TIME_MS,
    placeholderData: keepPreviousData,
    retry: 2,
  });
