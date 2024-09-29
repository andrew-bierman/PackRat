import { useState } from 'react';

interface PreviewResourceState {
  isSeeAllModalOpen: boolean;
  isAllQueryEnabled: boolean;
  setIsSeeAllModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PreviewResourceStateWithData extends PreviewResourceState {
  isPreviewLoading: boolean;
  previewData: any;
  isAllQueryLoading: boolean;
  allQueryData: any;
  nextPage?: number;
  fetchNextPage: () => void;
}
export const usePreviewResourceState = (): PreviewResourceState => {
  const [isSeeAllModalOpen, setIsSeeAllModalOpen] = useState(false);

  return {
    isSeeAllModalOpen,
    setIsSeeAllModalOpen,
    isAllQueryEnabled: isSeeAllModalOpen,
  };
};
