<template>
  <div class="actionsheet">
    <van-action-sheet
      v-model="isShow"
      :closeable="false"
      :overlay="false"
      :lock-scroll="false"
      class="tipbox"
    >
      <div class="content">
        <div class="tip">
          <div class="bg">
            <van-icon class="closev cursor" name="cross" @click="hide" />
            <div class="txt">
              1.{{ $t('clickToolbar') }}
              <van-icon name="share" />
              <van-icon name="star-o" />
            </div>
            <div class="txt">2.{{ $t('selectAddDesktop') }}</div>
          </div>
          <div class="playBox">
            <van-icon name="play" class="rotate" />
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: 'LoginPop',
  components: {},
  data() {
    return {
      closeIcon: true,
      userName: '',
      password: '',
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  .tip {
    width: 184px;
    height: 80px;
    .bg {
      background: rgba(227, 227, 227, 0.9);
      padding: 10px;
      border-radius: 4px;
      position: relative;
      .closev {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 2;
        color: #7d7e82;
      }
    }
    .txt {
      padding-bottom: 10px;
    }
  }
}
.tipbox {
  background-color: transparent;
  border-radius: 0;
}

.playBox {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rotate {
  transform: rotate(90deg);
  color: rgba(227, 227, 227, 0.9);
  position: relative;
  top: -6px;
}
</style>
