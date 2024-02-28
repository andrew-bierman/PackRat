import useCustomStyles from 'app/hooks/useCustomStyles';
import { ChevronRight, Cloud, Moon, Star, Sun } from '@tamagui/lucide-icons'
import { ListItem, Separator, Text, XStack, YGroup } from 'tamagui'
import { usePackTable } from '../../hooks/packs/usePackTable';
import { RSkeleton } from '@packrat/ui';
import { ErrorMessage } from '../../components/pack_table/TableHelperComponents';
import { Platform } from 'react-native';
import {
    ListItemFrame,
    ListItemProps,
    ListItemText,
    styled,
    themeable,
    useListItem,
} from 'tamagui'


export const UpdatedTable = () => {
    const styles = useCustomStyles(loadStyles);

    return (
        <>
            <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4" paddingVertical='$4'>
                <ListItemDemo1 />
            </XStack>
        </>
    )
}

function ListItemDemo1() {
    const styles = useCustomStyles(loadStyles);
    return (
        <YGroup alignSelf="center" bordered width={240} size="$4">
            <YGroup.Item >
                <ListItem >
                    <Text style={styles.tableHeading}>Pack List</Text>
                </ListItem>
            </YGroup.Item>
            <YGroup.Item>
                <ListItem title="Star"/>
            </YGroup.Item>
            <YGroup.Item>
                <ListItem hoverTheme icon={Moon}>
                    Moon
                </ListItem>
            </YGroup.Item>
            <YGroup.Item>
                <ListItem hoverTheme icon={Sun}>
                    Sun
                </ListItem>
            </YGroup.Item>
            <YGroup.Item>
                <ListItem hoverTheme icon={Cloud}>
                    Cloud
                </ListItem>
            </YGroup.Item>
        </YGroup>
    )
}

function ListItemDemo2() {
    return (
        <YGroup alignSelf="center" bordered width={240} size="$5" separator={<Separator />}>
            <YGroup.Item>
                <ListItem
                    hoverTheme
                    pressTheme
                    title="Star"
                    subTitle="Subtitle"
                    icon={Star}
                    iconAfter={ChevronRight}
                />
            </YGroup.Item>
            <YGroup.Item>
                <ListItem
                    hoverTheme
                    pressTheme
                    title="Moon"
                    subTitle="Subtitle"
                    icon={Moon}
                    iconAfter={ChevronRight}
                />
            </YGroup.Item>
        </YGroup>
    )
}
const loadStyles = (theme) => {
    const { currentTheme } = theme;
    return {
        tableHeading: {
            width: '100%',
            textAlign: 'center',
            fontSize : 15,
            fontWeight : 'bold'
        }
    }
}