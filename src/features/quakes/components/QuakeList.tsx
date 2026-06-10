import type { QuakeFeature } from '../schemas/quakeFeature';
import QuakeListItem from './QuakeListItem';
import QuakeListSummary from './QuakeListSummary';

interface QuakeListProps {
  quakes: QuakeFeature[];
  totalCount: number;
  minMagnitude: number;
  isFetching: boolean;
}

const QuakeList = ({
  quakes,
  totalCount,
  minMagnitude,
  isFetching,
}: QuakeListProps) => (
  <div className="text-left">
    <QuakeListSummary
      shownCount={quakes.length}
      totalCount={totalCount}
      minMagnitude={minMagnitude}
      isFetching={isFetching}
    />
    <ul className="mt-2 flex flex-col gap-1">
      {quakes.map((quake) => (
        <QuakeListItem key={quake.id} quake={quake} />
      ))}
    </ul>
  </div>
);

export default QuakeList;
