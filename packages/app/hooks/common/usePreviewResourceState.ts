import { useEffect, useState } from 'react';
import { type PaginationReturn } from 'app/hooks/pagination';

interface PreviewResourceState {
  isSeeAllModalOpen: boolean;
  isAllQueryEnabled: boolean;
  setIsSeeAllModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PreviewResourceStateWithData
  extends PreviewResourceState,
    Partial<PaginationReturn> {
  resourceName: string;
  isPreviewLoading: boolean;
  previewData: any;
  isAllQueryLoading: boolean;
  allQueryData: any;
  nextPage?: number;
  fetchNextPage: () => void;
}
export const usePreviewResourceState = (): PreviewResourceState => {
  const [isSeeAllModalOpen, setIsSeeAllModalOpen] = useState(false);
  const [isAllQueryEnabled, setIsAllQueryEnabled] = useState(false);

  useEffect(() => {
    if (isSeeAllModalOpen) {
      setIsAllQueryEnabled(true);
    }
  }, [isSeeAllModalOpen]);

  return {
    isSeeAllModalOpen,
    setIsSeeAllModalOpen,
    isAllQueryEnabled,
  };
};
