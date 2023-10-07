import fetcher from "../api/fetcher";
import { api } from "../constants/api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../constants/queryClient";
import { trpc } from "../trpc";


export default function useAddPack() {
  const mutation = useMutation(
    async (newPack) => {
      try {
        // Send the request to the server
        const response = await trpc.addPack.mutate(newPack);
        console.log("Response:", response);
        return response;
      } catch (error) {
        throw error;
      }
    },
    {
      onMutate:async (newPack) => {
         await queryClient.cancelQueries(["packs", newPack.owner_id])
        // Step 1: Define optimistic update
        const optimisticUpdate = {
          ...newPack,
          id: Date.now(),
        };
        console.log("Optimistic update")
        console.log( newPack)
        const oldQueryData= queryClient.getQueryData(["packs", newPack.owner_id]);
        console.log("old data")
        console.log(oldQueryData)
        const newQueryData = {
          ...oldQueryData,
          packs: [
            ...oldQueryData.packs,
            optimisticUpdate
          ],
        };
        queryClient.setQueryData(["packs", newPack.owner_id],newQueryData )
        return {
          oldQueryData
        }

      },
      onError:(_error,_pack,context)=>{
        console.log("error")
        console.log(context.oldQueryData)
        queryClient.setQueryData(['packs',_pack.owner_id],context.oldQueryData)//revert changes
      },
      onSuccess: (result) => {
        console.log("Success:", result);
        queryClient.invalidateQueries({ queryKey: ["packs",result.owner_id] });
      },
    }
  );

  return { addPack: mutation };
}
