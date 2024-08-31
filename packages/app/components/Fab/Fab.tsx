import React, { useState } from 'react';
import { Platform } from 'react-native';
import FABWeb from './FabWeb';
import FABNative from './FabNative';

const FAB = () => {
  const [showQuickActions, setShowQuickActions] = useState(false);

  const toggleQuickActions = () => {
    setShowQuickActions((prev) => !prev);
  };

  const closeQuickActions = () => {
    setShowQuickActions(false);
  };

  return Platform.OS === 'web' ? (
    <FABWeb
      showQuickActions={showQuickActions}
      toggleQuickActions={toggleQuickActions}
    />
  ) : (
    <FABNative
      showQuickActions={showQuickActions}
      toggleQuickActions={toggleQuickActions}
      closeQuickActions={closeQuickActions}
    />
  );
};

export default FAB;
