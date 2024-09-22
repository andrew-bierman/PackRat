export interface MapViewProps {
  shape: any;
  mapStyle: string;
  onVisibleBoundsChange: (bounds: any) => void;
  initialBounds?: any;
}
