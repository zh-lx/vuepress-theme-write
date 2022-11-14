declare module '*.vue' {
  import type { ComponentOptions } from 'vue';
  const comp: ComponentOptions;
  export default comp;
}
declare module '*.svg';
declare var __VUEPRESS_DEV__: boolean;
declare module 'HomeFooter';
declare module 'NavbarExtra';

declare const SITE_INFO: {
  backgroundImage: string;
  backgroundImageDark: string;
  title: string;
  description: string;
  type: 'blog' | 'docs';
  start: string;
  startPath: string;
  homeImg: string;
};

declare const AUTHOR_INFO: {
  name: string;
  avatar: string;
  introduction: string;
};

declare const CONTACT_INFO: {
  juejin: string;
  github: string;
  qq: string;
  wechat: string;
  email: string;
  csdn: string;
  zhihu: string;
};

declare const HOME_ITEMS: {
  title: string;
  text: string;
}[];

declare const PageControl: {
  hidePageMeta: boolean;
};
