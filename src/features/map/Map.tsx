import type { ReactNode, Ref } from 'react';
import Map, {
  type MapRef,
  type MapLayerMouseEvent,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

interface BaseMapProps {
  children?: ReactNode;
  ref?: Ref<MapRef>;
  onClick?: (event: MapLayerMouseEvent) => void;
  interactiveLayerIds?: string[];
}

const BaseMap = ({
  children,
  ref,
  onClick,
  interactiveLayerIds,
}: BaseMapProps) => (
  <Map
    ref={ref}
    initialViewState={{ longitude: 0, latitude: 20, zoom: 1 }}
    style={{ width: '100%', height: 800 }}
    mapStyle="https://demotiles.maplibre.org/style.json"
    renderWorldCopies={false}
    minZoom={1}
    onClick={onClick}
    interactiveLayerIds={interactiveLayerIds}
  >
    {children}
  </Map>
);

export default BaseMap;
