import React, { useState } from 'react';
import { View, useMedia, styled } from 'tamagui';
import { RIconButton } from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SidebarNavigationList } from './SidebarNavigationList';
import { ProfileNavigationList } from './ProfileNavigationList';

export function FullSideBar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { sm } = useMedia();

  return (
    <View flexDirection="row" height="100%" width="100%">
      {!sm && <Sidebar />}
      {sm && <FloatingSideBar open={openDrawer} setOpen={setOpenDrawer} />}
      <ProfileDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </View>
  );
}

FullSideBar.fileName = 'FullSideBar';

function Sidebar() {
  const { currentTheme } = useTheme();

  return (
    <View
      flexDirection="column"
      height="300vh"
      width={300}
      backgroundColor={currentTheme.colors.background}
      position="fixed"
      left={0}
      top={75}
    >
      <SidebarNavigationList
        itemStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
        }}
        onItemSelect={() => {}}
      />
    </View>
  );
}

function ProfileDrawer({
  open,
  setOpen,
  onItemSelect,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onItemSelect: (item: any) => void;
}) {
  const { currentTheme } = useTheme();

  return (
    <View position="absolute" top={0} right={0}>
      <RIconButton
        backgroundColor="transparent"
        icon={<Ionicons name="person-circle" size={30} color="white" />}
        onPress={() => setOpen(!open)}
      />
      {open && (
        <View
          style={{
            position: 'absolute',
            top: 50,
            right: 0,
            width: 180,
            padding: 10,
            backgroundColor: currentTheme.colors.background,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 10,
            zIndex: 1000,
          }}
        >
          <ProfileNavigationList
            itemStyle={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}
            onItemSelect={onItemSelect}
          />
        </View>
      )}
    </View>
  );
}

export default FullSideBar;
