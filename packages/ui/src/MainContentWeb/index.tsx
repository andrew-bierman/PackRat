import React, { useContext } from 'react';
import ThemeContext from 'app/context/theme';

import { View, type ViewProps } from 'tamagui';

interface ExtendedViewProps extends ViewProps {
  isDark?: boolean;
}

export const MainContentWeb: React.FC<ExtendedViewProps> = (props) => {
  const backgroundColor = props.isDark ? '#000000' : '#F5F5F5';

  return <View style={{ backgroundColor, paddingTop: 80 }} {...props} />;
};
