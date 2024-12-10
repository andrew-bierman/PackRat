import React from 'react';
import { RStack, RSeparator } from '@packrat/ui';
import { View, Dimensions, Platform } from 'react-native';
import { SearchItem } from 'app/modules/item';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { TripCardHeader } from './TripCardHeader';
import { PackCardHeader } from './PackCardHeader';
import { ItemCardHeader } from './ItemCardHeader';
import { useAuthUser } from 'app/modules/auth';
import { PackTemplateHeader } from 'app/modules/pack-templates';
import { ConnectionGate } from 'app/components/ConnectionGate';

interface CustomCardProps {
  title: string;
  content: React.ReactNode;
  footer: React.ReactNode;
  link?: string;
  type: 'pack' | 'trip' | 'item' | 'packTemplate';
  destination?: string;
  data: {
    owner_id?: string;
    owners?: Array<{ name: string }> | null;
  };
}

const HEADER_COMPONENTS = {
  trip: TripCardHeader,
  pack: PackCardHeader,
  item: ItemCardHeader,
  packTemplate: PackTemplateHeader,
};

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
  const Header = HEADER_COMPONENTS[type] || PackCardHeader;

  return (
    <View
      style={[
        styles.mainContainer,
        {
          minHeight: !isWeb ? Dimensions.get('screen').height : 'auto',
        },
        isWeb && {
          borderRadius: 10,
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
          <Header data={data} title={title} link={link} />
        </View>
        <RSeparator />
        <ConnectionGate mode="connected">
          {type === 'pack' && authUser?.id === data.owner_id ? (
            <>
              <View
                style={
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: 16,
                    paddingLeft: 16,
                    position: 'relative',
                    zIndex: 1,
                  } as any
                }
              >
                <SearchItem />
              </View>
              <RSeparator />
            </>
          ) : null}
        </ConnectionGate>
        <View
          style={{
            paddingRight: 16,
            paddingLeft: 16,
            flex: 1,
            paddingBottom: 100,
          }}
        >
          {content}
        </View>
        <RSeparator />
        {footer ? (
          <View style={{ padding: 16, paddingTop: 0 }}>{footer}</View>
        ) : null}
      </RStack>
    </View>
  );
};

const loadStyles = (theme) => {
  const { isDark, currentTheme } = theme;
  return {
    mainContainer: {
      borderColor: currentTheme.colors.border,
      borderWidth: 1,
      flex: 1,
      gap: 45,
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      marginBottom: 20,
      border: '1',
      boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
      alignSelf: 'center',
    },
  };
};
