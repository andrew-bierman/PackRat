import React from 'react';

import { CLIENT_URL } from '@packrat/config';
import { RSeparator, RSpinner, RStack, RText } from '@packrat/ui';
import Layout from 'app/components/layout/Layout';
import { Platform, View } from 'react-native';
import { DetailsComponent } from '../../../components/details';
import { usePackTemplateId } from '../hooks';
import { useGetPackTemplate } from '../hooks/useGetPackTemplate';
import { PackTemplateTable } from '../components';

export const PackTemplateDetailsScreen = () => {
  const [packTemplateId] = usePackTemplateId();
  const link = `${CLIENT_URL}/packs/${packTemplateId}`;

  const {
    data: packTemplate,
    isLoading,
    error,
  } = useGetPackTemplate(packTemplateId);

  const isError = error !== null;

  if (isLoading)
    return (
      <Layout>
        <RSpinner />
      </Layout>
    );

  return (
    <Layout customStyle={{ alignItems: 'stretch' }}>
      {!isError && (
        <View
          style={{
            minHeight: '100%',
            paddingBottom: 80,
          }}
        >
          <DetailsComponent
            type="packTemplate"
            data={packTemplate}
            isLoading={isLoading}
            error={error as any}
            additionalComps={
              <RStack style={{ gap: Platform.OS === 'web' ? 30 : 10 }}>
                <RText
                  style={{
                    alignSelf: 'center',
                  }}
                >
                  {packTemplate.description}
                </RText>
                <RSeparator style={{ marginRight: -16, marginLeft: -16 }} />
                <PackTemplateTable items={packTemplate.items} />
              </RStack>
            }
            link={link}
          />
        </View>
      )}
    </Layout>
  );
};
