import React from 'react';
import { Platform, View } from 'react-native';
import { RStack, RScrollView } from '@packrat/ui';
import { HeroSection, Section, SectionHeader } from '../../components';
import useCustomStyles from 'app/hooks/useCustomStyles';
import Layout from 'app/components/layout/Layout';
import { SCREEN_WIDTH } from 'app/constants/breakpoint';
import { useScreenWidth } from 'app/hooks/common';
import FAB from 'app/components/Fab/Fab';
import { FeedPreview } from 'app/modules/feed';
import { Button, Stack } from 'tamagui';

export const DashboardScreen = () => {
  const styles = useCustomStyles(loadStyles);

  return (
    <Layout>
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
                alignSelf: 'end',
                gap: 8,
              }}
            >
              <FAB />
              <Button style={{ alignSelf: 'end' }}>Templates</Button>
            </Stack>
          ) : null}

          <View style={styles.gridContainer}>
            <View style={styles.gridItem}>
              <Section>
                <SectionHeader
                  iconName="newspaper-outline"
                  text="Feed"
                  textStyle={styles.sectionHeaderText}
                />
                <FeedPreview feedType="public" />
              </Section>
            </View>
          </View>
        </RStack>
      </RScrollView>
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
      paddingHorizontal: 20,
      width:
        Platform.OS === 'web'
          ? screenWidth <= SCREEN_WIDTH
            ? '100vw'
            : '90vw'
          : '100%',
    },
    heroBanner: {
      width: '100%',
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    gridItem: {
      flexBasis: '100%',
      backgroundColor: currentTheme.colors.background,
    },
    sectionHeaderText: {
      color: currentTheme.colors.text,
    },
  };
};
