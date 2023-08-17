import NetInfo from '@react-native-community/netinfo';


export const isConnected = async () => {
    return await NetInfo.fetch().then(state => state.isConnected);
}