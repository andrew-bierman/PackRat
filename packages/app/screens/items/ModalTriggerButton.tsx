import { View, Platform } from 'react-native';
import React from 'react';
import { Button, Tooltip } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import useTheme from 'app/hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './itemsComponent.style';
interface ModalTriggerButtonProps {
  setIsModalOpen: (value: boolean) => void;
}

const ModalTriggerButton = ({ setIsModalOpen }: ModalTriggerButtonProps) => {
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        style={styles.button}
        onPress={() => {
          setIsModalOpen(true);
        }}
      >
        Add Item
      </Button>
      {Platform.OS === 'web' && (
        <Tooltip label="Add a global item" placement="top left" openDelay={500}>
          <Button width={8} height={8} style={{ backgroundColor: 'none' }}>
            <MaterialIcons
              name="info-outline"
              size={20}
              color={currentTheme.colors.background}
            />
          </Button>
        </Tooltip>
      )}
    </View>
  );
};
