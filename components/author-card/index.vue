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
      <i
        v-if="contact.github"
        class="et-icon-github contact-icon pointer"
        @click="openUrlWindow(contact.github)"
      ></i>
      <TextTip :tip="contact.qq" v-if="contact.qq">
        <i class="et-icon-qq contact-icon pointer" style="color: #4cafe9"></i>
      </TextTip>
      <i
        v-if="contact.csdn"
        class="et-icon-csdn contact-icon pointer"
        style="color: #fc5531"
        @click="openUrlWindow(contact.csdn)"
      ></i>
      <TextTip :tip="contact.wechat" v-if="contact.wechat">
        <i
          v-if="contact.wechat"
          class="et-icon-wechat contact-icon pointer"
          style="color: #11d31d"
        ></i>
      </TextTip>
      <i
        v-if="contact.zhihu"
        class="et-icon-zhihu contact-icon pointer"
        style="color: #1089e9"
        @click="openUrlWindow(contact.zhihu)"
      ></i>
      <TextTip :tip="contact.email" v-if="contact.email">
        <i
          v-if="contact.email"
          class="et-icon-mail contact-icon pointer"
          style="background: #fdb100"
        ></i>
      </TextTip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, Ref, computed, ComputedRef } from 'vue';
import TextTip from '@/components/TextTip.vue';
import { Author, Contact, DefaultThemeHomePageFrontmatter } from '@/types/page';
import { usePageFrontmatter } from '@vuepress/client';

const DEFAULT_AUTHOR = {
  avatar:
    'https://image-1300099782.cos.ap-beijing.myqcloud.com/default-avatar.jfif',
  name: '潇洒哥',
  introduction: '这个人很懒，没有个人介绍',
};

export default defineComponent({
  // 作者信息卡片
  name: 'AuthorCard',
  components: {
    TextTip,
  },
  setup() {
    const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>();

    // 作者信息
    const author = computed(() => {
      return frontmatter.value.author || DEFAULT_AUTHOR;
    });

    // 联系方式
    const contact = computed(() => {
      return frontmatter.value.contact;
    });

    // 点击博客时打开博客地址
    const openUrlWindow: (url: string) => void = (url) => {
      window.open(url);
    };

    return {
      author,
      contact,
      openUrlWindow,
      DEFAULT_AUTHOR,
    };
  },
});
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
    margin-top: 1rem;
    font-size: 20px;
    color: var(--mainTextColor);
  }
  .author-introduction {
    margin-top: 1rem;
  }
}
.contact {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
  .contact-icon {
    transform: scale(1.25);
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transform: scale(1.375);
    }
  }
  .et-icon-github {
    transform: translateY(-1px);
  }
  .et-icon-mail {
    background-color: #2c3e50;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    color: #fff;
    transform: scale(0.8);
    &:hover {
      transform: scale(0.88);
    }
  }
}
</style>
