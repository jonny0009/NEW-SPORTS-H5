<template>
  <div
    id="app"
    class="appBox"
    :class="[
      { [routeName]: true },
      { is98: isRouteName98 || isRouteNameOG },
      { is7: !isRouteName98 }
    ]"
  >
    <!--
        head
      -->
    <div class="start-head">
      <van-sticky>
        <div class="start-head-main">
          <div class="start-head-left">
            <!--  -->
            <template v-if="!appActive">
              <img
                class="ml10 img mr20"
                :src="require('@/assets/images/live/logo.png')"
                @click="goHome"
              />
            </template>
            <div
              v-else
              class="start-app mr20"
              @click="goGameClick({ value: 'appHome' })"
            >
              {{ $t('appHome') }}
            </div>
            <!--  -->
            <div class="start-tabbar">
              <div
                v-for="(item, idx) in headList"
                v-show="
                  item.value !== 'BusinessCooperation' ||
                  (item.value === 'BusinessCooperation' && !isPc)
                "
                :key="idx"
                class="start-tabbar-item"
                :class="{
                  active: appActive === item.value
                }"
                @click="goGameClick(item)"
              >
                {{ item.text }}
              </div>
            </div>
          </div>
          <div id="appLanguage1" class="start-language appLanguage">
            <van-popover
              v-model="showPopover"
              trigger="click"
              get-container="#appLanguage1"
              :placement="isPc ? 'bottom' : 'bottom-end'"
            >
              <ul>
                <li
                  v-for="(item, idx) in languageList"
                  :key="idx"
                  :class="{
                    active: lan === item.id
                  }"
                  @click="clickLi(item)"
                >
                  <van-image
                    width="16"
                    height="16"
                    class="mr10"
                    :round="true"
                    :src="
                      require(`@/assets/images/home/language/${item.id}.svg`)
                    "
                  />
                  {{ item.text }}
                </li>
              </ul>
              <template #reference>
                <div class="start-language-reference">
                  <van-image
                    width="16"
                    height="16"
                    class="mr5"
                    round
                    :src="require(`@/assets/images/home/language/${lan}.svg`)"
                  />
                  <span :key="lan" class="text">
                    {{ lan | lanFil }}
                  </span>
                  <van-icon
                    class="start-play"
                    :class="{ open: showPopover }"
                    name="play"
                  />
                </div>
              </template>
            </van-popover>
          </div>
        </div>
      </van-sticky>
    </div>
    <!--
        end head
      -->
    <div v-if="!merchantConfigDetailLoading" class="appBox_loading">
      <div class="Preloader">
        <div class="Preloader_content">
          <div class="Preloader_Spinner"></div>
        </div>
      </div>
    </div>
    <div class="appBox_mian">
      <router-view />
    </div>
  </div>
</template>

