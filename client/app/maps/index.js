import { Modal, Text, View } from "react-native";
import Mapbox, { offlineManager } from "@rnmapbox/maps";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapButtonsOverlay from "../../components/map/MapButtonsOverlay";

export default function DownloadedMaps() {
  const [offlinePacks, setOfflinePacks] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [pack, setPack] = useState(null);

  useEffect(() => {
    offlineManager.getPacks().then((packs) => {
      setOfflinePacks(packs);
    });
  }, []);

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
            style={{ flex: 1 }}
            styleURL="mapbox://styles/mapbox/outdoors-v11"
            compassEnabled={false}
            logoEnabled={false}
            scrollEnabled={true}
            zoomEnabled={true}
          >
            <Mapbox.Camera
              zoomLevel={10}
              centerCoordinate={[
                (pack.bounds[0][0] + pack.bounds[1][0]) / 2,
                (pack.bounds[0][1] + pack.bounds[1][1]) / 2,
              ]}
              animationMode={"flyTo"}
              animationDuration={2000}
            />
          </Mapbox.MapView>
          <MapButtonsOverlay
            mapFullscreen={true}
            disableFullScreen={() => setShowMap(false)}
            downloadable={false}
          />
        </Modal>
      ) : null}
    </>
  );
}