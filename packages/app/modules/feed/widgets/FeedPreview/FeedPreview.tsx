import React from 'react';
import Carousel from 'app/components/carousel';
import { useFeed } from '../../hooks';
import Loader from 'app/components/Loader';
import { FeedCard, type FeedItem } from 'app/modules/feed';
import { View } from 'tamagui';

interface FeedPreviewScrollProps {
  itemWidth: number;
  feedType: string;
  id?: string;
}

const FeedPreviewScroll: React.FC<FeedPreviewScrollProps> = ({
  itemWidth,
  feedType,
  id,
}) => {
  const { data: feedData, isLoading } = useFeed({ feedType, id });

  return isLoading ? (
    <Loader />
  ) : (
    <Carousel itemWidth={itemWidth}>
      {feedData
        ?.filter((item): item is FeedItem => item.type !== null)
        .map((item: FeedItem) => {
          return (
            <View style={{ marginBottom: 10 }}>
              <FeedCard item={item} cardType="secondary" feedType={item.type} />
            </View>
          );
        })}
    </Carousel>
  );
};

export const FeedPreview: React.FC<{ feedType: string; id?: string }> = ({
  feedType,
  id,
}) => {
  return <FeedPreviewScroll itemWidth={200} feedType={feedType} id={id} />;
};
