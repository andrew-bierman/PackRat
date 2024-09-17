import { AntDesign } from '@expo/vector-icons';
import { RButton, RIconButton, RStack, RText } from '@packrat/ui';
import { CustomCardHeader } from 'app/components/card/CustomCardHeader';
import useTheme from 'app/hooks/useTheme';
import { useRouter } from '@packrat/crosspath';
import { Platform } from 'react-native';
import { useCreatePackFromTemplate } from 'app/modules/pack-templates';

export function PackTemplateHeader({ data, title }) {
  const { isDark } = useTheme();
  const router = useRouter();

  const {
    createPackFromTemplate,
    isLoading,
    isSuccess,
    data: createdPack,
  } = useCreatePackFromTemplate();

  if (isSuccess) {
    router.push(`/pack/${createdPack.id}`);
  }

  return (
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

          <RText style={{ fontSize: 20, fontWeight: 'bold', color: '#0284c7' }}>
            {title}
          </RText>
        </RStack>
      }
      actionsComponent={
        <RButton
          disabled={isLoading}
          onPress={() => createPackFromTemplate(data.id)}
        >
          {isLoading ? 'Copying...' : 'Use Template'}
        </RButton>
      }
    />
  );
}
