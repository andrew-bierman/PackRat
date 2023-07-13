import { Modal, Text, View, Image } from "react-native";
import Mapbox, { offlineManager } from "@rnmapbox/maps";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapButtonsOverlay from "../../components/map/MapButtonsOverlay";
import { theme } from "../../theme";

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
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 20,
          color: theme.colors.text
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
                  setPack(pack);
                  setShowMap(true);
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 10,
                  }}
                  source={{
                    uri: `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/[${pack.bounds[1]
                      .concat(pack.bounds[0])
                      .reduce(
                        (prev, curr) => prev + "," + curr
                      )}]/600x600?access_token=${
                      process.env.MAPBOX_ACCESS_TOKEN
                    }`,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginTop: 5,
                    color: theme.colors.text,
                  }}
                >
                  {metadata.name}
                </Text>
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
    </View>
  );
}
