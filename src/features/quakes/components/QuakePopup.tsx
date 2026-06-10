import { Popup } from 'react-map-gl/maplibre';
import { cn } from '@/lib/utils';
import type { QuakeFeature } from '../schemas/quakeFeature';

interface QuakePopupProps {
  quake: QuakeFeature;
  onClose: () => void;
}

// Color the magnitude badge by rough severity.
const magBadgeColor = (mag: number | null) => {
  if (mag == null) return 'bg-gray-400';
  if (mag >= 5) return 'bg-red-600';
  if (mag >= 4) return 'bg-orange-500';
  if (mag >= 2) return 'bg-amber-500';
  return 'bg-emerald-500';
};

const timeFormat = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const QuakePopup = ({ quake, onClose }: QuakePopupProps) => {
  const [longitude, latitude, depth] = quake.geometry.coordinates;
  const { mag, place, time, url } = quake.properties;

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      anchor="bottom"
      offset={14}
      maxWidth="300px"
      closeButton={false}
      closeOnClick={false}
      onClose={onClose}
      className={cn(
        '[&_.maplibregl-popup-content]:overflow-hidden',
        '[&_.maplibregl-popup-content]:rounded-xl',
        '[&_.maplibregl-popup-content]:border [&_.maplibregl-popup-content]:border-gray-200',
        '[&_.maplibregl-popup-content]:bg-white',
        '[&_.maplibregl-popup-content]:p-0',
        '[&_.maplibregl-popup-content]:shadow-xl',
        '[&_.maplibregl-popup-tip]:border-t-white',
      )}
    >
      <div className="w-64">
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-3 py-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'rounded-md px-2 py-0.5 text-sm font-bold tabular-nums text-white',
                magBadgeColor(mag),
              )}
            >
              {mag?.toFixed(1) ?? '—'}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
              Magnitude
            </span>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="-mr-1 grid h-6 w-6 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="px-3 py-2.5">
          <p className="text-sm font-semibold leading-snug text-gray-900">
            {place ?? 'Unknown location'}
          </p>

          <dl className="mt-2.5 grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <dt className="text-[11px] uppercase tracking-wide text-gray-400">
                Depth
              </dt>
              <dd className="text-sm font-medium tabular-nums text-gray-700">
                {depth.toFixed(1)} km
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-[11px] uppercase tracking-wide text-gray-400">
                When
              </dt>
              <dd className="text-sm font-medium text-gray-700">
                {timeFormat.format(new Date(time))}
              </dd>
            </div>
          </dl>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
          >
            View on USGS →
          </a>
        </div>
      </div>
    </Popup>
  );
};

export default QuakePopup;
