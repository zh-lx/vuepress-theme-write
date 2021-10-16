<template>
  <div class="author-container">
    <div class="author">
      <img class="author-avatar" :src="author.avatar" alt="" />
      <div class="author-name">
        {{ author.name || '神秘人' }}
      </div>
      <div class="author-introduction">
        {{ author.introduction }}
      </div>
    </div>
    <div class="contact">
      <i
        v-if="contact.github"
        class="et-logo-github contact-icon pointer"
        @click="openUrlWindow(contact.github)"
      ></i>
      <TextTip :tip="contact.qq" v-if="contact.qq">
        <i class="et-logo-qq contact-icon pointer" style="color: #4cafe9"></i>
      </TextTip>
      <i
        v-if="contact.csdn"
        class="et-logo-csdn contact-icon pointer"
        style="color: #fc5531"
        @click="openUrlWindow(contact.csdn)"
      ></i>
      <TextTip :tip="contact.wechat" v-if="contact.wechat">
        <i
          v-if="contact.wechat"
          class="et-logo-wechat contact-icon pointer"
          style="color: #11d31d"
        ></i>
      </TextTip>
      <i
        v-if="contact.zhihu"
        class="et-zhihu contact-icon pointer"
        style="color: #1089e9"
        @click="openUrlWindow(contact.zhihu)"
      ></i>
      <TextTip :tip="contact.email" v-if="contact.email">
        <i
          v-if="contact.email"
          class="et-ic-mail contact-icon pointer"
          style="background: #fdb100"
        ></i>
      </TextTip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, Ref, computed } from 'vue';
import TextTip from '@/components/TextTip.vue';
import { usePageData } from '@vuepress/client';

const DefaultAvatar =
  'https://image-1300099782.cos.ap-beijing.myqcloud.com/default-avatar.jfif';

type Author = {
  avator: string;
  name: string;
  introduction: string;
};
type Contact = {
  github?: string;
  qq?: string;
  csdn?: string;
  wechat?: string;
  zhihu?: string;
  email?: string;
};
export default defineComponent({
  name: 'AuthorInfo',
  props: {
    author: {
      type: Object,
      default: {},
    },
    contact: {
      type: Object,
      default: {},
    },
  },
  components: {
    TextTip,
  },
  setup() {
    const pageData: any = usePageData();
    const author: Ref<Author> = computed(() => {
      return pageData.value.frontmatter?.author || {};
    });

    const contact: Ref<Contact> = computed(() => {
      return pageData.value.frontmatter?.contact || {};
    });

    const openUrlWindow: (url: string) => void = (url) => {
      window.open(url);
    };

    return {
      author,
      contact,
      openUrlWindow,
      DefaultAvatar,
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
  .et-logo-github {
    transform: translateY(-1px);
  }
  .contact-icon {
    transform: scale(1.25);
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transform: scale(1.375);
    }
  }
  .et-ic-mail {
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
