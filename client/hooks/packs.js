import React from "react";
import { queryTrpc } from "../trpc";
import { tr } from "date-fns/locale";

export const usePacks =  (queryString, ownerId, feedType, selectedTypes) => {
    console.log(feedType,'feed type', ownerId,queryString, 'query string',selectedTypes)
    let  data = [];
    let isLoading = true;
    switch (feedType) {
        case 'public':
            const publicPacks = queryTrpc.getPublicPacks.useQuery({ queryBy:queryString ? queryString:  'Favorite' }, {
                refetchOnWindowFocus : false,
                keepPreviousData: true
            });
            const publicTrips = queryTrpc.getPublicTripsRoute.useQuery({ queryBy: queryString ? queryString : 'Favorite' }, {
                refetchOnWindowFocus : false,
                keepPreviousData: true,
                enabled: publicPacks?.status === 'success',
            }); 
            if(selectedTypes.pack) {
                if(publicPacks?.status === 'success') {
                    data = [...data, ...publicPacks?.data?.map(item => ({ ...item, type: 'pack' }))];
                    isLoading = publicPacks?.isLoading
                }
            } 
            if(selectedTypes?.trip) {
                if(publicTrips?.status === 'success')
                    console.log(JSON.stringify(publicTrips));
                    data = [...data, ...publicTrips?.data?.map(item => ({ ...item,  type: 'trip'}))]
                    isLoading = publicTrips.isLoading
            }
            break;
        case ('userPacks'):
            {   
            if(ownerId) {
                const userPacks = queryTrpc.getPacks.useQuery({ ownerId, queryBy: queryString }, {
                    refetchOnWindowFocus : false,
                    keepPreviousData : true
                });
                // return { ...userPacks, data: userPacks?.data?.packs };
                if(userPacks.status == 'success') {
                    data = userPacks?.data?.packs;
                    isLoading = false
                }
            }
            break;
        }
        case ('userTrips'):
            {
                if(ownerId) {
                    const userTrips = queryTrpc.getTrips.useQuery({ owner_id: ownerId },{
                        refetchOnWindowFocus : false,
                        keepPreviousData : true
                    });
                    if(userTrips.status === 'success') {
                        data = userTrips.data;
                        isLoading = false
                    }
                }
                break;
            }
            
        default:
            return { data: null, erro : null };
    }
    return data   
}

export const useAddNewPack = () => {
    // console.log(obj);
    const mutation = queryTrpc.addPack.useMutation();
    return { mutation }
}