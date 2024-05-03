<template>
  <div class="video">
    <video
      autoplay="autoplay"
      loop="loop"
      muted
      class="start-img video"
      :poster="require('@/assets/images/start/pc/video_bg.jpg')"
    >
      <source
        :src="require('@/assets/images/start/video/video2-2.mp4')"
        type="video/mp4"
      />
      {{ $t('notSupportVideo') }}
    </video>
  </div>
</template>

<script>
export default {
  name: 'LotteryVideo',
  data() {
    return {}
  },
  // created() {},
  methods: {
    //
  }
}
</script>

<style lang="less" scoped></style>
