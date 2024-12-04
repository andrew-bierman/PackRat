import { AntDesign } from '@expo/vector-icons';
import {
  BaseModal,
  RButton,
  RIconButton,
  RInput,
  RStack,
  RText,
} from '@packrat/ui';
import { CustomCardHeader } from 'app/components/card/CustomCardHeader';
import useTheme from 'app/hooks/useTheme';
import { useRouter } from '@packrat/crosspath';
import { Platform } from 'react-native';
import { useCreatePackFromTemplate } from 'app/modules/pack-templates';
import { useState } from 'react';

export function PackTemplateHeader({ data, title }) {
  const { isDark } = useTheme();
  const router = useRouter();

  const {
    createPackFromTemplate,
    isLoading,
    isSuccess,
    data: createdPack,
  } = useCreatePackFromTemplate();

  const [packName, setPackName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isSuccess) {
    router.push(`/pack/${createdPack.id}`);
  }

  return (
    <>
      <CustomCardHeader
        link={''}
        data={data}
        ownerId={data?.owner_id}
        title={
          <RStack
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            {Platform.OS === 'web' && (
              <RIconButton
                backgroundColor="transparent"
                icon={
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color={isDark ? 'white' : 'black'}
                  />
                }
                onPress={() => {
                  if (Platform.OS === 'web') {
                    window?.history?.back();
                  } else {
                    router.back();
                  }
                }}
              />
            )}

            <RText
              style={{ fontSize: 20, fontWeight: 'bold', color: '#0284c7' }}
            >
              {title}
            </RText>
          </RStack>
        }
        actionsComponent={
          <RButton disabled={isLoading} onPress={() => setIsModalOpen(true)}>
            Use Template
          </RButton>
        }
      />
      <BaseModal
        showTrigger={false}
        title="Name your pack copy"
        footerButtons={[
          {
            label: 'Cancel',
            color: '#B22222',
            onClick: (_, closeModal) => {
              closeModal();
            },
          },
        ]}
        footerComponent={undefined}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <RInput
          placeholder="Pack Name"
          value={packName}
          onChangeText={(t) => setPackName(t)}
        />
        <RButton
          disabled={isLoading}
          onPress={() => createPackFromTemplate(data.id, packName)}
        >
          {isLoading ? 'Copying...' : 'Create +'}
        </RButton>
      </BaseModal>
    </>
  );
}
