import { queryTrpc } from "../trpc";
import { store } from '../store/store';


export const useFetchWeather = (latLng) => {
        const { lat, lon } = latLng;
        const isEnabled = Boolean(lat && lon)
        const { refetch, data, error, isLoading, isError  } = queryTrpc.getWeather.useQuery({ lat, lon }, {
            enabled : isEnabled,
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        });
    return { refetch, data, error, isLoading,isError };
}


export const useFetchWeatherWeak = (latLng) => {
    const { lat, lon } = latLng;
    const isEnabled = Boolean(lat && lon)
    const { refetch, data, error, isLoading, isError  } = queryTrpc.getWeatherWeek.useQuery({ lat, lon }, {
        enabled : isEnabled,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });
    const isOwner = data && user && data.owner_id === user._id;
    return { refetch, data, error, isLoading, isOwner,isError };
}


