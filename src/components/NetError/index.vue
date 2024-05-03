<template>
  <div class="net-error">
    <div class="net-error-img"></div>
    <p>{{ tips }}</p>
    <button class="cursor" @click="refresh">{{ $t('common.refresh') }}</button>
  </div>
</template>

<script>
export default {
  name: 'NetError',
  props: {
    tips: {
      type: String,
      default: function () {
        return this.$t('common.tips.netErr')
      }
    }
  },
  methods: {
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="less" scoped>
.net-error {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .net-error-img {
    width: 100px;
    height: 110px;
    background: url('../../assets/images/common/ico_noweb_default.svg')
      no-repeat;
    background-size: 100%;
  }
  > p {
    padding: 20px 0;
    color: #999;
  }
  > button {
    width: 110px;
    height: 36px;
    color: #666;
    border-radius: 4px;
    border: 1px #9a9696 solid;
    background: transparent;
    position: relative;
    &:active {
      opacity: 0.8;
      top: 1px;
    }
  }
}
</style>
