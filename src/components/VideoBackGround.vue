<script lang="ts">
import { ref, defineComponent, PropType } from 'vue'
import { VideoMaskType, VideoMaskEnum } from '@/model'
export default defineComponent({
    props: {
        src: String,
        image: String,
        mask: Object as PropType<VideoMaskEnum>
    },
    setup(props) {
        const { src, image, mask } = props

        const clientHeight = ref(0)
        const contanier = ref<any>(null)
        const linearGradient = VideoMaskType[mask!]

        return {
            src,
            image,
            contanier,
            clientHeight,
            linearGradient
        }
    }
})
</script>

<template>
    <div class="video-background" :style="{ background: linearGradient }">
        <video
            autoplay
            loop
            muted
            playsinline
            class="video-element"
            :poster="image"
            :src="src"
        >
            <!-- <source :src="image" type="video/mp4" /> -->
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