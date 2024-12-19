import React from 'react';
import { AddPackForm } from '../components';
import { RText } from '@packrat/ui';
import { useRouter } from '@packrat/crosspath';
import { Button, Card, XStack, YStack } from 'tamagui';
import { Backpack, Search } from '@tamagui/lucide-icons';
import Layout from 'app/components/layout/Layout';
import useResponsive from 'app/hooks/useResponsive';
import useTheme from 'app/hooks/useTheme';
import { Platform, View } from 'react-native';
import { ADD_PACK_FORM_DESCRIPTION, ADD_PACK_FORM_TITLE } from '../constants';

export const AddPackScreen = ({
  isCreatingTrip = false,
  onSuccess = () => {},
}: {
  isCreatingTrip?: boolean;
  onSuccess?: any;
}) => {
  const theme = useTheme();
  const router = useRouter();
  const { gtSm } = useResponsive();

  return (
    <Layout
      customStyle={[
        {
          paddingTop: 20,
          justifyContent: 'flex-start',
          backgroundColor: theme.currentTheme.colors.background,
        },
        Platform.OS == 'android' || Platform.OS == 'ios'
          ? { marginTop: 0 }
          : {},
      ]}
    >
      <Card
        bordered
        style={{
          width: '100%',
          maxWidth: 440,
          margin: 'auto',
        }}
      >
        <View style={{ padding: 24 }}>
          <YStack gap={8} style={{ paddingBottom: 24 }}>
            <RText style={{ fontWeight: 600, fontSize: 24, lineHeight: 32 }}>
              {ADD_PACK_FORM_TITLE}
            </RText>
            <RText style={{ textAlign: 'left', lineHeight: 20 }}>
              {ADD_PACK_FORM_DESCRIPTION}
            </RText>
            {/* DISABLED PACK TEMPLATES FOR NOW */}
            {/* <XStack
              gap={4}
              jc="space-between"
              style={{
                width: '100%',
                alignItems: 'center',
                borderColor: 'ActiveBorder',
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
              }}
            >
              <RText style={{ fontSize: 14 }}>Looking For Ideas?</RText>
              <Button
                onPress={() => router.push('/pack-templates')}
                icon={<Search size={14} />}
                style={{
                  backgroundColor: 'transparent',
                  height: 'auto',
                  padding: 0,
                  fontSize: 14,
                  fontWeight: 600,
                }}
                hoverStyle={{
                  borderBlockColor: 'transparent',
                }}
                space={4}
                ml="auto"
              >
                Explore Pack Templates
              </Button>
            </XStack> */}
          </YStack>
          <AddPackForm isCreatingTrip={isCreatingTrip} onSuccess={onSuccess} />
        </View>
      </Card>
    </Layout>
  );
};
