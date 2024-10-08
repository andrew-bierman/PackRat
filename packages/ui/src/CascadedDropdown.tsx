import { RSelect } from '@packrat/ui';
import React from 'react';
import { View, Platform } from 'react-native';
import RIconButton from './RIconButton';
import { MaterialIcons } from '@expo/vector-icons';

interface DropdownComponentProps {
  width?: string | number;
  style?: any;
  placeholder?: any;
  native?: boolean;
  // zeego?: boolean;
  [x: string]: any; // for the rest of the props
}

export const CascadedDropdownComponent: React.FC<DropdownComponentProps> = ({
  width,
  style = {},
  placeholder,
  // zeego = false,
  ...props
}) => {
  const isWeb = Platform.OS === 'web';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <RSelect
        placeholder={placeholder || 'Select'}
        native={!isWeb}
        // zeego={zeego}
        {...props}
      />
    </View>
  );
};

export const ActionsDropdownComponent: React.FC<DropdownComponentProps> = ({
  width,
  style = {},
  placeholder,
  ...props
}) => {
  const isWeb = Platform.OS === 'web';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <RSelect
        native={!isWeb}
        placeholder={
          <RIconButton
            backgroundColor="transparent"
            icon={<MaterialIcons name="more-horiz" size={20} />}
            style={{
              height: 20,
              pointerEvents: 'none',
            }}
          />
        }
        {...props}
      />
    </View>
  );
};

export default CascadedDropdownComponent;
