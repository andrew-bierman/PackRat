import React from 'react';
import { Platform, View } from 'react-native';
import { RStack, RScrollView } from '@packrat/ui';
import HeroBanner from '../../components/dashboard/HeroBanner';
import QuickActionsSection from '../../components/dashboard/QuickActionSection';
import FeedPreview from '../../components/feedPreview';
import Section from '../../components/dashboard/Section';
import SectionHeader from '../../components/dashboard/SectionHeader';
import useCustomStyles from 'app/hooks/useCustomStyles';
import Layout from 'app/components/layout/Layout';
import { SCREEN_WIDTH } from 'app/constants/breakpoint';
import { useScreenWidth } from 'app/hooks/common';

const Dashboard = () => {
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
          <View>
            <HeroBanner style={styles.cardContainer} />

            <Section>
              <SectionHeader
                iconName="add-circle-outline"
                text="Quick Actions"
              />
              <QuickActionsSection />
            </Section>
            <Section>
              <SectionHeader iconName="newspaper-outline" text="Feed" />
              <FeedPreview feedType="public" />
            </Section>
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
    cardContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: 20,
      width: '100%',
    },
  };
};

export default Dashboard;
