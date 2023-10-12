import { useQuery } from "@tanstack/react-query";
import { trpc } from "../trpc";

export default function useGetPacks({ ownerId, queryString }) {
  console.log( ownerId)
  const { data, isError, error, isLoading } = useQuery(
    ["packs", ownerId], // Use ownerId and queryString as part of the queryKey
    async () => {
      try {
        const result = await trpc.getPacks.query({
          ownerId,
          queryBy: queryString,
        });
        return result; // Assuming 'result' already contains the data
      } catch (error) {
        throw error.response.data; // Handle errors appropriately based on your API response structure
      }
    },
    {
      enabled: Boolean(ownerId),
    }
  );

  return { isLoading, isError, error, data };
}
