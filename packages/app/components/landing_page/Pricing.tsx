import { RButton, RText } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import useResponsive from 'app/hooks/useResponsive';
import { View } from 'tamagui';
import { StyleSheet } from 'react-native';
import { PricingData } from 'app/constants/PricingData';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Pricing = () => {
  const { currentTheme } = useTheme();
  const { xs, sm, md } = useResponsive();
  const styles = StyleSheet.create(loadStyles(currentTheme, xs, sm, md));

  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.firstContainer}>
          <RText style={{ fontSize: 28, textAlign: xs || sm || md ? 'center' : 'auto' }}>
            Explore PackRat with Our Free Subscription Plan!
          </RText>
          <RText style={{ fontSize: 25, textAlign: xs || sm || md ? 'center' : 'auto' }}>
            Get Started with PackRat—Absolutely Free!
          </RText>
          <RText style={{ fontSize: 16, width: xs || sm || md ? '100%' : '50%', textAlign: 'center' }}>
            We’re thrilled to offer you our Free Subscription Plan so you can
            explore and manage your trips with PackRat at no cost! This plan is
            designed to give you full access to a range of features, making your
            trip planning easy and enjoyable.
          </RText>
        </View>
        <View style={styles.card}>
          <RText style={{ width: '100%', fontSize: 18, textAlign: 'left', color: currentTheme.colors.background }}>
            Free Access
          </RText>
          <RText style={{ width: '100%', fontSize: 25, textAlign: 'left', color: currentTheme.colors.background }}>
            $0
          </RText>
          <View style={{ width: '100%' }}>
            <RButton
              style={{
                backgroundColor: '#232323',
                color: 'white',
              }}
            >
              Get Started For Free
            </RButton>
          </View>
          <View style={{ marginTop: 10 }}>
            {PricingData.freeVersion.map((index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    borderBottomColor: currentTheme.colors.background,
                    borderBottomWidth: 1,
                    marginTop: 4,
                    marginBottom: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    name="tooltip-check"
                    size={20}
                    color={currentTheme.colors.background}
                  />
                  <RText
                    style={{
                      color: currentTheme.colors.background,
                      fontSize: 16,
                    }}
                  >
                    {index}
                  </RText>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const loadStyles = (currentTheme, xs, sm, md) => {
  return StyleSheet.create({
    mainContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 50,
      color: currentTheme.colors.background,
      marginLeft: xs || sm || md ? 10 : 0,
      marginRight: xs || sm || md ? 10 : 0,
    },
    firstContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      
    },
    card: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      backgroundColor: currentTheme.colors.textPrimary,
      color: currentTheme.colors.background,
      paddingTop: 50,
      paddingBottom: 50,
      paddingLeft: 25,
      paddingRight: 25,
      borderRadius: 20,
    },
  });
};