<script>
//
import { Toast } from 'vant'
import { mapState, mapMutations } from 'vuex'
import { getLang, setLanguage } from '@/i18n/index'
import localStore from '@/utils/localStore'
import Fingerprint2 from 'fingerprintjs2'
import aesUtil from '@/utils/aesUtil' //
import { initI18n } from '@/i18n/index'
import { setToken } from '@/utils/auth'
import { changeUrlParams } from '@/utils/changeUrlParams'
//
import { getGameUrl } from '@/api/common'
import { loginTemp } from '@/api/login'
//
export default {
  filters: {
    lanFil(val) {
      const obj = {
        'zh-cn': '简体中文',
        'zh-tw': '繁体中文',
        'en-us': 'English',
        'ko-kr': '한국인',
        'th-th': 'ไทย',
        'vi-vn': 'Tiếng Việt',
        'pt-pt': 'Português'
      }
      return obj[val] || val
    }
  },
  data() {
    return {
      appActive: null,
      loginTempLoading: false,
      showPopover: false,
      lan: 'zh-cn',
      languageList: []
    }
  },
  computed: {
    ...mapState('app', [
      'businessConfig',
      'Fingerprint2Time',
      'businessConfigLoading',
      'merchantConfigDetail',
      'merchantConfigDetailLoading',
      'isPc',
      'accessLanguage',
      'translate'
    ]),
    ...mapState('user', ['reRegister', 'token']),

    headList() {
      return [
        {
          text: initI18n().t('sports'),
          title: initI18n().t('sevenLuckySports'),
          title98: initI18n().t('sports98'),
          titleOG: initI18n().t('sportsOG'),
          subTitle: initI18n().t('testSports'),
          value: 'Sports'
        },
        {
          text: initI18n().t('baccarat'),
          title: initI18n().t('sevenLuckyBaccarat'),
          title98: initI18n().t('baccarat98'),
          titleOG: initI18n().t('baccaratOG'),
          subTitle: initI18n().t('testbaccarat'),
          value: 'BAC-V2.0'
        }
        // {
        //   text: initI18n().t('lottery'),
        //   title: initI18n().t('sevenLuckyLottery'),
        //   title98: initI18n().t('lottery98'),
        //   titleOG: initI18n().t('lotteryOG'),
        //   subTitle: initI18n().t('testlottery'),
        //   value: 'AD-LOTTERY'
        // },
        // {
        //   text: initI18n().t('businessCooperation'),
        //   title: '',
        //   subTitle: '',
        //   value: 'BusinessCooperation'
        // }
      ]
    },
    routeName() {
      return this.$route.name
    },
    brandType() {
      return this.merchantConfigDetail.brandType || 1
    },
    isRouteName98() {
      return this.brandType * 1 === 2
    },
    isRouteNameOG() {
      return this.brandType * 1 === 3
    },
    isSharpSports() {
      return this.brandType * 1 === 4
    },
    gameName() {
      let text = initI18n().t('sevenStars')
      if (this.isRouteName98) {
        text = '98'
      } else if (this.isRouteNameOG) {
        text = 'OG'
      } else if (this.isSharpSports) {
        text = 'SharpSports'
      }
      return text
    },
    queryToken() {
      return this.$route.query.token
    },
    queryLang() {
      return this.$route.query.lang
    }
  },
  watch: {
    merchantConfigDetail(val) {
      if (val) {
        this.mountedAppGetData()
      }
    },
    businessConfig(val) {
      if (val) {
        this.Fingerprint2()
      }
    },
    // 登录失效重新登录
    reRegister(val) {
      if (val && this.businessConfig.loginKey) {
        this.Fingerprint2()
      }
    },
    Fingerprint2Time(val) {
      if (val) {
        this.initData()
      }
    },
    routeName(val) {
      if (val === 'BusinessCooperation') {
        this.appActive = 'BusinessCooperation'
      } else {
        this.appActive = null
      }
    },
    accessLanguage(val) {
      if (val) {
        this.startLan()
      }
    },
    queryLang(val) {
      if (val) {
        this.lan = val
      }
    }
  },
  mounted() {
    this.mountedAppGetData()
    this.lan = getLang()
    if (this.routeName === 'BusinessCooperation') {
      this.appActive = 'BusinessCooperation'
    } else {
      this.appActive = null
    }
    if (this.accessLanguage && this.accessLanguage.length) {
      this.startLan()
    }
    setTimeout(() => {
      this.lan = getLang()
    }, 1000)
  },
  created() {
    setToken('')
    localStorage.removeItem('token')
  },
  methods: {
    //
    ...mapMutations('app', ['setKeyValue']),

    async startLan() {
      const arr = this.accessLanguage.map(e => {
        const obj = this.translate[e.key]
        return {
          text: obj[e.key],
          id: e.key
        }
      })
      this.languageList = arr
      let lan = getLang()
      const queryLang = this.queryLang
      let find = arr.find(e => e.id === lan)

      if (queryLang) {
        if (queryLang !== lan) {
          lan = queryLang
          find = arr.find(e => e.id === lan)
          if (find) {
            const id = queryLang
            this.lan = id
            this.$nextTick(async () => {
              await localStore.setItem('appLanguage', id)
              await setLanguage(id)
              await this.setKeyValue({
                key: 'changeLan',
                value: id
              })
            })
          }
        }
      }
      if (!find) {
        this.$nextTick(async () => {
          const id = arr[0].id
          this.lan = id
          await localStore.setItem('appLanguage', id)
          await setLanguage(id)
          await this.setKeyValue({
            key: 'changeLan',
            value: id
          })
          if (queryLang) {
            Toast(this.$t('updateLanguage'))
            window.location.href = changeUrlParams(
              window.location.href,
              'lang',
              id
            )
          }
        })
      }

      await this.$nextTick(() => {
        if (this.queryToken) {
          // setToken(this.queryToken)
        }
        this.lan = getLang()
      })
    },
    //
    async clickLi(item) {
      if (item.id === this.lan) {
        return
      }
      this.lan = item.id
      await localStore.setItem('appLanguage', item.id)
      await setLanguage(this.lan)
      await this.setKeyValue({
        key: 'changeLan',
        value: item.id
      })
      await this.$nextTick(() => {
        if (this.queryLang) {
          window.location.href = window.location.href.replace('lang=', 'null=')
        } else {
          location.reload()
        }
      })
    },
    //
    goHome() {
      this.$router.push({
        name: 'start'
      })
    },

    //
    mountedAppGetData() {
      if (this.merchantConfigDetail.merchantId) {
        const title = this.gameName + this.$t('recreation')
        document.title = 'LiveSports'

        // if (this.isRouteName98) {
        //   this.changeFavicon(
        //     `/start/98logo.png`,
        //     title,
        //     'manifest98.webmanifest'
        //   )
        // } else if (this.isRouteNameOG) {
        //   this.changeFavicon(
        //     `/start/OGlogo.jpg?t=${new Date().getTime()}`,
        //     title,
        //     'manifestOG.webmanifest'
        //   )
        // } else if (this.isSharpSports) {
        //   this.changeFavicon(
        //     `/start/SharpSportslogo.png?t=${new Date().getTime()}`,
        //     title,
        //     'manifestOG.webmanifest'
        //   )
        // } else {
        //   this.changeFavicon(`/start/logo.png`, title, 'manifest.webmanifest')
        // }
        this.changeFavicon(`/start/LS.png`, title, 'manifest.webmanifest')
      }
    },
    changeFavicon(link, title, manifest) {
      let $favicon = document.querySelector('link[rel="icon"]')

      //
      const newLink = `/start/LS.png` + '?t=' + new Date().getTime()
      const newManifest = manifest + '?t=' + new Date().getTime()
      //
      if ($favicon !== null) {
        $favicon.href = newLink
      } else {
        $favicon = document.createElement('link')
        $favicon.rel = 'icon'
        $favicon.href = newLink
        document.head.appendChild($favicon)
      }
      //
      //
      let $faviconA = document.querySelector(
        'link[rel="apple-touch-icon-precomposed"]'
      )
      if ($faviconA !== null) {
        $faviconA.href = newLink
      } else {
        $faviconA = document.createElement('link')
        $faviconA.rel = 'apple-touch-icon-precomposed'
        $faviconA.href = newLink
        document.head.appendChild($faviconA)
      }

      //
      //
      let $faviconB = document.querySelector(
        'meta[name="msapplication-TileImage"]'
      )
      if ($faviconB !== null) {
        $faviconB.href = newLink
        $faviconB.content = newLink
      } else {
        $faviconB = document.createElement('meta')
        $faviconB.name = 'msapplication-TileImage'
        $faviconB.content = newLink
        $faviconB.href = newLink
        document.head.appendChild($faviconB)
      }
      //
      let $faviconC = document.querySelector(
        'link[rel="msapplication-TileImage"]'
      )
      if ($faviconC !== null) {
        $faviconC.href = newLink
      } else {
        $faviconC = document.createElement('link')
        $faviconC.rel = 'msapplication-TileImage'
        $faviconC.href = newLink
        document.head.appendChild($faviconC)
      }
      //
      //
      let $faviconD = document.querySelector(
        'meta[name="apple-mobile-web-app-title"]'
      )
      if ($faviconD !== null) {
        $faviconD.content = title
      } else {
        $faviconD = document.createElement('meta')
        $faviconD.name = 'apple-mobile-web-app-title'
        $faviconD.content = title
        document.head.appendChild($faviconD)
      }
      //
      //
      let $faviconE = document.querySelector('rel[name="manifest"]')
      if ($faviconE !== null) {
        $faviconE.href = newManifest
      } else {
        $faviconE = document.createElement('link')
        $faviconE.rel = 'manifest'
        $faviconE.href = newManifest
        document.head.appendChild($faviconE)
      }
      //
      //
    },

    async Fingerprint2() {
      // 浏览器指纹
      await Fingerprint2.get(components => {
        // 参数只有回调函数或者options为{}时，默认浏览器指纹依据所有配置信息进行生成
        const values = components.map(component => component.value) // 配置的值的数组
        const murmur = Fingerprint2.x64hash128(values.join(''), 31) // 生成浏览器指纹

        localStore.setItem('appFingerprint', murmur)
        if (!this.token) {
          this.setKeyValue({
            key: 'Fingerprint2Time',
            value: new Date().getTime()
          })
        }
      })
      // end 浏览器指纹
    },
    async initData() {
      //
      await this.$nextTick()
      const keyStr = this.businessConfig.loginKey
      const rDecrypt = await localStore.getItem('appFingerprint')
      if (!rDecrypt) {
        return
      }
      const aDecrypt = aesUtil.encrypt(rDecrypt, keyStr)
      const params = {
        loginTempName: aDecrypt
      }
      if (this.token) {
        return
      }
      if (this.loginTempLoading) {
        return
      }
      this.loginTempLoading = true
      const Toastr = Toast.loading({
        message: this.$t('loading'),
        forbidClick: true
      })

      // const res = await loginTemp(params)

      Toastr.clear()
      this.loginTempLoading = false
      // const { token } = res.data || {}
      // this.$store.commit('user/SET_TOKEN', token)

      //
    },
    //
    async goGameClick(val) {
      const { value } = val
      const lang = getLang()
      const gameKey = value
      let url
      this.appActive = null
      this.token = ''
      if (gameKey === 'Sports') {
        if (window.location.href.indexOf('yuansports2.com') > -1) {
          url =
            'https://play.yuansports2.com/home' +
            '?token=' +
            `&lang=${lang}&brandType=${this.brandType}&theme=blue`
        } else {
          url =
            window.origin +
            '/home?token=' +
            `&lang=${lang}&brandType=${this.brandType}&theme=blue`
        }

        window.open(url)
      } else if (gameKey === 'BusinessCooperation') {
        this.$router.push({
          name: 'BusinessCooperation'
        })
        this.appActive = 'BusinessCooperation'
      } else if (gameKey === 'appHome') {
        this.$router.push({
          name: 'start'
        })
      } else if (gameKey === 'BAC-V2.0') {
        if (window.location.href.indexOf('yuansports2.com') > -1) {
          url =
            'https://play.yuansports2.com/home' +
            '?token=' +
            `&lang=${lang}&brandType=${this.brandType}&theme=blue`
        } else {
          url =
            window.origin +
            '/casino?token=' +
            `&lang=${lang}&brandType=${this.brandType}&theme=blue`
        }

        window.open(url)
        // const params = {
        //   supplierId: 'aigame',
        //   openType: 2,
        //   dirType: 1,
        //   gameKey
        // }
        // const gres = await getGameUrl(params)
        // const { code } = gres
        // if (code === 200) {
        //   const gameUrl = gres.data['url'].replace('&isAi=1', '')
        //   window.location.href =
        //     gameUrl +
        //     '&source=7lucky&brandType=' +
        //     this.brandType +
        //     '&sourceUrl=' +
        //     encodeURIComponent(window.location.host)
        // }
      } else {
        url =
          window.origin +
          '/bjgame?token=' +
          this.token +
          '&supplierId=aigame' +
          '&gameKey=' +
          gameKey +
          `&lang=${lang}&brandType=${this.brandType}`
        window.open(url)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.appBox {
  min-height: calc(100vh);
  position: relative;
  &.home {
    .appBox_mian {
      max-width: 500px;
      margin: 0 auto;
      background: #fff;
      position: relative;
    }
    .start-head {
      display: none;
    }
  }
}
.start-play {
  transform: rotate(90deg);
  &.open {
    transform: rotate(270deg);
  }
}
.Preloader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

.Preloader_Spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  margin: 0 auto;
  width: 45px;
  height: 45px;
  border: 2px solid #c6eedc;
  border-left-color: #0bd177;
  border-radius: 50%;
  -webkit-animation: bl-Spinner 0.6s linear infinite;
  animation: bl-Spinner 0.6s linear infinite;
}
@keyframes bl-Spinner {
  0% {
    transform: translateX(-50%) translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) translateY(-50%) rotate(1turn);
  }
}
.start-language {
  height: 30px;
  display: flex;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  &:hover {
    color: #fe6d4f;
  }
  .text {
    padding: 0 6px;
    font-size: 14px;
  }
}
</style>
