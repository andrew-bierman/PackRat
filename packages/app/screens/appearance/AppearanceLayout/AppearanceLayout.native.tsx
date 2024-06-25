import React, { Suspense, type ReactNode } from 'react';
import { Text, View } from 'tamagui';
import { AppearanceMobileMenu } from '../components/AppearanceMobileMenu';

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
          flexDirection: 'column',
          gap: 12,
          height: '100%',
        }}
      >
        <AppearanceMobileMenu navigationList={navigationList} />
        <View style={{ flex: 1, background: '#fff' }}>
          <Suspense fallback={<Text>Loading...</Text>}>{currentRoute}</Suspense>
        </View>
      </View>
    </>
  );
};
