import { shorthands } from '@tamagui/shorthands'
import { createTokens } from '@tamagui/web'
import { createTamagui } from 'tamagui'
import { animations } from './config/animations'
import { bodyFont, headingFont } from './config/fonts'
import { media } from './config/media'
import { radius } from './themes/token-radius'
import { size } from './themes/token-size'
import { space } from './themes/token-space'
import { zIndex } from './themes/token-z-index'

import * as themes from './themes/theme-generated'
import { color } from './themes/token-colors'

export const config = createTamagui({
  themes,
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens: createTokens({
    color,
    radius,
    zIndex,
    space,
    size,

    // testing
    icon: {
      sm: 10,
      md: 10,
      lg: 10,
    },
  }),
  media,
})
