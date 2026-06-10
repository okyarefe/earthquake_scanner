import { useEffect, useMemo, useRef } from 'react';
import {
  Layer,
  Source,
  type MapRef,
  type MapLayerMouseEvent,
} from 'react-map-gl/maplibre';
import BaseMap from '@/features/map/Map';
import type { QuakeFeature } from '../schemas/quakeFeature';
import { useSelectionStore } from '../store';
import QuakePopup from './QuakePopup';

interface QuakeMapProps {
  quakes: QuakeFeature[];
}

const QuakeMap = ({ quakes }: QuakeMapProps) => {
  const mapRef = useRef<MapRef>(null);
  const selectedQuakeId = useSelectionStore((state) => state.selectedQuakeId);
  const setSelectedQuakeId = useSelectionStore(
    (state) => state.setSelectedQuakeId,
  );

  const geojson = useMemo(
    () =>
      ({
        type: 'FeatureCollection',
        features: quakes,
      }) as GeoJSON.FeatureCollection,
    [quakes],
  );

  const selectedQuake = useMemo(
    () => quakes.find((q) => q.id === selectedQuakeId) ?? null,
    [quakes, selectedQuakeId],
  );

  const selectedGeojson = useMemo(
    () =>
      ({
        type: 'FeatureCollection',
        features: selectedQuake ? [selectedQuake] : [],
      }) as GeoJSON.FeatureCollection,
    [selectedQuake],
  );

  useEffect(() => {
    if (!selectedQuake) return;
    const [longitude, latitude] = selectedQuake.geometry.coordinates;
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: 6,
      duration: 1200,
    });
  }, [selectedQuake]);

  const handleClick = (event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];
    if (feature?.id != null) {
      setSelectedQuakeId(String(feature.id));
    }
  };

  return (
    <BaseMap
      ref={mapRef}
      onClick={handleClick}
      interactiveLayerIds={['quake-points', 'quake-point-selected']}
    >
      <Source id="quakes" type="geojson" data={geojson}>
        <Layer
          id="quake-points"
          type="circle"
          paint={{
            'circle-radius': 4,
            'circle-color': '#ef4444',
            'circle-opacity': 0.8,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffffff',
          }}
        />
      </Source>

      {/* Drawn after the main source, so the selected dot sits on top. */}
      <Source id="selected-quake" type="geojson" data={selectedGeojson}>
        <Layer
          id="quake-point-selected"
          type="circle"
          paint={{
            'circle-radius': 10,
            'circle-color': '#facc15',
            'circle-opacity': 1,
            'circle-stroke-width': 3,
            'circle-stroke-color': '#111827',
          }}
        />
      </Source>

      {selectedQuake && (
        <QuakePopup
          quake={selectedQuake}
          onClose={() => setSelectedQuakeId(null)}
        />
      )}
    </BaseMap>
  );
};

export default QuakeMap;
