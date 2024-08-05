import React from 'react';
import { RText as OriginalRText, RStack } from '@packrat/ui';
import { RLink } from '@packrat/ui';
import { View } from 'react-native';
import Carousel from '../carousel';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useFeed } from 'app/hooks/feed';
import loadStyles from './feedpreview.style';

interface FeedItem {
  id: string;
  name: string;
  type: string | null;
  description: string;
}

interface FeedPreviewScrollProps {
  itemWidth: number;
}
const RText: any = OriginalRText;

const FeedPreviewScroll: React.FC<FeedPreviewScrollProps> = ({ itemWidth }) => {
  const styles = useCustomStyles(loadStyles);
  const { data: feedData } = useFeed();

  console.log('feedData', feedData);

  return (
    <Carousel>
      {feedData
        ?.filter((item): item is FeedItem => item.type !== null)
        .map((item: FeedItem, index: number) => {
          const linkStr = `/${item.type}/${item.id}`;
          return linkStr ? (
            <RLink
              href={linkStr}
              key={`${linkStr}`}
              style={{ textDecoration: 'none' }}
            >
              <View style={[styles.cardStyles, { width: itemWidth }]}>
                <RStack
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <RText style={styles.feedItemTitle}>{item.name}</RText>
                  <RText
                    style={styles.feedItemType}
                    fontSize="$4"
                    textTransform="capitalize"
                    paddingHorizontal={8}
                    alignSelf="flex-end"
                    borderRadius={5}
                  >
                    {item.type}
                  </RText>
                </RStack>
                <RText style={styles.feedItemDescription}>
                  {item.description}
                </RText>
              </View>
            </RLink>
          ) : null;
        })}
    </Carousel>
  );
};

const FeedPreview: React.FC = () => {
  return <FeedPreviewScroll itemWidth={300} />;
};
export default FeedPreview;
