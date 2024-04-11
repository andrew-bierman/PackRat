import React, { useState } from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  Modal,
  View,
  Alert,
  Platform,
} from 'react-native';
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import { mapboxStyles } from '../../utils/mapFunctions';
import useCustomStyles from 'app/hooks/useCustomStyles';

interface MapButtonsOverlayProps {
  mapFullscreen: boolean;
  enableFullScreen: () => void;
  disableFullScreen: () => void;
  handleChangeMapStyle: (style: string) => void;
  downloadable: boolean;
  downloading: boolean;
  fetchLocation: () => void;
  onDownload: () => void;
  handleGpxUpload?: () => void;
  progress?: number;
  navigateToMaps: () => void;
  startNavigation: () => void;
}

const MapButtonsOverlay = ({
  mapFullscreen,
  enableFullScreen,
  disableFullScreen,
  handleChangeMapStyle,
  downloadable,
  downloading,
  fetchLocation,
  onDownload,
  handleGpxUpload,
  progress,
  navigateToMaps,
  startNavigation,
}: MapButtonsOverlayProps) => {
  console.log('newwwww');
  const [showStyleOptions, setShowStyleOptions] = useState(false);
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const handleStyleOptionPress = () => {
    setShowStyleOptions(!showStyleOptions);
  };

  /**
   * A function to handle the selection of a style.
   *
   * @param {type} style - the selected style
   * @return {type} undefined
   */
  const handleStyleSelection = (style) => {
    handleChangeMapStyle(style);
    setShowStyleOptions(false);
  };

  return (
    <>
      {!mapFullscreen ? (
        // Preview map
        <>
          <TouchableOpacity
            style={[styles.headerBtnView, styles.enterFullScreenBtn]}
            onPress={enableFullScreen}
          >
            <Entypo name="resize-full-screen" size={21} color="grey" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.headerBtnView,
              {
                width: 40,
                height: 40,
                position: 'absolute',
                bottom: 10,
                left: 10,
              },
            ]}
            onPress={navigateToMaps}
          >
            <FontAwesome5 name="directions" size={21} color="grey" />
          </TouchableOpacity>
        </>
      ) : (
        // Fullscreen map
        <>
          <TouchableOpacity
            style={[styles.headerBtnView, styles.exitFullscreenBtn]}
            onPress={disableFullScreen}
          >
            <Entypo name="circle-with-cross" size={21} color="grey" />
          </TouchableOpacity>

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

          <TouchableOpacity
            style={[
              styles.headerBtnView,
              {
                width: 40,
                height: 40,
                position: 'absolute',
                bottom: 30,
                left: 10,
              },
            ]}
            onPress={startNavigation}
          >
            <MaterialCommunityIcons
              name="navigation-variant-outline"
              size={25}
              color={'black'}
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
              onPress={onDownload}
              disabled={downloading}
            >
              <Image
                style={styles.downloadIcon}
                source={require('app/assets/download.svg')}
              />
              <Text style={styles.downloadText}>
                {downloading
                  ? `Downloading... ${
                      progress ? Math.floor(progress) + '%' : ''
                    }`
                  : 'Download map'}
              </Text>
            </TouchableOpacity>
          )}

          {handleGpxUpload && (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                position: 'absolute',
                bottom: 80,
                right: 10,
                backgroundColor: currentTheme.colors.white,
                borderRadius: 30,
                zIndex: 1,
              }}
              onPress={handleGpxUpload}
            >
              <MaterialCommunityIcons name="map-plus" size={24} color="grey" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.headerBtnView,
              {
                width: 40,
                height: 40,
                position: 'absolute',
                bottom: 80,
                left: 10,
              },
            ]}
            onPress={navigateToMaps}
          >
            <FontAwesome5 name="directions" size={21} color="grey" />
          </TouchableOpacity>

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

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 400,
      width: '100%',
      borderRadius: 10,
    },
    map: {
      width: '100%',
      minHeight: '100vh', // Adjust the height to your needs
    },
    stylePicker: {
      // Style Picker Button
      position: 'absolute',
      top: 10,
      left: 10,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: currentTheme.colors.white,
    },
    styleModalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    styleModalContent: {
      backgroundColor: currentTheme.colors.white,
      borderRadius: 8,
      padding: 10,
    },
    styleOption: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    styleOptionText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    locationButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      position: 'absolute',
      bottom: 30,
      right: 10,
      backgroundColor: currentTheme.colors.white,
      borderRadius: 30,
      zIndex: 1,
    },
    headerBtnView: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      marginTop: 30,
      backgroundColor: currentTheme.colors.white,
    },
    enterFullScreenBtn: {
      width: 40,
      height: 40,
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    exitFullscreenBtn: {
      width: 40,
      height: 40,
      position: 'absolute',
      top: 10,
      right: 10,
    },
    fullScreen: {
      width: Platform.OS == 'web' ? '25%' : '70%',
      height: 40,
      padding: 10,
      backgroundColor: currentTheme.colors.white,
      position: 'absolute',
      bottom: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 20,
    },
    downloadIcon: {
      width: 21,
      height: 21,
    },
    downloadText: {
      fontSize: 13,
      fontWeight: '500',
      marginLeft: 8,
    },
    modal: {
      alignItems: 'center',
    },
  };
};

export default MapButtonsOverlay;
