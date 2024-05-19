<script lang="ts">
import { ref, defineComponent, PropType, inject } from 'vue'
import { VideoMaskType, VideoMaskEnum } from '@/model'
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
        const isPlay = ref(true)
        const audio = useAudioStatus()
        const videoRef = ref(null)
        const audioRef = ref(null)
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
            audioRef,
            eventBus,
            audio,
            isPlay
        }
    },
    methods: {
        handleEnded() {
            if (!this.audio.status) {
                this.audioRef?.pause()
                return
            }
            // 当视频播放结束时，将当前播放时间设置为 0，回到第一帧
            this.audioRef?.play()
        },
        handlePlay(page, isReload = true) {
            if (!isReload) {
                if (this.audio.status && this.isPlay && page === this.type) {
                    this.audioRef.currentTime = this.videoRef.currentTime
                    this.audioRef?.play()
                } else {
                    this.audioRef?.pause()
                }
                return
            }
            if (page === this.type) {
                this.videoRef.currentTime = 0
                this.isPlay = true
                this.videoRef.play()
                if (!this.audio.status) return
                this.audioRef.currentTime = 0
                this.audioRef.play()
            } else {
                this.videoRef.pause()
                this.audioRef.pause()
                this.isPlay = false
            }
        },
        handleVideoEnd() {
            this.videoRef.currentTime = 0
            this.isPlay = false
        }
    },
    mounted() {
        this.eventBus.on('pageChange', (page, isReload = true) => {
            this.handlePlay(page, isReload)
        })
        this.videoRef.addEventListener('ended', () => {
            this.handleVideoEnd()
        })
        this.audioRef.addEventListener('ended', () => {
            // 当视频播放结束时，将当前播放时间设置为 0，回到第一帧
            this.audioRef.currentTime = 0
        })
        // 当进入全屏时触发的事件
        this.videoRef.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                // 如果进入全屏，则退出全屏
                document.exitFullscreen()
            }
        })
    }
})
</script>

<template>
    <div class="video-background" :style="{ background: linearGradient }">
        <video
            autoplay
            muted
            playsinline
            webkit-playsinline
            ref="videoRef"
            x5-video-player-type="h5"
            class="video-element"
            :poster="image"
            :src="src"
        >
            <source :src="src" type="video/mp4" />
            <!-- <source :src="image" type="video/mp4" /> -->
            <!-- 提供其他视频格式以便跨浏览器兼容性 -->
            <!-- <source src="path-to-your-video.webm" type="video/webm"> -->
            Your browser does not support the video tag.
        </video>
        <audio
            ref="audioRef"
            style="
                width: 0;
                height: 0;
                overflow: hidden;
                visibility: hidden;
                opacity: 0;
            "
            controls
        >
            <source :src="src" type="video/mp4" />
            Your browser does not support the audio tag.
        </audio>
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