<template>
  <div
    ref="loginpage"
    class="login-view"
    :style="{
      backgroundImage: 'url(' + imgsrc2 + ')'
    }"
  >
    <div class="login-form">
      <div class="login-user">
        <input
          v-model.trim="userName"
          type="text"
          :placeholder="$psi18n.t('common.login.accountName')"
        />
      </div>
      <div class="login-pwd">
        <input
          v-model.trim="password"
          type="password"
          :placeholder="$psi18n.t('common.login.pwd')"
        />
      </div>
      <div class="cursor" :class="['login-btn', isActive]" @click="loginHandle">
        {{ $psi18n.t('common.login.login') }}
      </div>
      <div v-if="merchantAllow" class="try-play cursor" @click="handleLogin">
        {{ $psi18n.t('common.login.tryItOut') }}
      </div>
    </div>
    <van-popup v-model="showLoding" :close-on-click-overlay="false">
      <div class="loading-box">
        <div class="loading-img">
          <img :src="loadingGif" alt="" />
        </div>
        <div>{{ $psi18n.t('common.login.loading') }}...</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import imgsrc2 from '@/assets/images/login/bg.png'
import loadingGif from '@/assets/images/login/loading.gif'
import { login } from '@/api/login'
import { Toast, Popup } from 'vant'
import md5 from 'md5'
export default {
  components: {
    'van-popup': Popup
  },
  data() {
    return {
      isNode: true,
      imgsrc2,
      loadingGif,
      userName: '',
      password: '',
      showLoding: false
    }
  },
  computed: {
    ...mapGetters({
      businessConfig: 'app/businessConfig'
    }),
    ...mapState('app', ['merchantConfigDetail']),
    isActive() {
      if (this.userName && this.password) {
        return 'active'
      }
      return ''
    },
    merchantAllow() {
      return this.merchantConfigDetail.merchantIdTest
    }
  },
  methods: {
    async loginHandle() {
      if (this.valid() && !this.showLoding) {
        const params = {
          merchantId: '038f3e1d118e41c9a248f045701a37b4',
          loginName: this.userName,
          passWord: md5(encodeURI(this.password))
        }
        try {
          this.showLoding = true
          const res = await login(params)
          if (res.code === 200 && res.data) {
            this.$store.commit('user/SET_TOKEN', res.data)

            await this.$bootstrap()
            this.$router.push({ name: 'Home' })
          } else {
            Toast(this.$psi18n.t('common.login.accountOrPwdErr'))
          }
          this.showLoding = false
        } catch {
          this.showLoding = false
          Toast(this.$psi18n.t('common.login.networkTimeout'))
        }
      }
    },
    valid() {
      if (!this.userName) {
        Toast(this.$psi18n.t('common.login.pleaseFillInTheAccountName'))
        return false
      }
      if (!this.password) {
        Toast(this.$psi18n.t('common.login.pleaseFillInThePassword'))
        return false
      }
      if (this.userName.indexOf(' ') > -1) {
        Toast(this.$t(this.$psi18n.t('common.login.accountNameContainsSpaces')))
        return false
      }
      return true
    },
    async handleLogin() {
      if (this.showLoding) {
        return
      }
      this.showLoding = true
      try {
        const res = {}
        const { token } = res.data || {}
        if (token) {
          this.$store.commit('user/SET_TOKEN', token)

          await this.$bootstrap()``
          this.$router.push({ name: 'Home' })
        }
        this.showLoding = false
      } catch (e) {
        this.showLoding = false
        Toast(this.$psi18n.t('common.login.networkTimeout'))
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-view {
  position: relative;
  text-align: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-width: 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 100%;
  background-color: #121b32;
  .view-box {
    z-index: 999;
    width: 100%;
    height: 100%;
    position: absolute;
    text-align: center;
    padding-top: 80px;
    .ret-iocn {
      font-size: 17px;
      left: 17px;
      top: 17px;
      position: absolute;
    }
    .logo {
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #ffffff;
      letter-spacing: 0.46px;
      padding: 30px;
    }
    .login-container {
      z-index: 99;
      margin-bottom: 40px;
      padding: 0 30px;
      width: 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
      background-size: 100%;
    }
    .more {
      padding-top: 30px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0.27px;
      line-height: 20px;
    }
  }

  .login-form {
    padding: 0 47px;
    margin-top: 188px;
    .login-user,
    .login-pwd {
      width: 100%;
      height: 43px;
      border-radius: 7px;
      padding: 7px 11px;
      background: rgba(255, 255, 255, 0.1);
      input {
        width: 100%;
        height: 100%;
        outline: none;
        background: none;
        font-size: 16px;
        color: #ffffff;
        border: none;
        font-weight: 600;
      }
      input::placeholder {
        color: #7b7b7a;
      }
    }
    .login-user {
      margin-bottom: 10px;
    }
    .login-pwd {
      margin-bottom: 65px;
    }
    .login-btn {
      width: 100%;
      height: 46px;
      background: rgba(132, 183, 82, 0.6);
      border-radius: 4px;
      font-size: 16px;
      color: #000;
      letter-spacing: 0.31px;
      font-weight: 600;
      line-height: 46px;
      text-align: center;
      margin-bottom: 20px;
      &.active {
        background: #84b752;
      }
    }
    .try-play {
      width: 80px;
      font-size: 14px;
      color: #999999;
      letter-spacing: 0.27px;
      line-height: 22px;
      font-weight: 600;
      text-align: right;
      float: right;
    }
  }
}
.login-view /deep/ .van-popup .loading-box {
  width: 108px;
  height: 108px;
  border-radius: 8px;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .loading-img {
    width: 46px;
    height: 46px;
    margin-bottom: 13px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.login-view /deep/ .van-popup {
  top: 43%;
  background: none;
}
.login-view /deep/ .van-overlay {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
