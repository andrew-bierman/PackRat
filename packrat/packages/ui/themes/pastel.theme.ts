import { createThemeBuilder } from '@tamagui/create-theme/theme-builder'

import { getComponentThemeDefinitions } from '../src/themes/componentThemeDefinitions'
import { masks } from '../src/themes/masks'
import { getPalettes } from '../src/themes/palettes'
import { shadows } from '../src/themes/shadows'
import { getTemplates } from '../src/themes/templates'
import {
  colorTokens,
  darkColor,
  darkColors,
  darkPalette,
  lightColor,
  lightColors,
  lightPalette,
} from '../src/themes/token-colors-pastel'

const colorThemeDefinition = (colorName: string) => [
  {
    parent: 'light',
    palette: colorName,
    template: 'colorLight',
  },
  {
    parent: 'dark',
    palette: colorName,
    template: 'base',
  },
]

const palettes = getPalettes(colorTokens, { darkColor, darkPalette, lightColor, lightPalette })
const { templates, maskOptions } = getTemplates(palettes)
const componentThemeDefinitions = getComponentThemeDefinitions({ maskOptions, templates })

const themesBuilder = createThemeBuilder()
  .addPalettes(palettes)
  .addTemplates(templates)
  .addMasks(masks)
  .addThemes({
    light: {
      template: 'base',
      palette: 'light',
      nonInheritedValues: {
        ...lightColors,
        ...shadows.light,
      },
    },
    dark: {
      template: 'base',
      palette: 'dark',
      nonInheritedValues: {
        ...darkColors,
        ...shadows.dark,
      },
    },
  })
  .addChildThemes({
    orange: colorThemeDefinition('orange'),
    yellow: colorThemeDefinition('yellow'),
    green: colorThemeDefinition('green'),
    blue: colorThemeDefinition('blue'),
    purple: colorThemeDefinition('purple'),
    pink: colorThemeDefinition('pink'),
    red: colorThemeDefinition('red'),
  })
  .addChildThemes({
    alt1: {
      mask: 'soften',
      ...maskOptions.alt,
    },
    alt2: {
      mask: 'soften2',
      ...maskOptions.alt,
    },
    active: {
      mask: 'soften3',
      skip: {
        color: 1,
      },
    },
  })
  .addChildThemes(componentThemeDefinitions, {
    avoidNestingWithin: ['alt1', 'alt2', 'active'],
  })

export const themes = themesBuilder.build()
