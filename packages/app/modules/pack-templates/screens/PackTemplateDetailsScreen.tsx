import React, { useState } from 'react';

import { CLIENT_URL } from '@packrat/config';
import { RH3, RSpinner, RText } from '@packrat/ui';
import { useAuthUser } from 'app/modules/auth';
import Layout from 'app/components/layout/Layout';
import {
  useIsAuthUserPack,
  usePackId,
  useFetchSinglePack,
  TableContainer,
} from 'app/modules/pack';
import useResponsive from 'app/hooks/useResponsive';
import { FlatList, View } from 'react-native';
import ScoreContainer from '../../../components/ScoreContainer';
import { TextLink } from '@packrat/crosspath';
import { DetailsComponent } from '../../../components/details';
import { ImportItemModal, AddItemModal } from 'app/modules/item';
import { FeedPreview } from 'app/modules/feed';
import LargeCard from 'app/components/card/LargeCard';
import useTheme from 'app/hooks/useTheme';
import { usePackTemplateId } from '../hooks';
import { useGetPackTemplate } from '../hooks/useGetPackTemplate';

export const PackTemplateDetailsScreen = () => {
  // const { currentTheme } = useTheme();
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

  console.log('packTemplate', packTemplate);

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
              <RText style={{ color: 'white', paddingTop: 150, zIndex: 1000 }}>
                {JSON.stringify(packTemplate, null, 2)}
              </RText>
            }
            link={link}
          />
        </View>
      )}
    </Layout>
  );
};
