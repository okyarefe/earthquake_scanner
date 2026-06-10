import ErrorState from '@/components/feedback/ErrorState';
import LoadingState from '@/components/feedback/LoadingState';
import FilterBar from '@/features/filters/components/FilterBar';
import { useFilteredQuakes } from '../hooks/useFilteredQuakes';
import QuakeList from './QuakeList';
import QuakeMap from './QuakeMap';

const QuakesView = () => {
  const { isPending, isFetching, error, quakes, totalCount, minMagnitude } =
    useFilteredQuakes();

  return (
    <div className="flex flex-col gap-4 lg:grid lg:h-[calc(100vh-8rem)] lg:grid-cols-[20rem_1fr]">
      <aside className="flex flex-col gap-4 lg:min-h-0">
        <FilterBar />
        <div className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
          {isPending ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error.message} />
          ) : (
            <QuakeList
              quakes={quakes}
              totalCount={totalCount}
              minMagnitude={minMagnitude}
              isFetching={isFetching}
            />
          )}
        </div>
      </aside>

      <section className="h-[50vh] overflow-hidden rounded-lg border lg:h-auto">
        <QuakeMap quakes={quakes} />
      </section>
    </div>
  );
};

export default QuakesView;
