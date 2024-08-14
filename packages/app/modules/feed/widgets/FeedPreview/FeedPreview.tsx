import React from 'react';
import Carousel from 'app/components/carousel';
import { useFeed } from 'app/hooks/feed';
import { default as FeedPreviewCard, type FeedItem } from './FeedPreviewCard';
import Loader from 'app/components/Loader';

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
          const linkStr = `/${item.type}/${item.id}`;
          return linkStr ? (
            <FeedPreviewCard {...{ linkStr, item, feedType }} key={linkStr} />
          ) : null;
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
