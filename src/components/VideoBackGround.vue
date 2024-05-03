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
</style>
