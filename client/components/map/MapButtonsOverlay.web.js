import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Modal,
  View,
} from "react-native";
import { Box, Select } from "native-base";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { convertGeoJSONToGPX, resetGpxData } from "../../store/gpxStore";
import { mapboxStyles, handleGpxDownload } from "../../utils/mapFunctions";

const MapButtonsOverlay = ({
  mapFullscreen,
  enableFullScreen,
  disableFullScreen,
  mapStyle,
  handleChangeMapStyle,
  downloadable,
  fetchLocation,
  showModal,
  shape,
}) => {
  const dispatch = useDispatch();
  const gpxData = useSelector((state) => state.gpx.gpxData);

  const [showStyleOptions, setShowStyleOptions] = useState(false);
  const [downloading, setDownloading] = useState(false); // New state for downloading

  const handleStyleOptionPress = () => {
    setShowStyleOptions(!showStyleOptions);
  };

  const handleStyleSelection = (style) => {
    handleChangeMapStyle(style);
    setShowStyleOptions(false);
  };

  const fetchGpxDownload = async () => {
    setDownloading(true);

    console.log("gpxData at start of fetchGpxDownload", gpxData);

    try {
      const updatedGpxData = await dispatch(convertGeoJSONToGPX(shape));

      const { payload } = updatedGpxData;

      await handleGpxDownload(payload);

      setDownloading(false);
    } catch (error) {
      console.log("error", error);
      setDownloading(false);
    }
  };

  return (
    <>
      {!mapFullscreen ? (
        // Preview map
        <TouchableOpacity
          style={[styles.headerBtnView, styles.enterFullScreenBtn]}
          onPress={enableFullScreen}
        >
          <Entypo name="resize-full-screen" size={21} color={"grey"} />
        </TouchableOpacity>
      ) : (
        // Fullscreen map
        <>
          {mapFullscreen && (
            <TouchableOpacity
              style={[styles.headerBtnView, styles.exitFullscreenBtn]}
              onPress={disableFullScreen}
            >
              <Entypo name="circle-with-cross" size={21} color={"grey"} />
            </TouchableOpacity>
          )}

          {/* Style Picker Button */}
          <TouchableOpacity
            style={[styles.headerBtnView, styles.stylePicker]}
            onPress={handleStyleOptionPress}
          >
            <MaterialCommunityIcons
              name="layers-triple-outline"
              size={21}
              color="grey"
            />
          </TouchableOpacity>

          {/* Style Selection Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={showStyleOptions}
          >
            <TouchableOpacity
              style={styles.styleModalContainer}
              onPress={handleStyleOptionPress}
            >
              <View style={styles.styleModalContent}>
                {mapboxStyles.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.styleOption}
                    onPress={() => handleStyleSelection(item.style)}
                  >
                    <Text style={styles.styleOptionText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Download Button */}
          {downloadable && (
            <TouchableOpacity
              style={[styles.headerBtnView, styles.fullScreen]}
              onPress={fetchGpxDownload}
              disabled={downloading}
            >
              <Image
                style={styles.downloadIcon}
                source={require("../../assets/download.svg")}
              />
              <Text style={styles.downloadText}>
                {downloading ? "Downloading" : "Download map"}
              </Text>
            </TouchableOpacity>
          )}

          {/* Location Button */}
          <TouchableOpacity
            style={styles.locationButton}
            onPress={fetchLocation}
          >
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "400px",
    width: "100%",
    borderRadius: "10px",
  },
  map: {
    width: "100%",
    minHeight: "100vh", // Adjust the height to your needs
  },
  stylePicker: {
    // Style Picker Button
    position: "absolute",
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "white",
  },
  styleModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  styleModalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
  },
  styleOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  styleOptionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    position: "absolute",
    bottom: 30,
    right: 10,
    backgroundColor: "white",
    borderRadius: 30,
    zIndex: 1,
  },
  headerBtnView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
  },
  enterFullScreenBtn: {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  exitFullscreenBtn: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 10,
    right: 10,
  },
  fullScreen: {
    width: "25%",
    height: 40,
    padding: 10,
    backgroundColor: "white",
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  downloadIcon: {
    width: 21,
    height: 21,
  },
  downloadText: {
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 8,
  },
  modal: {
    alignItems: "center",
  },
});

export default MapButtonsOverlay;
