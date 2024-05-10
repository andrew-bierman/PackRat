import React from 'react';
import { RText, RStack } from '@packrat/ui';
import { Link } from '@packrat/crosspath';
import { View } from 'react-native';
import Carousel from '../carousel';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useFeed } from 'app/hooks/feed';
import loadStyles from './feedpreview.style';

interface FeedItem {
  id: string;
  name: string;
  type: string;
  description: string;
}

interface FeedPreviewScrollProps {
  itemWidth: number;
}

const FeedPreviewScroll: React.FC<FeedPreviewScrollProps> = ({ itemWidth }) => {
  const styles = useCustomStyles(loadStyles);
  const { data: feedData } = useFeed();

  return (
    <Carousel itemWidth={itemWidth}>
      {feedData?.map((item: FeedItem, index: number) => {
        const linkStr = `/${item.type}/${item.id}`;
        return linkStr ? (
          <Link
            href={linkStr}
            key={`${linkStr}`}
            style={{ textDecoration: 'none' }}
          >
            <View style={styles.cardStyles} key={index}>
              <RStack
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <RText style={styles.feedItemTitle}>{item.name}</RText>
                <RText
                  style={styles.feedItemType}
                  fontSize="$1"
                  fontWeight="bold"
                  backgroundColor={'#F2F1EB'}
                  textTransform="capitalize"
                  paddingVertical={4}
                  paddingHorizontal={8}
                  alignContent="center"
                  borderRadius={2}
                >
                  {item.type}
                </RText>
              </RStack>
              <RText>{item.description}</RText>
            </View>
          </Link>
        ) : null;
      })}
    </Carousel>
  );
};

const FeedPreview: React.FC = () => {
  return <FeedPreviewScroll itemWidth={250} />;
};
export default FeedPreview;
