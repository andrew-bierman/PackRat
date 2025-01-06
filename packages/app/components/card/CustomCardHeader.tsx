import React, { useState } from 'react';
import { RButton, RStack, RText as OriginalRText } from '@packrat/ui';
import { View } from 'react-native';
import { RLink } from '@packrat/ui';
import { useCopyClipboard } from 'app/hooks/common';
import { useAuthUser } from 'app/modules/auth';
import useTheme from '../../hooks/useTheme';
import { CopyPackModal } from 'app/modules/pack';
import { ConnectionGate } from 'app/components/ConnectionGate';

interface CustomCardHeaderProps {
  ownerId: string;
  data: {
    owners?: Array<{ name: string }>;
    type: string;
  };
  title: string | JSX.Element;
  link?: string;
  actionsComponent?: boolean | JSX.Element | undefined;
}

const COPY_TYPES = ['pack'];

const RText: any = OriginalRText;
export const CustomCardHeader = ({
  data,
  ownerId,
  title,
  link,
  actionsComponent,
}: CustomCardHeaderProps) => {
  const { isCopied, handleCopyLink } = useCopyClipboard({ link });
  const user = useAuthUser();
  const { isDark } = useTheme();
  const [isCopyPackModalOpen, setIsCopyPackModalOpen] = useState(false);

  return (
    <>
      <RStack style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        {typeof title === 'string' ? <RText>{title}</RText> : title}
      </RStack>
      <RStack style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        {data.type != 'packTemplate' && (
          <ConnectionGate mode="connected">
            <View>
              <RLink
                href={`/profile/${ownerId}`}
                style={{ textDecoration: 'none' }}
              >
                <RText>
                  {user?.id === ownerId
                    ? 'Your Profile'
                    : `View ${
                        data.owners && data.owners?.length
                          ? data.owners[0]?.name
                          : 'Profile'
                      }`}
                </RText>
              </RLink>
            </View>
            {user?.id !== ownerId && COPY_TYPES.includes(data.type) && (
              <RButton
                onPress={() => {
                  setIsCopyPackModalOpen(true);
                }}
                style={{ backgroundColor: 'transparent' }}
              >
                <RText style={{ color: 'black' }}>Copy Pack</RText>
              </RButton>
            )}
          </ConnectionGate>
        )}
        {actionsComponent}
        <CopyPackModal
          currentPack={data}
          isOpen={isCopyPackModalOpen}
          onClose={() => {
            setIsCopyPackModalOpen(false);
          }}
        />
      </RStack>
    </>
  );
};
