
<script  lang="ts" setup>
import { useMobile } from '@/hooks'
import { ref } from 'vue'
import NavAppView from '@/views/Navigation/_index.vue'
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
</style>