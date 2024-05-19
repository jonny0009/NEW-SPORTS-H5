<script lang="ts">
import { ref, defineComponent, PropType, inject } from 'vue'
import { VideoMaskType, VideoMaskEnum, MultipleLangFileNameEunm } from '@/model'
import { useAudioStatus } from '@/store'
export default defineComponent({
    props: {
        src: String,
        image: String,
        type: String,
        mask: Object as PropType<VideoMaskEnum>
    },
    setup(props) {
        const { src, image, mask, type } = props

        const clientHeight = ref(0)
        const audio = useAudioStatus()
        const videoRef = ref(null)
        const contanier = ref<any>(null)
        const linearGradient = VideoMaskType[mask!]
        const eventBus = inject('eventBus')

        return {
            src,
            image,
            type,
            contanier,
            clientHeight,
            linearGradient,
            videoRef,
            eventBus,
            audio
        }
    },
    methods: {
        handlePlay(page, isReload = true) {
            if (!isReload) {
                this.videoRef.muted = !this.audio.status
                return
            }
            if (page === this.type) {
                this.videoRef.currentTime = 0
                this.videoRef.play()
            } else {
                this.videoRef.pause()
            }
        },
        handleVideoEnd() {
            this.videoRef.currentTime = 0
            this.videoRef.poster = this.image
        }
    },
    mounted() {
        this.videoRef.muted = !this.audio.status
        this.videoRef.currentTime = 0
        this.videoRef.removeAttribute('controls')

        if (this.type === MultipleLangFileNameEunm.Logo) {
            this.videoRef.play()
        }
        this.eventBus.on('pageChange', (page, isReload = true) => {
            this.handlePlay(page, isReload)
        })
        this.videoRef.addEventListener('ended', () => {
            this.handleVideoEnd()
        })
    }
})
</script>

<template>
    <div class="video-background" :style="{ background: linearGradient }">
        <video
            :id="`${type}_player`"
            playsinline
            preload="auto"
            webkit-playsinline
            x5-playsinline
            disablepictureinpicture
            disableremoteplayback
            ref="videoRef"
            x5-video-player-type="h5"
            class="video-element"
            :poster="image"
            :src="src"
        >
            <source :src="src" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <!-- 页面其他内容 -->
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

  <style lang="less">
.video-background {
    position: relative;
    overflow: hidden;
}
.video-element {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    min-width: 100% !important;
    min-height: 100% !important;
    width: auto !important;
    height: auto !important;
    transform: translate(-50%, -50%) !important;
    z-index: -1 !important;
    pointer-events: none !important; /* 防止视频被点击 */
    object-fit: cover !important;
    scroll-behavior: smooth !important;
}

.content {
    position: relative;
    z-index: 1;
    /* 在这里添加你的样式 */
}
</style>