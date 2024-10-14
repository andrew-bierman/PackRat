import React from 'react';
import { AddPackForm } from '../components';
import { RText } from '@packrat/ui';
import { useRouter } from '@packrat/crosspath';
import { Button, Card, XStack } from 'tamagui';
import { Backpack } from '@tamagui/lucide-icons';
import Layout from 'app/components/layout/Layout';
import useResponsive from 'app/hooks/useResponsive';
import useTheme from 'app/hooks/useTheme';
import { Platform } from 'react-native';

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
        alignSelf="center"
        style={{
          marginRight: 2,
          marginLeft: 2,
        }}
      >
        <XStack
          jc="space-between"
          ai="center"
          py="$2"
          px="$0.5"
          mx="$2"
          gap={gtSm ? '$12' : '$3'}
          fw="wrap"
        >
          <XStack ai="center" jc="flex-start" gap="$2">
            <Backpack size={gtSm ? 'auto' : '$1.5'} />
            <RText size={gtSm ? 'auto' : '$4'}>
              Need help getting started?
            </RText>
          </XStack>
          <Button
            onPress={() => router.push('/pack-templates')}
            size={gtSm ? '$3.5' : '$3'}
            ml="auto"
          >
            Browse Templates
          </Button>
        </XStack>
      </Card>
      <AddPackForm isCreatingTrip={isCreatingTrip} onSuccess={onSuccess} />
    </Layout>
  );
};
