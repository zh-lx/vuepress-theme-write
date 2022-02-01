declare module '*.vue' {
  import type { ComponentOptions } from 'vue';
  const comp: ComponentOptions;
  export default comp;
}
declare module '*.svg';
declare var __VUEPRESS_DEV__: boolean;
declare module 'HomeFooter';

declare const SITE_INFO: {
  backgroundImage: string;
  backgroundImageDark: string;
  title: string;
  description: string;
  type: 'blog' | 'docs';
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
