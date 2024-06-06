
<script  lang="ts" setup>
import { useMobile } from '@/hooks'
import relIcon from '../public/rel.svg'
import { ref, onMounted } from 'vue'
import NavAppView from '@/views/Navigation/index.vue'
import NavPcView from '@/views/pc/index.vue'
import { getLuckyCasino } from './api'
import { useSwiperStore } from './store'

const isMobile = ref(useMobile())
const store = useSwiperStore()

const initFavicon = () => {
    // 查找现有的 link 元素或创建一个新的
    const link: any =
        document.querySelector("link[rel*='icon']") ||
        document.createElement('link')
    link.type = 'image/png/svg'
    link.rel = 'shortcut icon'
    link.href = relIcon
    // 将 link 元素添加到 head 中
    document.getElementsByTagName('head')[0].appendChild(link)
}

const handleLuckyCasino = async () => {
  const res = await getLuckyCasino()
  const luckyCasino = (res?.data?.moduleList || [])?.some?.(item => {
    if (item?.code === 'lucky7_casino' && item?.enable === 1) {
      return true
    }
    return false
  })
  store.onChangeLuckyCasino(luckyCasino)
}

onMounted(() => {
    initFavicon()
    handleLuckyCasino()
})
</script>

<template>
    <div>
        <nav-app-view v-if="isMobile"></nav-app-view>
        <nav-pc-view v-else></nav-pc-view>
    </div>
</template>
<style>
html.bobd {
    height: 100%;
}
.el-loading-spinner .path {
    -webkit-animation: loading-dash 1.5s ease-in-out infinite;
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke-linecap: round;
    stroke: #ff8727 !important;
}
.el-loading-spinner .el-loading-text {
    color: rgb(240, 228, 188) !important;
    margin: 3px 0;
    font-size: 14px;
}
.el-loading-mask {
    background-color: rgba(0, 0, 0, 0.3) !important;
}
.el-dropdown-menu {
    background: none;
}
.el-dropdown__popper.el-popper {
    background: rgba(225, 225, 225, 0.9) !important;
    border: 0px;
    box-shadow: node;
}
</style>

<!-- 

<template>
    <div>
      <button @click="changeFavicon">Change Favicon</button>
    </div>
  </template>
  <script>
  import { onMounted } from 'vue';
  export default {
    setup() {
      // 动态创建并设置 favicon 的函数
      const changeFavicon = (iconURL = 'path/to/your/favicon.ico') => {
        // 查找现有的 link 元素或创建一个新的
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = iconURL;
        // 将 link 元素添加到 head 中
        document.getElementsByTagName('head')[0].appendChild(link);
      };
      onMounted(() => {
        // 组件挂载后，你可以设置默认的 favicon
        changeFavicon('path/to/default/favicon.ico');
      });
      return {
        changeFavicon
      };
    }
  };
  </script> -->