import { createParam } from '@packrat/crosspath';

type ParamsType = { itemTypeId: string | null; type: string | null };
const { useParams } = createParam<ParamsType>();

export const useChatParams = () => {
  const { params } = useParams('itemTypeId');
  const { itemTypeId, type } = params;
  return { itemTypeId, type };
};
