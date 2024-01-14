// Based on https://github.com/zeit/next.js/tree/canary/examples/with-react-native-web
// and https://github.com/expo/expo-cli/blob/main/packages/webpack-config/web-default/index.html

import { config } from '@packrat/ui';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';
import { AppRegistry } from 'react-native';

export const style = `
/**
 * Building on the RNWeb reset:
 * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/initialRules.js
 */
html, body, #__next {
  width: 100%;
  /* To smooth any scrolling behavior */
  -webkit-overflow-scrolling: touch;
  margin: 0px;
  padding: 0px;
  /* Allows content to fill the viewport and go beyond the bottom */
  min-height: 100%;
}
#__next {
  flex-shrink: 0;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 1;
  display: flex;
  flex: 1;
}
html {
  scroll-behavior: smooth;
  /* Prevent text size change on orientation change https://gist.github.com/tfausak/2222823#file-ios-8-web-app-html-L138 */
  -webkit-text-size-adjust: 100%;
  height: 100%;
}
body {
  display: flex;
  /* Allows you to scroll below the viewport; default value is visible */
  overflow-y: auto;
  overscroll-behavior-y: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-overflow-style: scrollbar;
}
`;

const fontFaces = `
  @font-face {
    font-family: 'AntDesign';
    src: url('/fonts/AntDesign.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Entypo';
    src: url('/fonts/Entypo.ttf') format('truetype');
  }
  @font-face {
    font-family: 'EvilIcons';
    src: url('/fonts/EvilIcons.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Feather';
    src: url('/fonts/Feather.ttf') format('truetype');
  }
  @font-face {
    font-family: 'FontAwesome';
    src: url('/fonts/FontAwesome.ttf') format('truetype');
  }
  @font-face {
    font-family: 'FontAwesome5_Brands';
    src: url('/fonts/FontAwesome5_Brands.ttf') format('truetype');
  }
  @font-face {
    font-family: 'FontAwesome5_Regular';
    src: url('/fonts/FontAwesome5_Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'FontAwesome5_Solid';
    src: url('/fonts/FontAwesome5_Solid.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Fontisto';
    src: url('/fonts/Fontisto.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Foundation';
    src: url('/fonts/Foundation.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Ionicons';
    src: url('/fonts/Ionicons.ttf') format('truetype');
  }
  @font-face {
    font-family: 'MaterialCommunityIcons';
    src: url('/fonts/MaterialCommunityIcons.ttf') format('truetype');
  }
  @font-face {
    font-family: 'MaterialIcons';
    src: url('/fonts/MaterialIcons.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Octicons';
    src: url('/fonts/Octicons.ttf') format('truetype');
  }
  @font-face {
    font-family: 'SimpleLineIcons';
    src: url('/fonts/SimpleLineIcons.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Zocial';
    src: url('/fonts/Zocial.ttf') format('truetype');
  }
`;

export async function getInitialProps({ renderPage }) {
  AppRegistry.registerComponent('Main', () => Main);
  const { getStyleElement } = AppRegistry.getApplication('Main');
  const page = await renderPage();

  // Solito styles
  // const styles = [
  //   <style key="style-reset" dangerouslySetInnerHTML={{ __html: style }} />,
  //   getStyleElement(),
  // ];
  // return { ...page, styles: React.Children.toArray(styles) };

  // Note: Keep Tamagui styles after react-native-web styles. From tamagui starter:
  const styles = [
    <style key="style-reset" dangerouslySetInnerHTML={{ __html: style }} />,
    getStyleElement(),
    <style
      key="tamagui-css"
      dangerouslySetInnerHTML={{
        __html: config.getCSS({
          exclude:
            process.env.NODE_ENV === 'development' ? null : 'design-system',
        }),
      }}
    />,
  ];
  return { ...page, styles: React.Children.toArray(styles) };
}

export class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {/* <style dangerouslySetInnerHTML={{ __html: style }} />
          <style dangerouslySetInnerHTML={{ __html: fontFaces }} /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

Document.getInitialProps = getInitialProps;

export default Document;
