export interface MapPropsLegacy {
  shape: any;
  onExitFullScreen?: () => void;
  forceFullScreen?: boolean;
  shouldEnableDownload?: boolean;
  mapName?: string;
}

export interface MapProps {
  shape: any;
}
