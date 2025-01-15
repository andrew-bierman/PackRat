export type Shape = any;

export interface MapStyle {
  style: string;
  label: string;
}
export interface OfflineMap {
  id: string;
  name: string;
  styleURL: string;
  userId: string;
  minZoom?: number;
  maxZoom?: number;
  bounds: [number[], number[]];
  downloaded: boolean;
  fileName?: string;
}
