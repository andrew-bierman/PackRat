export type Shape = any;

export interface MapStyle {
  style: string;
  label: string;
}

export interface OfflineMap {
  name: string;
  styleURL: string;
  bounds: [number[], number[]];
  minZoom: number;
  maxZoom: number;
  downloaded: boolean;
  metadata: {
    shape: unknown;
  };
}
