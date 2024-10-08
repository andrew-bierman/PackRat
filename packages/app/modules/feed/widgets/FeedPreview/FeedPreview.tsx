import React, { memo } from 'react';
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
  const validFeedData = feedData?.filter?.((item) => item.id);

  return isLoading ? (
    <Loader />
  ) : (
    <Carousel itemWidth={itemWidth}>
      {validFeedData
        ?.filter((item): item is FeedItem => item.type !== null)
        .map((item: FeedItem) => {
          return (
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <FeedCard item={item} cardType="secondary" feedType={item.type} />
            </View>
          );
        })}
    </Carousel>
  );
};

interface FeedPreviewProps {
  feedType: string;
  id?: string;
}

export const FeedPreview = memo(function FeedPreview({
  feedType,
  id,
}: FeedPreviewProps) {
  console.log({
    feedType,
    id,
  });
  return <FeedPreviewScroll itemWidth={200} feedType={feedType} id={id} />;
});
