import React from 'react';
import {Text} from "react-native";
import { useRouter } from 'app/hooks/router';
import useTheme from 'app/hooks/useTheme';
import { CustomCardHeader } from '../CustomCardHeader';
import { RIconButton, RStack } from '@packrat/ui';
import { AntDesign } from '@expo/vector-icons';

export const TripCardHeader = ({ data, title, link }) => {

  const { currentTheme } = useTheme();
  const router = useRouter();

  return (
    <CustomCardHeader
      data={data}
      title={<RStack
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <RIconButton
          backgroundColor="transparent"
          icon={
            <AntDesign
              name="arrowleft"
              size={24}
              color={currentTheme.colors.black}
            />
          }
          onPress={()=>{
            router.back();
            }}
        />
        <Text>
          {title}
        </Text>
      </RStack>}
      link={link}
      actionsComponent={undefined}
    />
  );
};
