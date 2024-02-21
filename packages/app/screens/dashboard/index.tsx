import React from 'react';
import { GestureResponderEvent, Platform, View } from 'react-native';
import { RStack, RScrollView } from '@packrat/ui';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import HeroBanner from '../../components/dashboard/HeroBanner';
import QuickActionsSection from '../../components/dashboard/QuickActionSection';
import FeedPreview from '../../components/dashboard/FeedPreview';
import Section from '../../components/dashboard/Section';
import SectionHeader from '../../components/dashboard/SectionHeader';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { loadStyles } from './dashboard.style';

const Dashboard = () => {
  const styles = useCustomStyles(loadStyles);

  return (
    <>
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
              <FeedPreview />
            </Section>
          </View>
        </RStack>
      </RScrollView>
    </>
  );
};

export default Dashboard;
