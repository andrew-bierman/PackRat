export interface OfflineMap {
  name: string;
  styleURL: string;
  bounds: [number[], number[]];
  minZoom: number;
  maxZoom: number;
  metadata: {
    userId: string;
  };
}
