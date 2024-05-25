<script lang="ts">
import { ref, defineComponent, PropType, inject } from "vue";
import {
  VideoMaskType,
  VideoMaskEnum,
  MultipleLangFileNameEunm,
} from "@/model";
import { useAudioStatus } from "@/store";
export default defineComponent({
  props: {
    src: String,
    videoSrc: String,
    image: String,
    type: String,
    mask: Object as PropType<VideoMaskEnum>,
  },
  setup(props) {
    const { src, image, mask, type, videoSrc } = props;

    const clientHeight = ref(0);
    const audio = useAudioStatus();
    const videoRef = ref(null);
    const timer = ref(0);
    const timerId = ref(0);
    const duration = ref(0);
    const audioRef = ref(null);
    const isPlay = ref<any>(false);
    const linearGradient = VideoMaskType[mask!];
    const eventBus = inject("eventBus");

    const startTimer = () => {
      timer.value = 0
      isPlay.value = true
      clearInterval(timerId.value)
      timerId.value = setInterval(() => {
        timer.value += 30
        if (timer.value >= duration.value) {
          isPlay.value = false
          clearInterval(timerId.value)
        }
      }, 30)
    }

    const cancelTimer = () => {
      isPlay.value = false
      clearInterval(timerId.value)
    }

    return {
      src,
      image,
      type,
      isPlay,
      clientHeight,
      linearGradient,
      videoRef,
      eventBus,
      audio,
      audioRef,
      timer,
      timerId,
      duration,
      videoSrc,
      startTimer,
      cancelTimer
    };
  },
  methods: {
    handlePlay(page, isReload = true) {
      if (!isReload) {
        if (this.audio.status && this.isPlay && page === this.type) {
          console.log('handlePlay', this.timer)
          this.audioRef.currentTime = this.timer / 1000;
          this.audioRef?.play();
        } else {
          this.audioRef?.pause();
        }
        return;
      }
      if (page === this.type) {
        this.startTimer()
        if (!this.audio.status) return;
        this.audioRef.currentTime = 0;
        this.audioRef.play();
      } else {
        this.cancelTimer()
        this.audioRef.pause();
      }
    },
    handleVideoEnd() {
      this.audioRef.currentTime = 0;
      this.audioRef?.pause();
      this.cancelTimer()
    },
    handleInit() {
      this.duration = this.audioRef.duration * 1000
      if (this.type === MultipleLangFileNameEunm.Logo) {
        this.startTimer()
      }
      console.log(this.duration)
    }
  },
  mounted() {
    this.eventBus.on("pageChange", (page, isReload = true) => {
      this.handlePlay(page, isReload);
    });
    this.audioRef.addEventListener("ended", () => {
        this.handleVideoEnd()
    });
    this.audioRef.addEventListener('loadedmetadata', () => {
        this.handleInit()
      });
  },
});
</script>

<template>
  <div class="video-background" :style="{ background: linearGradient }">
    <img v-if="isPlay" ref="videoRef" class="video-element" :src="src" />
    <img v-show="!isPlay" class="video-element img" :src="image" />
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
      <source :src="videoSrc" type="video/mp4" />
      Your browser does not support the audio tag.
    </audio>
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none; /* 防止视频被点击 */
  object-fit: cover;
  scroll-behavior: smooth;
  .img {
    z-index: -2;
  }
}

.content {
  position: relative;
  z-index: 1;
  /* 在这里添加你的样式 */
}
</style>