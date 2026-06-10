import { useQuery } from '@tanstack/react-query';
import { quakeFeedQuery } from './quakeQueries';

function useQuakesQuery(feed: string = 'all_week') {
  return useQuery(quakeFeedQuery(feed));
}

export default useQuakesQuery;
