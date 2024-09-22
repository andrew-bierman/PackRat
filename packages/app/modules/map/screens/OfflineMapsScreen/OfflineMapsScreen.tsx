import { Modal, Text, View, Image } from 'react-native';
import offlineManager from '@rnmapbox/maps';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import useTheme from 'app/hooks/useTheme';
import { api } from 'app/constants/api';
import { RButton, RScrollView, RStack, RText } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { Map } from 'app/modules/map';
import { useAuthUserToken, useUserQuery } from 'app/modules/auth';
import type OfflinePack from '@rnmapbox/maps/lib/typescript/src/modules/offline/OfflinePack';
import { disableScreen } from 'app/hoc/disableScreen';
import { MapPreviewCard } from 'app/modules/map/components';

interface OfflineMap {
  name: string;
  styleURL: string;
  bounds: [number[], number[]];
  minZoom: number;
  maxZoom: number;
  downloaded: boolean;
  metadata: {
    shape: unknown;
  };
}

const getCenterCoordinates = (bounds: [number[], number[]]) => {
  const [
    [southWestLongitude, southWestLatitude],
    [northEastLongitude, northEastLatitude],
  ] = bounds;
  const centerLatitude = (northEastLatitude + southWestLatitude) / 2;
  const centerLongitude = (northEastLongitude + southWestLongitude) / 2;

  return [centerLongitude, centerLatitude];
};

function CircleCapComp() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

  return (
    <View
      style={{
        height: 18,
        width: 18,
        borderRadius: 16,
        borderWidth: 3,
        borderColor: currentTheme.colors.white,
        backgroundColor: currentTheme.colors.cardIconColor,
      }}
    ></View>
  );
}

export const OfflineMapsScreen = () => {
  const styles = useCustomStyles(loadStyles);
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const { user } = useUserQuery();
  const { token } = useAuthUserToken();
  const [offlineMaps, setOfflineMaps] = useState<OfflineMap[]>();

  console.log('offlineMaps', offlineMaps)
  useFocusEffect(
    useCallback(() => {
      const refreshOfflineMapList = async () => {
        const offlineMaps = Object.values(user.offlineMaps || {});
        const offlineMapboxPacks: OfflineMap[] = [];
        for (const map of offlineMaps) {
          const offlineMap: OfflineMap = {
            styleURL: `${map.styleURL}`,
            name: `${map.name}`,
            minZoom: map.minZoom,
            maxZoom: map.maxZoom,
            bounds: map.bounds,
            metadata: {
              shape: JSON.parse(map.metadata.shape),
            },
            downloaded: false,
          };

          let offlineMapboxPack: OfflinePack | null;
          try {
            offlineMapboxPack = await offlineManager.getPack(map.name);
          } catch (error) {
            console.error(error);
            offlineMapboxPack = null;
          }

          if (offlineMapboxPack) {
            offlineMap.downloaded = true;
          }

          offlineMapboxPacks.push(offlineMap);
        }

        setOfflineMaps(offlineMapboxPacks);
      };

      refreshOfflineMapList();
    }, [user]),
  );

  return (
    <View
      style={{
        backgroundColor: currentTheme.colors.background,
        height: '100%',
      }}
    >
      <RScrollView nestedScrollEnabled={true} mb={50}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: 20,
            color: currentTheme.colors.black,
          }}
        >
          Downloaded Maps
        </Text>
        {offlineMaps ? (
          <View style={{ gap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
            {offlineMaps.map((offlineMap) => {
              console.log('singleMap' , offlineMap)
              // const center = getCenterCoordinates(offlineMap.bounds);
              return (
                <RStack
                  key={offlineMap.name}
                  style={{
                    flexDirection: 'column',
                    display: 'flex',
                    padding: 8,
                    backgroundColor: `${currentTheme.colors.secondaryBlue}`,
                    borderRadius: 15,
                  }}
                >
                  {/* <Map
                    shape={offlineMap.metadata.shape}
                    shouldEnableDownload={!offlineMap.downloaded}
                    mapName={offlineMap.name}
                    forceFullScreen={false}
                  /> */}
                  {/* <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginTop: 5,
                      textAlign: 'center',
                      color: currentTheme.colors.black,
                    }}
                  >
                    {offlineMap.name}
                  </Text> */}
                  <MapPreviewCard title={offlineMap.name} isDownloaded={offlineMap.downloaded}/>
                </RStack>
              );
            })}
          </View>
        ) : (
          <RStack>
            <Text>loading...</Text>
          </RStack>
        )}
      </RScrollView>
    </View>
  );
};

const loadStyles = ({ currentTheme }) => {
  return {
    lineLayer: {
      lineWidth: 4,
      lineOpacity: 1,
      lineColor: currentTheme.colors.cardIconColor,
    },
  };
};
