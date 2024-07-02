import React, { Suspense, type ReactNode } from 'react';
import { Text, View } from 'tamagui';

export const AppearanceLayout = ({
  navigationList,
  currentRoute,
}: {
  navigationList: ReactNode;
  currentRoute: ReactNode;
}) => {
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <View style={{ width: 384 }}>{navigationList}</View>
        <View style={{ flex: 1, background: '#fff', minHeight: '90vh' }}>
          <Suspense fallback={<Text>Loading...</Text>}>{currentRoute}</Suspense>
        </View>
      </View>
    </>
  );
};
