import { cn } from '@/lib/utils';
import type { QuakeFeature } from '../schemas/quakeFeature';
import { useSelectionStore } from '../store';

interface QuakeListItemProps {
  quake: QuakeFeature;
}

const QuakeListItem = ({ quake }: QuakeListItemProps) => {
  const { mag, place } = quake.properties;
  const isSelected = useSelectionStore(
    (state) => state.selectedQuakeId === quake.id,
  );
  const setSelectedQuakeId = useSelectionStore(
    (state) => state.setSelectedQuakeId,
  );

  return (
    <li>
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={() => setSelectedQuakeId(quake.id)}
        className={cn(
          'w-full rounded px-2 py-1 text-left text-sm transition-colors hover:bg-muted',
          isSelected &&
            'bg-primary/10 font-medium ring-1 ring-primary hover:bg-primary/10',
        )}
      >
        <span className="font-medium tabular-nums">M {mag?.toFixed(1)}</span> —{' '}
        {place ?? 'Unknown location'}
      </button>
    </li>
  );
};

export default QuakeListItem;
