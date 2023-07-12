import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import Mapbox, { ShapeSource, offlineManager, Camera } from "@rnmapbox/maps";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapButtonsOverlay from "../../components/map/MapButtonsOverlay";
import { calculateZoomLevel } from "../../utils/mapFunctions";

export default function DownloadedMaps() {
  const [offlinePacks, setOfflinePacks] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [pack, setPack] = useState(null);

  useEffect(() => {
    offlineManager.getPacks().then((packs) => {
      setOfflinePacks(packs);
    });
  }, []);

  console.log("heiight", Dimensions.get("screen").height);

  return (
    <>
      <Text
        style={{
          textAlign: "center",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
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
                  backgroundColor: "#f3f3f3",
                  paddingVertical: 20,
                  paddingLeft: 10,
                }}
                onPress={() => {
                  setPack(pack);
                  setShowMap(true);
                }}
              >
                <Text style={{ fontSize: 16 }}>{metadata.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <Text>loading...</Text>
      )}
      {showMap ? (
        <Modal visible={true}>
          <Mapbox.MapView
            // ref={mapViewRef}
            style={{ flex: 1 }}
            styleURL="mapbox://styles/mapbox/outdoors-v11" // TODO
            // onDidFinishRenderingMapFully={onMapLoaded}
            compassEnabled={false}
            logoEnabled={false}
            scrollEnabled={true}
            zoomEnabled={true}
          >
            <Mapbox.Camera
              // ref={camera}
              zoomLevel={15}
              centerCoordinate={[
                (pack.bounds[0][0] + pack.bounds[1][0]) / 2,
                (pack.bounds[0][1] + pack.bounds[1][1]) / 2,
              ]}
              animationMode={"flyTo"}
              animationDuration={2000}
            />
            {/* // user location */}
            {/* <Mapbox.PointAnnotation
              id={"1212"}
              coordinate={[location.longitude, location.latitude]}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={35}
                  color={"#de0910"}
                />
              </View>
            </Mapbox.PointAnnotation> */}
            {/* trail */}
            {/* <Mapbox.ShapeSource
              id="source1"
              lineMetrics={true}
              shape={shape.features[0]}
              cluster
              clusterRadius={80}
              clusterMaxZoomLevel={14}
              style={{ zIndex: 1 }}
            >
              <Mapbox.LineLayer id="layer1" style={styles.lineLayer} />
            </Mapbox.ShapeSource> */}
            {/* // top location */}
            {/* {shape?.features[0]?.geometry?.coordinates?.length > 0 && (
              <Mapbox.PointAnnotation
                id={"cicleCap"}
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
            )} */}
          </Mapbox.MapView>
          <MapButtonsOverlay
            mapFullscreen={true}
            // enableFullScreen={() => setMapFullscreen(true)}
            disableFullScreen={() => setShowMap(false)}
            // handleChangeMapStyle={setMapStyle}
            // fetchLocation={() =>
            //   getPosition((location) =>
            //     setTrailCenterPoint([location.latitude, location.longitude])
            //   )
            // }
            styles={styles}
            downloadable={false}
            // downloading={downloading}
            // shape={shape}
            // onDownload={() => setShowMapNameInputDialog(true)}
            // progress={progress}
            // handleOffline={() => {
            //   setShowOfflinePacks(true);
            // }}
          />
        </Modal>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    // height: 500,
    width: "100%",
    backgroundColor: "white",
    marginBottom: 20,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  map: {
    flex: 1,
  },
  lineLayer: {
    lineColor: "#16b22d",
    lineWidth: 4,
    lineOpacity: 1,
  },
  headerView: {
    position: "absolute",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
  },
  headerBtnView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    backgroundColor: "white",
  },
  button: {
    position: "absolute",
    bottom: 10,
    right: 10,
    // backgroundColor: theme.colors.primary,
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});
