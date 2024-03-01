import { Modal, Text, View, Image, Dimensions } from 'react-native';
import Mapbox, { offlineManager } from '@rnmapbox/maps';
import { useEffect, useState } from 'react';
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
import { RStack } from '@packrat/ui';

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
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const [offlinePacks, setOfflinePacks] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [pack, setPack] = useState(null);

  let shape, zoomLevel;
  if (pack != null) {
    shape = pack && JSON.parse(JSON.parse(pack.metadata).shape);
    const dw = Dimensions.get('screen').width;
    const bounds = getShapeSourceBounds(shape);

    zoomLevel = calculateZoomLevel(bounds[0].concat(bounds[1]), {
      width: dw,
      height: 360,
    });
  }

  useEffect(() => {
    offlineManager.getPacks().then((packs) => {
      setOfflinePacks(packs);
    });
  }, []);

  return (
    <View style={{ backgroundColor: currentTheme.colors.background }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 20,
          color: currentTheme.colors.text,
        }}
      >
        Downloaded Maps
      </Text>
      {offlinePacks ? (
        <View style={{ gap: 4 }}>
          {offlinePacks.map(({ pack }) => {
            const metadata = JSON.parse(pack.metadata);
            return (
              <TouchableOpacity
                style={{
                  padding: 20,
                }}
                onPress={() => {
                  console.log('pack object', pack);
                  console.log('pack metadata', pack.metadata);
                  setPack(pack);
                  setShowMap(true);
                }}
              >
                {pack && (
                  <Image
                    style={{
                      width: '100%',
                      height: 200,
                      borderRadius: 10,
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
              centerCoordinate={[
                (pack.bounds[0][0] + pack.bounds[1][0]) / 2,
                (pack.bounds[0][1] + pack.bounds[1][1]) / 2,
              ]}
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
              <Mapbox.LineLayer
                id="layer1"
                style={[
                  styles.lineLayer,
                  { lineColor: currentTheme.colors.cardIconColor },
                ]}
              />
            </Mapbox.ShapeSource>
            {/* // top location */}
            {shape?.features[0]?.geometry?.coordinates?.length > 0 && (
              <Mapbox.PointAnnotation
                id={'cicleCap'}
                coordinate={
                  shape?.features[0]?.geometry?.coordinates[
                    shape?.features[0]?.geometry?.coordinates?.length - 1
                  ]
                }
              >
                <View>
                  <CircleCapComp />
                </View>
              </Mapbox.PointAnnotation>
            )}
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

const styles = StyleSheet.create({
  lineLayer: {
    lineWidth: 4,
    lineOpacity: 1,
  },
});
