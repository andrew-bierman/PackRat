import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { RButton, RStack } from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useAbout from 'app/hooks/about/useAbout';
import loadStyles from './privacy.style';
import Layout from 'app/components/layout/Layout';

const PrivacyContent = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();

  const styles = useCustomStyles(loadStyles);

  return (
    <Layout>
      <ScrollView>
        <View style={styles.textContainer}>
          <View style={styles.headerContainer}>
            <Text style={[isDark ? styles.headerDark : styles.header]}>
              Privacy Policy
            </Text>
          </View>

          {privacySections.map((section, index) => (
            <Text key={index} style={[isDark ? styles.textDark : styles.text]}>
              {section}
            </Text>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

const privacySections = [
  `Welcome to PackRat, the ultimate adventure planner designed specifically for outdoor enthusiasts who have a passion for exploring the wonders of the natural world. With our comprehensive app, we aim to revolutionize the way you plan and organize your outdoor excursions, be it a thrilling weekend camping trip, an invigorating day hike, or an epic cross-country road trip. Let us be your trusted companion in creating unforgettable adventures and seamless experiences in the great outdoors.`,

  `At PackRat, we understand that planning a trip can sometimes be overwhelming. That's why our app is built to simplify the process, providing you with a user-friendly interface that makes trip planning a breeze. Whether you're a seasoned adventurer or a novice explorer, our intuitive features ensure that every aspect of your trip is carefully considered and effortlessly managed.`,

  `One of the key features of PackRat is its ability to help you create and manage trips effortlessly. You can start by creating a personalized profile that reflects your interests, preferences, and outdoor expertise. By understanding your individual needs, we can provide tailored recommendations and suggestions that align with your unique adventure style. You can easily create multiple trips, keeping all your outdoor escapades neatly organized in one place. From the initial concept to the final itinerary, PackRat empowers you to take control of your outdoor journeys.`,

  `Discovering new destinations is a thrilling aspect of outdoor exploration, and PackRat is your gateway to a world of endless possibilities. Our app is equipped with an extensive database of breathtaking locations, ranging from serene national parks to hidden gems off the beaten path. Explore the rich diversity of landscapes and discover new horizons waiting to be explored. Each destination is accompanied by detailed information, including descriptions, photos, and user reviews, to help you make informed decisions about your next adventure.`,

  `But planning a trip isn't just about the destination—it's also about being prepared for whatever Mother Nature throws your way. PackRat keeps you informed with up-to-date weather forecasts, ensuring that you're equipped with the knowledge needed to make well-informed decisions about your outdoor activities. From sunny skies to sudden rain showers, you'll have the information you need to pack the right gear and make the most of your time outdoors.`,

  `To provide you with accurate and reliable navigation, PackRat integrates seamlessly with Mapbox, a leading mapping and navigation platform. With our app, you'll have access to detailed maps and directions to your chosen destinations. We understand that the journey is as important as the destination itself, and our navigation features are designed to optimize your routes, taking into account factors such as traffic, road conditions, and scenic routes. Let PackRat guide you on the path to adventure.`,

  `As outdoor enthusiasts ourselves, we know that each season brings a unique set of opportunities and challenges. That's why PackRat goes beyond just providing directions and weather forecasts. Our app also suggests popular outdoor activities based on the location and season of your trip. Whether you're looking for the best hiking trails in the summer, the most picturesque spots for fall foliage, or the perfect skiing destinations in winter, PackRat has got you covered. Let us inspire you to try new activities and make the most of each season's offerings.`,

  `So, whether you're a solo adventurer seeking solitude in the wilderness or a group of friends looking to embark on a shared escapade, PackRat is here to help you turn your dreams into reality. Pack your bags, grab your friends, and let the thrill of the outdoors ignite your spirit of adventure. With PackRat by your side, you can confidently navigate the vast landscapes, discover hidden treasures, and create lasting memories. Get ready for your next expedition, and let PackRat be your trusted companion on the journey of a lifetime.`,
];

export default PrivacyContent;
