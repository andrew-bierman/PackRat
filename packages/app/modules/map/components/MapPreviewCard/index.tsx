import React from 'react';
import { StatusLabel } from './StatusLabel';
import { View, RText, Card, YStack, Details } from '@packrat/ui'
import useTheme from 'app/hooks/useTheme';

interface MapPreviewCardProps {
    title: String,
    isDownloaded: boolean,
}

export const MapPreviewCard: FC<MapPreviewCardProps> = ({ title, isDownloaded }) => {

    const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
        useTheme();
    return (
        <View style={{
            width: '100%',
        }}>
            <Card
                title={title}
                subtitle={<StatusLabel isDownloaded={isDownloaded} />}
                link=''
                image={null}
                type='primary'
                actions={null}
                content={
                    <YStack>
                        <RText>Options</RText>
                        <Details
                            items={[
                                {
                                    key: 'Show Map',
                                    label: 'Show Map',
                                    value: 'Show Map',
                                },
                            ]}
                        />
                    </YStack>
                }
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        </View>
    )
};
