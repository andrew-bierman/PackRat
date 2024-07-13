import { Modal, Text, View, Image, Dimensions } from 'react-native';
import Mapbox, {
  offlineManager,
  OfflineCreatePackOptions,
} from '@rnmapbox/maps';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapButtonsOverlay from 'app/components/map/MapButtonsOverlay';
import { theme } from 'app/theme';
import useTheme from 'app/hooks/useTheme';
import { StyleSheet } from 'react-native';
import {
  calculateZoomLevel,
  getShapeSourceBounds,
} from 'app/utils/mapFunctions';
import { api } from 'app/constants/api';
import { RScrollView, RStack } from '@packrat/ui';
import useCustomStyles from 'app/hooks/useCustomStyles';

interface Pack {
  bounds: number[][];
  metadata: string;
}

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

export default function DownloadedMaps() {
  const styles = useCustomStyles(loadStyles);

  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const [offlinePacks, setOfflinePacks] = useState<any[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [pack, setPack] = useState<OfflineCreatePackOptions | null>(null);

  let shape, zoomLevel;
  if (pack != null) {
    shape = pack && JSON.parse(JSON.parse(pack.metadata).shape);
    const dw = Dimensions.get('screen').width;
    zoomLevel = calculateZoomLevel(pack.bounds, {
      width: dw,
      height: 360,
    });
  }

  useFocusEffect(
    useCallback(() => {
      offlineManager.getPacks().then((packs) => {
        setOfflinePacks(packs);
      });
    }, []),
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
            color: currentTheme.colors.text,
          }}
        >
          Downloaded Maps
        </Text>
        {offlinePacks ? (
          <View style={{ gap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
            {offlinePacks.map(({ pack }) => {
              const metadata = JSON.parse(pack.metadata);
              return (
                <TouchableOpacity
                  style={{
                    padding: 8,
                    backgroundColor: `${currentTheme.colors.secondaryBlue}`,
                    borderRadius: 15,
                  }}
                  onPress={() => {
                    setPack(pack);
                    setShowMap(true);
                  }}
                >
                  {pack && (
                    <Image
                      style={{
                        width: '100%',
                        height: 200,
                        borderRadius: 15,
                      }}
                      source={{
                        uri: `${api}/mapPreview/${
                          pack?.bounds[0] + ',' + pack?.bounds[1]
                        },10,60,60/600x600`,
                      }}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginTop: 5,
                      textAlign: 'center',
                      color: currentTheme.colors.text,
                    }}
                  >
                    {metadata.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <RStack>
            <Text>loading...</Text>
          </RStack>
        )}
      </RScrollView>
      {showMap ? (
        <Modal visible={true}>
          <Mapbox.MapView
            style={{ flex: 1 }}
            styleURL="mapbox://styles/mapbox/outdoors-v11"
            compassEnabled={false}
            logoEnabled={false}
            scrollEnabled={true}
            zoomEnabled={true}
          >
            <Mapbox.Camera
              zoomLevel={zoomLevel}
              centerCoordinate={getCenterCoordinates(pack?.bounds)}
              animationMode={'flyTo'}
              animationDuration={2000}
            />
            {/* trail */}
            <Mapbox.ShapeSource
              id="source1"
              lineMetrics={true}
              shape={shape.features[0]}
              cluster
              clusterRadius={80}
              clusterMaxZoomLevel={14}
              style={{ zIndex: 1 }}
            >
              <Mapbox.LineLayer id="layer1" style={styles.lineLayer} />
            </Mapbox.ShapeSource>
            {/* // top location */}
            {/* TODO implement notations */}
            {/* {shape?.features[0]?.geometry?.coordinates?.length > 0 && (
              <Mapbox.PointAnnotation
                id={'cicleCap'}
                coordinate={
                  shape?.features[0]?.geometry?.coordinates[
                    shape?.features[0]?.geometry?.coordinates?.length - 1
                  ][0]
                }
              >
                <View>
                  <CircleCapComp />
                </View>
              </Mapbox.PointAnnotation>
            )} */}
          </Mapbox.MapView>

          <MapButtonsOverlay
            mapFullscreen={true}
            disableFullScreen={() => {
              setShowMap(false);
            }}
            downloadable={false}
          />
        </Modal>
      ) : null}
    </View>
  );
}

const getCenterCoordinates = (bounds: [number, number, number, number]) => {
  const [
    southWestLongitude,
    southWestLatitude,
    northEastLongitude,
    northEastLatitude,
  ] = bounds;
  const centerLatitude = (northEastLatitude + southWestLatitude) / 2;
  const centerLongitude = (northEastLongitude + southWestLongitude) / 2;

  return [centerLongitude, centerLatitude];
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
