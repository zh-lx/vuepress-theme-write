import { themeMode } from '@/constants/theme';

// 设置主题模式
export const setMode = (mode = 'lightMode') => {
  if (typeof document !== 'undefined') {
    const root: HTMLElement = document?.querySelector(':root') as HTMLElement;
    root.style.fontSize = '14px';
    const options = themeMode[mode];
    Object.keys(options).forEach((key) => {
      root.style.setProperty(key, options[key]);
    });
  }
};
