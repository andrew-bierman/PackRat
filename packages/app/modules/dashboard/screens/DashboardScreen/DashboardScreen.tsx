import React from 'react';
import { Platform, View } from 'react-native';
import { RStack, RScrollView } from '@packrat/ui';
import { HeroSection, Section, SectionHeader } from '../../components';
import useCustomStyles from 'app/hooks/useCustomStyles';
import Layout from 'app/components/layout/Layout';
import { useScreenWidth } from 'app/hooks/common';
import FAB from 'app/components/Fab/Fab';
import { FeedPreview } from 'app/modules/feed';
import { Button, Stack } from 'tamagui';
import { useRouter } from '@packrat/crosspath';

export const DashboardScreen = () => {
  const styles = useCustomStyles(loadStyles);
  const router = useRouter();

  return (
    <Layout>
      <View style={{ width: '100%' }}>
        <RScrollView contentContainerStyle={styles.content} horizontal={false}>
          <RStack
            style={[
              styles.container,
              Platform.OS === 'web' ? { minHeight: '100vh' } : null,
            ]}
          >
            <HeroSection style={styles.heroBanner} />
            {Platform.OS === 'web' ? (
              <Stack
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  marginTop: 16,
                  gap: 8,
                }}
              >
                <FAB />
                <Button
                  style={{ alignSelf: 'flex-end' }}
                  onPress={() => router.push('/pack-templates')}
                >
                  Templates
                </Button>
              </Stack>
            ) : null}

            <View style={styles.gridContainer}>
              <View style={styles.gridItem}>
                <Section>
                  <SectionHeader iconName="newspaper-outline" text="Feed" />
                  <FeedPreview feedType="public" />
                </Section>
              </View>
            </View>
          </RStack>
        </RScrollView>
      </View>
    </Layout>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  const { screenWidth } = useScreenWidth();

  return {
    container: {
      backgroundColor: currentTheme.colors.background,
      width: '100%',
      paddingBottom: 50,
    },
    content: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
    heroBanner: {
      width: '100%',
    },
    gridContainer: {
      flexDirection: 'row',
      marginTop: 32,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    gridItem: {
      flexBasis: '100%',
      backgroundColor: currentTheme.colors.background,
    },
  };
};
