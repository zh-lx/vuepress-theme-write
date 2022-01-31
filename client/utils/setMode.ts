import { themeMode } from '@/constants/theme-mode';

// 设置主题模式
export const setMode = (mode = 'lightMode') => {
  const root: HTMLElement = document.querySelector(':root');
  root.style.fontSize = '14px';
  const options = themeMode[mode];
  Object.keys(options).forEach((key) => {
    root.style.setProperty(key, options[key]);
  });
};
