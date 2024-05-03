<template>
  <div class="mian">
    <div class="foot">
      <div class="title">
        <van-image
          width="76px"
          height="4px"
          :src="require(`@/assets/images/home/line_1.png`)"
        />

        <div class="m8">{{ $t('clickIconTryWithoutLogin') }}</div>
        <van-image
          width="76px"
          height="4px"
          :src="require(`@/assets/images/home/line_2.png`)"
        />
      </div>
      <div class="logoImgList">
        <div class="log cursor" @click="goToGame('SPORT')">
          <van-image
            width="80px"
            height="80px"
            :src="require(`@/assets/images/home/${lan}/logo_1_g.png`)"
          />
          <div class="txt">{{ $t('sevenLuckySports') }}</div>
        </div>
        <div class="mind"></div>
        <a
          id="azr"
          class="log cursor"
          target="_blank"
          @click="goToGame('BAC-V2.0')"
        >
          <van-image
            width="80px"
            height="80px"
            :src="require(`@/assets/images/home/${lan}/logo_1_y.png`)"
          />
          <div class="txt">{{ $t('sevenLuckyBaccarat') }}</div>
        </a>
        <div class="mind"></div>
        <div class="log cursor" @click="goToGame('AD-LOTTERY')">
          <van-image
            width="80px"
            height="80px"
            :src="require(`@/assets/images/home/${lan}/logo_1_b.png`)"
          />
          <div class="txt">{{ $t('sevenLuckyLottery') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { Toast } from 'vant'
import { getLang } from '@/i18n/index'
// api
import { getGameUrl, getRBMatch } from '@/api/common'

export default {
  name: 'Connect',
  components: {},
  data() {
    return {
      lan: getLang(),
      count: 0,
      gameUrl: '',
      setIntervalTimer: null
    }
  },
  computed: {
    ...mapState('app', ['changeLan']),
    ...mapGetters({
      token: 'user/token'
    })
  },
  watch: {
    token(val) {
      if (val && this.count < 1) {
        this.count += 1
        this.getZR()
      }
    },
    changeLan(val) {
      if (val) {
        this.newGetLan()
      }
    }
  },
  beforeDestroy() {
    const head = document.getElementsByTagName('head')[0]
    head?.removeEventListener('DOMNodeInserted', this.dOMNodeInserted)
    clearInterval(this.setIntervalTimer)
  },
  unmounted() {
    const head = document.getElementsByTagName('head')[0]
    head?.removeEventListener('DOMNodeInserted', this.dOMNodeInserted)
  },
  mounted() {
    // 检测新版本
    const head = document.getElementsByTagName('head')[0]
    head.addEventListener('DOMNodeInserted', this.dOMNodeInserted)
  },
  created() {
    if (this.token) {
      this.getZR()
    }
    // 定时器，25分钟一次，保证token不过期
    this.setIntervalTimer = setInterval(() => {
      const params = {
        gameSort: 1,
        gameType: 'FT',
        leagueIds: '',
        teamId: '',
        page: 1,
        pageSize: 1,
        isNovice: 'Y',
        gameTypeSon: '',
        showtype: ''
      }
      getRBMatch(params).then(res => {})
    }, 1000 * 60 * 25)
  },
  methods: {
    newGetLan() {
      this.lan = getLang()
    },
    getZR() {
      const params = {
        supplierId: 'aigame',
        gameKey: 'BAC-V2.0',
        openType: 2,
        dirType: 1
      }
      getGameUrl(params).then(getGameUrlRes => {
        const { code, data } = getGameUrlRes
        if (code === 200) {
          const gameUrl = data['url'].replace('&isAi=1', '')
          const url =
            gameUrl + '&backUrl=' + window.location.href + '&aiTerType=16'
          this.gameUrl = encodeURIComponent(url)
        }
      })
    },
    async goToGame(gameKey) {
      const lang = getLang()
      if (gameKey === 'BAC-V2.0') {
        const url = '/start/7luckyGame?gameUrl=' + this.gameUrl
        window.open(url)
      } else if (gameKey === 'SPORT') {
        window.open(window.origin + '/?token=' + this.token + `&lang=${lang}`)
      } else {
        const url =
          window.origin +
          '/bjgame?token=' +
          this.token +
          '&supplierId=aigame' +
          '&gameKey=' +
          gameKey +
          `&lang=${lang}`
        window.open(url)
      }
    },
    dOMNodeInserted(e) {
      // 获取标签名
      const type = e.target.tagName
      // 获取资源路径
      const url = e.target.src
      if (type === 'SCRIPT' && url) {
        const xhr = new XMLHttpRequest()
        xhr.open('get', url)
        xhr.onload = () => {
          const text = xhr.responseText
          if (text.indexOf('<') === 0) {
            Toast('检测到有新的版本发布，需要刷新页面以访问最新内容')
          }
        }
        xhr.send()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mian {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}
.m8 {
  text-align: center;
  line-height: 16px;
}
</style>
