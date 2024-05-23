import React from 'react';
import { RStack, RSeparator } from '@packrat/ui';
import { View, Dimensions, Platform } from 'react-native';
import { SearchItem } from '../item/SearchItem';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { TripCardHeader } from './TripCardHeader';
import { PackCardHeader } from './PackCardHeader';
import { useAuthUser } from 'app/auth/hooks/useUser';

interface CustomCardProps {
  title: string;
  content: React.ReactNode;
  footer: React.ReactNode;
  link?: string;
  type: 'pack' | 'trip';
  destination?: string;
  data: {
    owner_id: {
      id: string;
      username?: string;
    };
    owners?: Array<{ name: string }> | null;
  };
}

export const CustomCard = ({
  title,
  content,
  footer,
  link,
  destination,
  type,
  data,
}: CustomCardProps) => {
  const styles = useCustomStyles(loadStyles);
  const authUser = useAuthUser();

  if (!data) return null;

  const isWeb = Platform.OS === 'web';

  return (
    <View
      style={[
        styles.mainContainer,
        {
          minHeight: !isWeb ? Dimensions.get('screen').height : 'auto',
        },
        isWeb && {
          borderRadius: 10,
          padding: isWeb ? '15 25' : 0,
        },
      ]}
    >
      <RStack
        style={{ width: '100%', gap: Platform.OS === 'web' ? 30 : 10, flex: 1 }}
      >
        <View
          style={{
            padding: 15,
            paddingBottom: isWeb ? 0 : 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {type === 'trip' ? (
            <TripCardHeader data={data} title={title} link={link} />
          ) : (
            <PackCardHeader data={data} title={title} link={link} />
          )}
        </View>
        <RSeparator />
        {type === 'pack' && authUser.id === data.owner_id ? (
          <>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: 16,
                paddingLeft: 16,
                position:'relative',
                zIndex:'1',
              }}
            >
              <SearchItem />
            </View>
            <RSeparator />
          </>
        ) : null}
        <View
          style={{
            paddingRight: 16,
            paddingLeft: 16,
          }}
        >
          {content}
        </View>
        <RSeparator />
        <View style={{ padding: 16, paddingTop: 0 }}>{footer}</View>
      </RStack>
    </View>
  );
};

const loadStyles = (theme) => {
  const { isDark, currentTheme } = theme;
  return {
    mainContainer: {
      backgroundColor: !isDark ? currentTheme.colors.card : '#1A1A1D',
      flex: 1,
      gap: 45,
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      marginBottom: 20,
      border: '1',
      alignSelf: 'center',
    },
  };
};
