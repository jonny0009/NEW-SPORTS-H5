<!-- <script lang="ts">
import { ref, onMounted, defineComponent, PropType } from 'vue'
import { VideoMaskType, VideoMaskEnum, APP_ID } from '@/model'
export default defineComponent({
    props: {
        src: String,
        mask: Object as PropType<VideoMaskEnum>
    },
    setup(props) {
        const { src, mask } = props

        const clientHeight = ref(0)
        const contanier = ref<any>(null)
        const linearGradient = VideoMaskType[mask!]

        const onResize = () => {
            const app = document.querySelector(APP_ID)!
            const resizeObserver = new ResizeObserver(() => {
                clientHeight.value = contanier.value.clientHeight
            })
            resizeObserver.observe(app)
        }

        onMounted(() => onResize())

        return {
            src,
            contanier,
            clientHeight,
            linearGradient
        }
    }
})
</script>

<template>
    <div
        ref="contanier"
        class="video-wrap"
        :style="{ background: linearGradient }"
    >
        <video
            loop
            muted
            autoplay
            :src="src"
            :style="{ height: `${clientHeight}px` }"
        ></video>
        <slot></slot>
    </div>
</template>


<style scoped lang="less">
.video-wrap {
    width: 100%;
    height: auto;
    position: relative;
    video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -999;
        object-fit: cover;
    }
}
</style> -->


<script lang="ts">
import { ref, onMounted, defineComponent, PropType } from 'vue'
import { VideoMaskType, VideoMaskEnum, APP_ID } from '@/model'
export default defineComponent({
    props: {
        src: String,
        mask: Object as PropType<VideoMaskEnum>
    },
    setup(props) {
        const { src, mask } = props

        const clientHeight = ref(0)
        const contanier = ref<any>(null)
        const linearGradient = VideoMaskType[mask!]

        const onResize = () => {
            const app = document.querySelector(APP_ID)!
            const resizeObserver = new ResizeObserver(() => {
                clientHeight.value = contanier.value.clientHeight
            })
            resizeObserver.observe(app)
        }

        onMounted(() => onResize())

        return {
            src,
            contanier,
            clientHeight,
            linearGradient
        }
    }
})
</script>

<template>
    <div class="video-background" :style="{ background: linearGradient }">
        <video autoplay loop muted playsinline class="video-element" :src="src">
            <!-- <source src="path-to-your-video.mp4" type="video/mp4" /> -->
            <!-- 提供其他视频格式以便跨浏览器兼容性 -->
            <!-- <source src="path-to-your-video.webm" type="video/webm"> -->
            Your browser does not support the video tag.
        </video>
        <!-- 页面其他内容 -->
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

  <style>
.video-background {
    position: relative;
    overflow: hidden;
}
.video-element {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
    z-index: -1;
    pointer-events: none; /* 防止视频被点击 */
}
.content {
    position: relative;
    z-index: 1;
    /* 在这里添加你的样式 */
}
</style>