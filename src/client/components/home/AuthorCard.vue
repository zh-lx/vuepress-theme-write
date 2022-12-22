<template>
  <div class="author-card">
    <div class="author">
      <img class="author-avatar" :src="author.avatar" alt="头像" />
      <div class="author-name">
        {{ author.name }}
      </div>
      <div class="author-introduction">
        {{ author.introduction }}
      </div>
    </div>
    <div class="contact" v-if="contact">
      <TextTip :tip="contact.qq" v-if="contact.qq">
        <img :src="QQIcon" class="contact-icon pointer" />
      </TextTip>
      <TextTip :tip="contact.wechat" v-if="contact.wechat">
        <img
          :src="WechatIcon"
          class="contact-icon pointer"
          @click="openUrlWindow(contact.wechat)"
        />
      </TextTip>
      <TextTip :tip="contact.email" v-if="contact.email">
        <img :src="MailIcon" class="contact-icon pointer" />
      </TextTip>
      <img
        v-if="contact.github"
        :src="GithubIcon"
        class="contact-icon pointer"
        @click="openUrlWindow(contact.github)"
      />
      <img
        v-if="contact.csdn"
        :src="CdsnIcon"
        class="contact-icon pointer"
        @click="openUrlWindow(contact.csdn)"
      />
      <img
        v-if="contact.zhihu"
        :src="ZhiHuIcon"
        class="contact-icon pointer"
        @click="openUrlWindow(contact.zhihu)"
      />
      <img
        v-if="contact.juejin"
        :src="JueJinIcon"
        class="contact-icon pointer"
        @click="openUrlWindow(contact.juejin)"
      />
      <img
        v-if="contact.gitee"
        :src="GiteeIcon"
        class="contact-icon pointer"
        @click="openUrlWindow(contact.gitee)"
      />
      <img
        v-if="contact.weibo"
        :src="WeiboIcon"
        class="contact-icon pointer"
        @click="openUrlWindow(contact.weibo)"
      />
      <img
        v-if="contact.jianshu"
        :src="JianshuIcon"
        class="contact-icon pointer"
        @click="openUrlWindow(contact.jianshu)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TextTip from '@/components/text-tip/index.vue';
import { DefaultThemeHomePageFrontmatter } from '@/types/page';
import { usePageFrontmatter } from '@vuepress/client';
import ZhiHuIcon from '@/assets/zhihu.svg';
import CdsnIcon from '@/assets/csdn.svg';
import JueJinIcon from '@/assets/juejin.svg';
import QQIcon from '@/assets/qq.svg';
import WechatIcon from '@/assets/wechat.svg';
import MailIcon from '@/assets/mail.svg';
import GithubIcon from '@/assets/github.svg';
import GiteeIcon from '@/assets/gitee.svg';
import WeiboIcon from '@/assets/weibo.svg';
import JianshuIcon from '@/assets/jianshu.svg';

const DEFAULT_AUTHOR = {
  avatar:
    'https://image-1300099782.cos.ap-beijing.myqcloud.com/default-avatar.jfif',
  name: '潇洒哥',
  introduction: '这个人很懒，没有个人介绍',
};

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>();

// 作者信息
const author = computed(() => {
  return {
    ...frontmatter.value.author,
    ...DEFAULT_AUTHOR,
    ...($Author || {}),
  };
});

// 联系方式
const contact = computed(() => {
  return { ...frontmatter.value.contact, ...($Contact || {}) };
});

// 点击博客时打开博客地址
const openUrlWindow: (url: string) => void = (url) => {
  window.open(url);
};
</script>

<style lang="scss" scoped>
.author {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .author-avatar {
    width: 60%;
    height: auto;
    border-radius: 50%;
  }
  .author-name {
    font-weight: 600;
    margin-top: 14px;
    font-size: 20px;
    color: var(--color-text-10);
  }
  .author-introduction {
    margin-top: 14px;
  }
}
.contact {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 14px;
  .contact-icon {
    height: 24px;
    width: 24px;
    object-fit: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
