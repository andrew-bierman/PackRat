import React from 'react';
import { RText, RStack, YStack } from '@packrat/ui';
import { Link } from 'expo-router';
import Carousel from '../carousel';
import useCustomStyles from '~/hooks/useCustomStyles';
import { useFeed } from '~/hooks/feed';

const FeedPreviewScroll = () => {
  const styles = useCustomStyles(loadStyles);

  // useEffect(() => {
  //   dispatch(getPublicPacks());
  //   dispatch(getPublicTrips());
  // }, []);

  const { data: feedData, error, isLoading } = useFeed();

  return (
    <Carousel itemWidth={250}>
      {feedData?.map((item, index) => {
        const linkStr = `/${item.type}/${item._id}`;
        return linkStr ? (
          <Link href={linkStr} key={`${linkStr}`}>
            <YStack {...styles.cardStyles} key={index}>
              <RStack flexDirection="row" justifyContent="space-between">
                <RText {...styles.feedItemTitle}>{item.name}</RText>
                <RText
                  fontSize="$1"
                  backgroundColor="#F2F1EB"
                  textTransform="capitalize"
                  padding="2px"
                  alignSelf="center"
                  borderRadius="2px"
                >
                  {item.type}
                </RText>
              </RStack>
              <RText>{item.description}</RText>
            </YStack>
          </Link>
        ) : null;
      })}
    </Carousel>
  );
};

const FeedPreview = () => {
  return <FeedPreviewScroll />;
};

const loadStyles = (theme, appTheme) => {
  const { currentTheme } = theme;
  return {
    feedPreview: {
      flexDirection: 'row',
      width: '100%',
      marginBottom: 20,
    },
    cardStyles: {
      height: 100,
      width: 250,
      backgroundColor: appTheme.colors.primary,
      borderRadius: 5,
      padding: 20,
      marginLeft: 10,
    },
    feedItem: {
      width: 250,
      height: 100,
      backgroundColor: currentTheme.colors.primary,
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      marginRight: 10,
      marginLeft: 10,
    },
    feedItemTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      color: currentTheme.colors.text,
      marginBottom: 5,
    },
  };
};

export default FeedPreviewScroll;
