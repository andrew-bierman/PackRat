import { Platform, View } from "react-native";


const Layout = ({children}) => {
    return (
        <View style={{backgroundColor:'transparent', width:Platform.OS === 'web' ? '60vw' : '100%', alignSelf:'center'}}>
            {children}
        </View>
    )
}

export default Layout;