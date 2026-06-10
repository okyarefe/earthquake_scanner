import { useMemo } from 'react';
import { useFiltersStore } from '@/features/filters/store';
import useQuakesQuery from '../api/useQuakesQuery';
import { feedForWindow } from '../lib/feeds';
import { filterQuakes } from '../lib/filterQuakes';

export function useFilteredQuakes() {
  const minMagnitude = useFiltersStore((state) => state.minMagnitude);
  const timeWindow = useFiltersStore((state) => state.timeWindow);

  const { isPending, isFetching, error, data } = useQuakesQuery(
    feedForWindow(timeWindow),
  );

  const quakes = useMemo(
    () => (data ? filterQuakes(data.features, { minMagnitude }) : []),
    [data, minMagnitude],
  );

  return {
    isPending,
    isFetching,
    error,
    quakes,
    totalCount: data?.features.length ?? 0,
    minMagnitude,
  };
}
