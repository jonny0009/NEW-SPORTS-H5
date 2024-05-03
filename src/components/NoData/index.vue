<template>
  <div class="no-data">
    <slot name="no-data-top">
      <div class="no-data-img">
        <span class="icon-noAvailable_Flag"></span>
      </div>
    </slot>
    <div class="no-data-tips">
      {{ tips }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    tips: {
      type: String,
      default: window.i18n.t('common.tips.noDada')
    }
  }
}
</script>

<style lang="less" scoped>
.no-data {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 56px 0 22px 0;
  .no-data-img {
    .icon-noAvailable_Flag {
      font-size: 113px;
    }
    border: 1px solid #b4b4b4;
    border-radius: 50%;
    margin-bottom: 20px;
  }
}
</style>
