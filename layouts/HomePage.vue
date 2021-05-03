<template>
  <div>
    <Loading :visible="showLoading" />
    <LayoutContainer>
      <Home />
    </LayoutContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import Home from '@/components/Home.vue';
import LayoutContainer from '@/components/LayoutContainer.vue';
import Loading from '@/components/Loading.vue';

export default defineComponent({
  name: 'HomePage',

  components: {
    Home,
    LayoutContainer,
    Loading,
  },

  setup(props) {
    const state = reactive({
      showLoading: true,
    });

    onMounted(() => {
      onBgImgLoaded();
    });

    // 判断背景图加载完成
    const onBgImgLoaded = () => {
      const src = window
        .getComputedStyle(document.querySelector('#_homeBgContainer'))
        .background.match(/url\(\"?(.*)\"\)/)[1];
      console.log(src);
      const img = new Image();
      img.src = src;
      img.onload = function () {
        state.showLoading = false;
      };
    };

    return {
      ...toRefs(state),
    };
  },
});
</script>
