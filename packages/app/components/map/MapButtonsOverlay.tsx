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
import loadStyles from './MapStyles';

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
}) => {
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
            onPress={() => {
              Platform.OS == 'web'
                ? alert('Sorry, currently not implemented')
                : Alert.alert('Sorry, currently not implemented');
            }}
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

export default MapButtonsOverlay;
