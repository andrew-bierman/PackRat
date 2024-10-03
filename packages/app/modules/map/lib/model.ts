export interface MapViewProps {
  shape?: any;
  isInteractive?: boolean;
  shapeURI?: string;
  mapStyle: string;
  onVisibleBoundsChange: (bounds: any) => void;
  initialBounds?: any;

  offlineMapName?: string;
}
