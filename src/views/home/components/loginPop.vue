<template>
  <div class="actionsheet">
    <van-action-sheet v-model="isShow" :closeable="false">
      <div class="content">
        <div class="close">
          <div class="line"></div>
        </div>
        <van-image
          class="img"
          width="106px"
          height="36px"
          :src="require(`@/assets/images/home/logo_minB.png`)"
        />

        <div class="txt">欢迎登录七星娱乐</div>

        <div class="inputBox">
          <input v-model.trim="userName" type="text" />
          <van-icon name="clear" />
        </div>

        <div class="inputBox">
          <input v-model.trim="password" type="password" />
          <van-icon name="clear" />
        </div>
        <!--  -->
        <div class="checkedBox">
          <!-- br -->
          <div class="noChecked br">
            <!-- <van-icon name="checked" /> -->
          </div>
          记住密码
        </div>
        <div class="btn">
          <van-button class="button" type="primary" block>登录</van-button>
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
      userName: '',
      password: '',
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.close {
  display: flex;
  justify-content: center;
  align-items: center;
  .line {
    width: 44px;
    height: 4px;
    background: #e8e8e8;
    border-radius: 2px;
    margin: 10px 0;
  }
}
.img {
  margin: 10px 0 0 30px;
}
.txt {
  font-size: 24px;
  color: #222222;
  font-weight: 600;
  padding-left: 30px;
  margin: 20px 0;
}
.inputBox {
  height: 45px;
  margin: 10px 30px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  position: relative;
  .van-icon {
    position: absolute;
    top: 15px;
    right: 2px;
    font-size: 16px;
    color: rgba(34, 34, 34, 0.1);
  }
  input {
    border: 0;
    width: 100%;
    height: 100%;
  }
}
.checkedBox {
  display: flex;
  padding: 20px 30px 30px;
  align-items: center;
  color: rgba(34, 34, 34, 0.7);
  font-size: 12px;
  .noChecked {
    margin-right: 5px;
    width: 12px;
    height: 12px;
    border-radius: 100%;

    &.br {
      border: 1px solid #999;
    }
  }
}

.btn {
  padding: 0 30px 50px;

  .button {
    background: #006fd6;
    border-color: #006fd6;
    border-radius: 50px;
  }
}
</style>
