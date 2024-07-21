export interface MapProps {
  shape: any;
  onExitFullScreen?: () => void;
  forceFullScreen?: boolean;
  shouldEnableDownload?: boolean;
  mapName?: string;
}
