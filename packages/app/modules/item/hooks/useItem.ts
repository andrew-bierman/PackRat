import { useAuthUser } from 'app/modules/auth';
import { queryTrpc } from 'app/trpc';

type Item = {
  id: string;
  name: string;
  weight: number;
  unit: string;
  categoryId: string;
  ownerId: string;
  global: boolean;
  sku: string;
  productUrl: string;
  description: string;
  productDetails: Record<string, string | number | boolean>;
  seller: string;
  createdAt: string;
  updatedAt: string;
  images: { url: string }[];
  category: { id: string; name: string };
};

export const useItem = (itemId?: string) => {
  const user = useAuthUser();
  const { refetch, data, error, isLoading, isError } =
    queryTrpc.getItemById.useQuery<Item>(
      { id: itemId ?? '' },
      {
        enabled: !!itemId, // to ensure the query runs only when packId is available
        refetchOnWindowFocus: true,
        keepPreviousData: true,
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    );
  const isOwner = data && user && data.ownerId === user.id;

  console.log('useItem', { data });

  return { refetch, data, error, isLoading, isOwner, isError };
};
