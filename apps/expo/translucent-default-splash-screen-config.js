/**
 * @module withSplashWindowIsTranslucent
 * @description Custom expo plugin that makes the {@link https://developer.android.com/develop/ui/views/launch/splash-screen/migrate|default splash screen (android 12+)} transparent.
 * This is a temporary work around for the {@link https://github.com/zoontek/react-native-bootsplash/issues/496|double splash screen issue}.
 *
 *
 * Credits: {@link https://github.com/expo/expo/issues/16084#issuecomment-1261330440}
 */

const { AndroidConfig, withAndroidStyles } = require('@expo/config-plugins');

const withSplashWindowIsTranslucent = (config) => {
  return withAndroidStyles(config, async (config) => {
    config.modResults = await configureFullScreenDialog(config.modResults);
    return config;
  });
};

async function configureFullScreenDialog(styles) {
  const splashScreen = styles.resources.style.find(
    (style) => style.$.name === 'Theme.App.SplashScreen',
  );

  if (splashScreen) {
    splashScreen.item = splashScreen.item.filter(
      (item) => item.$.name !== 'android:windowIsTranslucent',
    );
    splashScreen.item.push(
      AndroidConfig.Resources.buildResourceItem({
        name: 'android:windowIsTranslucent',
        value: true,
      }),
    );
  }

  return styles;
}

module.exports = withSplashWindowIsTranslucent;
