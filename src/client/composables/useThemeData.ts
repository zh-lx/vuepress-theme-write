import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
  // @ts-ignore
} from '@vuepress/plugin-theme-data/client';
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
  // @ts-ignore
} from '@vuepress/plugin-theme-data/client';
import type { DefaultThemeData } from '../../shared/index.js';

export const useThemeData = (): ThemeDataRef<DefaultThemeData> =>
  _useThemeData<DefaultThemeData>();
export const useThemeLocaleData = (): ThemeLocaleDataRef<DefaultThemeData> =>
  _useThemeLocaleData<DefaultThemeData>();
