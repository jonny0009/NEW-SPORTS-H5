<template>
  <div v-if="lang" class="video">
    <video
      autoplay="autoplay"
      loop="loop"
      muted
      class="start-img video"
      :poster="require('@/assets/images/start/pc/video_bg.jpg')"
    >
      <source
        v-if="langZhShow"
        :src="require('@/assets/images/start/video/video2-0.mp4')"
        type="video/mp4"
      />
      <source
        v-else
        :src="require('@/assets/images/start/video/noWord/pc.mp4')"
        type="video/mp4"
      />
      {{ $t('notSupportVideo') }}
    </video>
  </div>
</template>

<script>
//
import { getLang } from '@/i18n/index'
//
export default {
  name: 'SportsVideo',
  data() {
    return {
      lang: '',
      langZhShow: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mountedUpdata()
    })
  },
  methods: {
    mountedUpdata() {
      const lang = getLang()
      const lanToggle = ['zh-cn', 'zh-tw'].includes(lang)
      this.langZhShow = lanToggle
      this.lang = lang
    }
  }
}
</script>

<style lang="less" scoped>
.start-img {
  object-fit: fill;
}
</style>
