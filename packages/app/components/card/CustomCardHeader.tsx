import React, { useState } from 'react';
import { RButton, RStack, RText as OriginalRText } from '@packrat/ui';
import { View } from 'react-native';
import { RLink } from '@packrat/ui';
import { useCopyClipboard } from 'app/hooks/common';
import { useAuthUser } from 'app/modules/auth';
import useTheme from '../../hooks/useTheme';
import { CopyPackModal } from 'app/modules/pack';
import { Button } from 'tamagui';
import { useCreatePackFromTemplate } from 'app/modules/pack-templates';
import { useRouter } from '@packrat/crosspath';

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

  const {
    createPackFromTemplate,
    isLoading,
    isSuccess,
    data: createdPack,
  } = useCreatePackFromTemplate();
  const router = useRouter();

  console.log('isLoading', isLoading);
  console.log('isSuccess', isSuccess);
  console.log('createdPack', createdPack);

  if (isSuccess) {
    // TODO (current) redirect to pack/{id}
    router.push(`/pack/${createdPack.id}`);
  }

  return (
    <>
      <RStack style={{ flex: 1 }}>
        {typeof title === 'string' ? <RText>{title}</RText> : title}
      </RStack>
      {data.is_template ? (
        <Button onPress={() => createPackFromTemplate(data.id)}>
          {/* TODO (current) debug isloading */}
          {isLoading ? 'Loading...' : 'Use template'}
        </Button>
      ) : (
        <>
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
          {actionsComponent}
        </>
      )}
      <CopyPackModal
        currentPack={data}
        isOpen={isCopyPackModalOpen}
        onClose={() => {
          setIsCopyPackModalOpen(false);
        }}
      />
    </>
  );
};
