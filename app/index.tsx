import { ActivityIndicator, View } from "react-native";
import Colors from '../lib/constants/Colors';

const StartPage = () => {
    return (
        <View style={{ flex:1, justifyContent:'center'}}>
            <ActivityIndicator size="large" color={Colors.primary}/>
        </View>
    )
}

export default StartPage