import { RSelect } from '@packrat/ui';
import React from 'react';
import { View, Platform } from 'react-native';

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

export default CascadedDropdownComponent;
