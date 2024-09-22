import React, { useState, type FC } from 'react';
import {
  Modal,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { type MapStyle } from '../../model';
import { RText } from '@packrat/ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MapActionBtn } from '../MapActionBtn';

interface MapStylePickerProps {
  mapStyles: MapStyle[];
  onStyleChange: (style: string) => void;
  btnStyle?: TouchableOpacityProps['style'];
}

export const MapStylePicker: FC<MapStylePickerProps> = ({
  mapStyles,
  btnStyle,
  onStyleChange,
}) => {
  const [showStyleOptions, setShowStyleOptions] = useState(false);
  const styles = useCustomStyles(loadStyles);

  const handleStyleSelection = (style: string) => {
    onStyleChange(style);
    setShowStyleOptions(false);
  };
  const handleStyleOptionPress = () => {
    setShowStyleOptions(!showStyleOptions);
  };

  return (
    <>
      <MapActionBtn
        style={[styles.stylePicker, btnStyle]}
        onPress={handleStyleOptionPress}
      >
        <MaterialCommunityIcons
          name="layers-triple-outline"
          size={21}
          color="grey"
        />
      </MapActionBtn>
      <Modal animationType="fade" transparent={true} visible={showStyleOptions}>
        <TouchableOpacity
          style={styles.styleModalContainer}
          onPress={handleStyleOptionPress}
        >
          <View style={styles.styleModalContent}>
            {mapStyles.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.styleOption}
                onPress={() => handleStyleSelection(item.style)}
              >
                <RText style={styles.styleOptionText}>{item.label}</RText>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const loadStyles = () => ({
  stylePicker: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  styleModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  styleModalContent: {
    backgroundColor: 'white',
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
    color: '#000',
  },
  modal: {
    alignItems: 'center',
  },
});
