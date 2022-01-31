declare module '*.vue' {
  import type { ComponentOptions } from 'vue';
  const comp: ComponentOptions;
  export default comp;
}
declare module '*.svg';
declare var __VUEPRESS_DEV__: boolean;
declare const SITE_INFO: {
  backgroundImage: string;
  backgroundImageDark: string;
  title: string;
  description: string;
  type: 'blog' | 'docs';
};
declare module 'HomeFooter';
