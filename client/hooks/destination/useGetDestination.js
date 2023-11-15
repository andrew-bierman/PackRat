import { queryTrpc } from "../../trpc";

export const useGetDestination = (destinationId) => {
    const enabled = !!destinationId;

    const {refetch, isLoading, isError, data, error } = 
    queryTrpc.getDestination.useQuery(
            { id:destinationId },
            {
                enabled,
                // keepPreviousData: true,
            }
        )
    return {refetch, isLoading, isError, data, error }
}