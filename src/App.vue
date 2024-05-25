
<script  lang="ts" setup>
import { useMobile } from '@/hooks'
import { ref } from 'vue'
import NavAppView from '@/views/Navigation/index.vue'
import NavPcView from '@/views/pc/index.vue'

const isMobile = ref(useMobile())

// onMounted,onUnmounted,

// const checkWindons = () => location.reload()

// onMounted(() => {
//     window.addEventListener('resize', checkWindons)
// })
// onUnmounted(() => {
//     window.removeEventListener('resize', checkWindons)
// })
</script>

<template>
    <div>
        <nav-app-view v-if="isMobile"></nav-app-view>
        <nav-pc-view v-else></nav-pc-view>
    </div>
</template>
<style>
/* .myclass {
    animation-delay: 0.5s;
} */
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
</style>