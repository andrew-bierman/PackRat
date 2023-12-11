import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Desktop, Mobile, Tablet } from '../../media';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';
import {
  BodyText,
  ButtonRow,
  DemoButton,
  DemoGroup,
  DemoGroupItem,
  HeaderText,
  RCheckbox,
  RStack,
  SizableTextComp,
  ThemedButton,
} from '@packrat/ui';
import { Activity, Airplay } from '@tamagui/lucide-icons';

const SandCastlePackrat = ({ desktopContainer, isMobile }) => {
  const { isDark } = useTheme();

  const styles = useCustomStyles(loadStyles);

  return (
    <View style={desktopContainer}>
      <HeaderText
        text="Header Text"
        color="white"
        size={32}
        fontWeight="bold"
        textAlign="center"
        textDecoration="underline"
        fontFamily="Helvetica"
        fontStyle="italic"
        lineHeight={1.5}
        letterSpacing={1}
      />
      <RCheckbox id={'hey'} value={'Check me'} />
      <RStack />
      <BodyText  style={{ color: 'blue', fontSize: 20 }}>HelloWorld</BodyText>
      <SizableTextComp />
      <ThemedButton>
        <DemoButton>Plain</DemoButton>
        <DemoButton alignSelf="center" icon={Airplay} size="$6">
          Large
        </DemoButton>

        <ButtonRow>
          <DemoButton size="$3" theme="active">
            Active
          </DemoButton>
          <DemoButton size="$3" variant="outlined">
            Outlined
          </DemoButton>
        </ButtonRow>

        <ButtonRow>
          <DemoButton themeInverse size="$3">
            Inverse
          </DemoButton>
          <DemoButton iconAfter={Activity} size="$3">
            iconAfter
          </DemoButton>
        </ButtonRow>

        <DemoGroup>
          <DemoGroupItem>
            <DemoButton width="50%" size="$2" disabled opacity={0.5}>
              disabled
            </DemoButton>
          </DemoGroupItem>
          <DemoGroupItem>
            <DemoButton width="50%" size="$2" chromeless>
              chromeless
            </DemoButton>
          </DemoGroupItem>
        </DemoGroup>
      </ThemedButton>
    </View>
  );
};

export default function SandCastleScreen() {
  const { isDark } = useTheme();
  const styles = useCustomStyles(loadStyles);
  return Platform.OS === 'web' ? (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.menuBar}
    >
      <SandCastlePackrat
        desktopContainer={styles.containerDark}
        isMobile={false}
      />
    </ScrollView>
  ) : (
    <View style={[isDark ? styles.containerDark : styles.container]}>
      <SandCastlePackrat
        desktopContainer={styles.logoContainer}
        isMobile={true}
      />
    </View>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      padding: 20,
      alignItems: 'center',
    },
    containerDark: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      padding: 20,
      alignItems: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      justifyContent: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginRight: 10,
    },
    headerDark: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginRight: 10,
    },

    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 20,
      marginTop: 20,
      marginLeft: 0,
      marginRight: 0,
    },
  };
};
