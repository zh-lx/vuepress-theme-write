<template>
  <div class="home-right">
    <div class="card author-card">
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
    <div class="card category-card">
      <div class="category-card-title">
        <i class="ei-folder-open"></i>文章分类
      </div>
      <Categories />
    </div>
    <div class="card tag-card">
      <div class="tag-card-title"><i class="ei-tags"></i>热门标签</div>
      <Tags />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { usePageData } from '@vuepress/client';
import { usePagesInfo } from '@/composables';
import { Tag, Category } from '@/types';
import Categories from '@/components/Categories.vue';
import Tags from '@/components/Tags.vue';
import TextTip from '@/components/TextTip.vue';

const DefaultAvatar = 'https://i.postimg.cc/tJghhbZY/default-avatar.jpg';

export default defineComponent({
  name: 'HomeRight',
  components: { Categories, Tags, TextTip },
  setup() {
    const pageData: any = usePageData();
    let categories = ref<Category[]>([]);
    let tags = ref<Tag[]>([]);
    usePagesInfo().then((blogsInfo) => {
      categories.value = blogsInfo?.categories?.value || [];
      tags.value = blogsInfo?.tags?.value || [];
    });

    const openUrlWindow = (url) => {
      window.open(url);
    };

    const author = computed(() => {
      return pageData.value.frontmatter?.author || {};
    });

    const contact = computed(() => {
      return pageData.value.frontmatter?.contact || {};
    });

    return {
      pageData,
      DefaultAvatar,
      categories,
      tags,
      openUrlWindow,
      author,
      contact,
    };
  },
});
</script>

<style scoped lang="scss">
@import '~@/styles/_variables.scss';

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
.category-card {
  padding-left: 0;
  padding-right: 0;
  margin-top: 1.5rem;
  .category-card-title {
    padding-left: 1rem;
    margin-bottom: 0.5rem;
    i {
      margin-right: 4px;
    }
  }
}
.tag-card {
  margin-top: 1.5rem;
  .tag-card-title {
    margin-bottom: 0.5rem;
    i {
      margin-right: 4px;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .author-card {
    display: none;
  }
}
</style>
