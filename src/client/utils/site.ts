import { computed } from 'vue';
import { useRoute } from 'vue-router';

export const currentLang = computed(() => {
  const route = useRoute();
  const languages = $Langs || [];
  let item = languages
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find(
      (item) =>
        route.path.startsWith(`${item.prefix}/`) || route.path === item.prefix
    );
  if (!item) {
    item = languages
      .sort((a, b) => b.prefix.length - a.prefix.length)
      .find((item) => item.prefix === '/');
  }
  return item;
});

export const getLang = (path: string) => {
  const languages = $Langs || [];
  let item = languages
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find((item) => path.startsWith(`${item.prefix}/`) || path === item.prefix);
  if (!item) {
    item = languages
      .sort((a, b) => b.prefix.length - a.prefix.length)
      .find((item) => item.prefix === '/');
  }
  return item;
};

export const getLangPath = (
  prefix: string,
  targetPrefix: string,
  path: string
) => {
  if (prefix === targetPrefix) {
    return path;
  }
  let target: string = '';
  if (prefix !== '/') {
    target = path.replace(prefix, targetPrefix === '/' ? '' : targetPrefix);
  } else {
    target = path.replace('/', targetPrefix + '/');
  }

  return target;
};
