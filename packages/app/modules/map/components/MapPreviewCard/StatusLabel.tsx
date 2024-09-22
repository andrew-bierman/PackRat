import { RText, View } from '@packrat/ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface StatusLabelProps {
    isDownloaded: boolean,
}

export const StatusLabel: FC<StatusLabelProps> = ({ isDownloaded }) => {
    return (
        <View>
            {
                isDownloaded ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
                        <MaterialCommunityIcons name="check" size={24} color="black" />
                        <RText>Downloaded</RText>
                    </View>
                ) :
                    (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                            <MaterialCommunityIcons name="progress-download" size={24} color="black" />
                            <RText>Downloading</RText>
                        </View>
                    )
            }
        </View>
    )
}