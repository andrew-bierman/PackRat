import { queryTrpc } from '../trpc';
interface IReturnProps {
  isLoading?: boolean;
  isError?: boolean;
  data: any;
  // need to define data types according to backend
}
export const useFetchGlobalItems = (
  limit: number,
  page: number,
): IReturnProps => {
  const { isLoading, isError, data } = queryTrpc.getItemsGlobally.useQuery({
    limit: Number(limit),
    page: Number(page),
  });
  return { isLoading, isError, data };
};
