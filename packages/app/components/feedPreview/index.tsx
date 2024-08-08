import React from 'react';
import Carousel from '../carousel';
import { useFeed } from 'app/hooks/feed';
import { default as FeedPreviewCard, type FeedItem } from './FeedPreviewCard';

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
  const { data: feedData } = useFeed({ feedType, id });

  return (
    <Carousel itemWidth={itemWidth}>
      {feedData
        ?.filter((item): item is FeedItem => item.type !== null)
        .map((item: FeedItem) => {
          const linkStr = `/${item.type}/${item.id}`;
          return linkStr ? (
            <FeedPreviewCard {...{ linkStr, item }} key={linkStr} />
          ) : null;
        })}
    </Carousel>
  );
};

const FeedPreview: React.FC<{ feedType: string; id?: string }> = ({
  feedType,
  id,
}) => {
  return <FeedPreviewScroll itemWidth={200} feedType={feedType} id={id} />;
};
export default FeedPreview;
