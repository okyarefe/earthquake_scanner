interface QuakeListSummaryProps {
  shownCount: number;
  totalCount: number;
  minMagnitude: number;
  isFetching: boolean;
}

const QuakeListSummary = ({
  shownCount,
  totalCount,
  minMagnitude,
  isFetching,
}: QuakeListSummaryProps) => (
  <p className="text-sm text-muted-foreground">
    Showing {shownCount} of {totalCount} quakes (magnitude ≥{' '}
    {minMagnitude.toFixed(1)}){isFetching && ' · updating…'}
  </p>
);

export default QuakeListSummary;
