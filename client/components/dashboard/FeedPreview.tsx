import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RText, RStack } from '@packrat/ui';
import { Link } from 'expo-router';
import { Dimensions, View } from 'react-native';
import { getPublicPacks, getPublicTrips } from '../../store/feedStore';
import useTheme from '../../hooks/useTheme';
import Carousel from '../carousel';
import useCustomStyles from '~/hooks/useCustomStyles';

const { height, width } = Dimensions.get('window');

const FeedPreviewScroll = () => {
  const dispatch = useDispatch();
  const styles = useCustomStyles(loadStyles);

  useEffect(() => {
    dispatch(getPublicPacks());
    dispatch(getPublicTrips());
  }, []);

  const feedData = useSelector((state) => state.feed);
  const filteredFeedData = feedData.publicTrips.concat(feedData.publicPacks);

  return (
    <Carousel itemWidth={250}>
      {filteredFeedData.map((item, index) => {
        const linkStr = `/${item.type}/${item._id}`;
        return linkStr ? (
          <Link href={linkStr} key={`${linkStr}`}>
            <View style={styles.cardStyles} key={index}>
              <RStack
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <RText style={styles.feedItemTitle}>{item.name}</RText>
                <RText
                  fontSize="$1"
                  style={{
                    backgroundColor: '#F2F1EB',
                    textTransform: 'capitalize',
                    padding: '4px 8px',
                    alignSelf: 'center',
                    borderRadius: '2px',
                  }}
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
