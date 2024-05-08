import React from 'react';
import { Platform, Text } from 'react-native';
import { useRouter } from 'app/hooks/router';
import useTheme from 'app/hooks/useTheme';
import { CustomCardHeader } from '../CustomCardHeader';
import { RIconButton, RStack } from '@packrat/ui';
import { AntDesign } from '@expo/vector-icons';

export const TripCardHeader = ({ data, title, link }) => {
  const { isDark, currentTheme } = useTheme();
  const router = useRouter();

  return (
    <CustomCardHeader
      data={data}
      title={
        <RStack
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          {Platform.OS === 'web' && (
            <RIconButton
              backgroundColor="transparent"
              icon={
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color={isDark ? 'white' : 'black'}
                />
              }
              onPress={() => {
                if (Platform.OS === 'web') {
                  window?.history?.back();
                } else {
                  router.back();
                }
              }}
            />
          )}
          <Text style={{ color: isDark ? 'white' : 'black' }}>{title}</Text>
        </RStack>
      }
      link={link}
      actionsComponent={undefined}
    />
  );
};
