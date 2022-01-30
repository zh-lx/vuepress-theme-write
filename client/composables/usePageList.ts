import { pagesData, PageData } from '@vuepress/client';
import { ref } from 'vue';
import { Blog, Tag, Category } from '@/types';
import { BlogFrontmatter } from '@/types/blog';
import { convertTimeStringToNumber } from '@/utils/formatTime';

// 获取页面列表
export async function usePageList() {
  const blogList = ref<Blog[]>([]);
  const tagList = ref<Tag[]>([]);
  const categoryList = ref<Category[]>([]);

  const pages = pagesData.value;

  for (let route in pages) {
    const getPageInfo = pages[route] as () => Promise<
      PageData<BlogFrontmatter>
    >;
    const page = await getPageInfo();

    // 布局占位的 .md 文件跳过
    if (page.frontmatter.layout) {
      continue;
    }

    // 获取tag列表
    const tags = getTagsFromFrontmatter(page.frontmatter);
    tags.forEach((tag) => {
      const targetTag = tagList.value.find((item) => {
        return item.name === tag;
      });
      if (!targetTag) {
        tagList.value.push({ name: tag, count: 1 });
      } else {
        targetTag.count++;
      }
    });

    // 获取category列表
    const category = (page as any).path.split('/')[1];
    const targetCategory = categoryList.value.find((item) => {
      return item.name === category;
    });
    if (!targetCategory) {
      categoryList.value.push({ name: category, count: 1 });
    } else {
      targetCategory.count++;
    }

    // 获取blog列表
    if (!(page.frontmatter.blog === false)) {
      blogList.value.push(page as Blog);
    }
    blogList.value.sort((a, b) => {
      const timeA =
        convertTimeStringToNumber(a.frontmatter.time) || a.git?.updatedTime;
      const timeB =
        convertTimeStringToNumber(b.frontmatter.time) || b.git?.updatedTime;
      return timeB - timeA;
    });
  }
  return { blogList, tagList, categoryList };
}

function getTagsFromFrontmatter(frontmatter: BlogFrontmatter): string[] {
  const { tag } = frontmatter;
  if (typeof tag === 'string') {
    return [tag];
  }
  if (Array.isArray(tag)) {
    return tag;
  }
  return [];
}
