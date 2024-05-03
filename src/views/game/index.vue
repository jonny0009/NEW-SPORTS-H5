<template>
  <div class="iframePage">
    <van-popup
      v-model="show"
      class="iframeCalss"
      :overlay="false"
      :lock-scroll="true"
      position="top"
      get-container="body"
    >
      <div class="iframeBox">
        <div class="bjgame-header">
          <!-- <van-image
            width="24px"
            height="24px"
            :src="require(`@/assets/images/home/logo.png`)"
            class="cursor"
            @click="goBack"
          /> -->
          <van-tabs
            ref="reftabs"
            v-model="tabsactive"
            class="newheadervantabs cursor"
            background="transparent"
            title-active-color="#FCFCFC"
            title-inactive-color="#9F9F9F"
            line-height="0px"
            swipeable
            lazy-render
            @click="onClick"
          >
            <van-tab
              v-for="(item, idx) in tabsList"
              :key="idx"
              :title="item.name"
              :name="item.gameKey"
            />
          </van-tabs>
        </div>
        <div class="iframeView">
          <iframe
            ref="bjgameIframe"
            :src="url"
            width="100%"
            frameborder="0"
            @load="onLoad"
          ></iframe>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getGameUrl } from '@/api/common'
import { mapGetters, mapState } from 'vuex'
import { Tab, Tabs } from 'vant'
export default {
  name: 'BJGame',
  components: {
    'van-tab': Tab,
    'van-tabs': Tabs
  },
  data() {
    return {
      tabsactive: '',
      url: null,
      name: '',
      title: '',
      isLoading: true,
      gameKey: '',
      show: false,
      tabsList: [
        {
          gameKey: 'SPORT',
          name: '七星体育'
        },
        {
          gameKey: 'BAC-V2.0',
          name: '七星真人'
        },
        {
          gameKey: 'ADCPV2',
          name: '七星彩票'
        }
      ]
    }
  },
  computed: {
    ...mapState('app', ['merchantConfigDetail']),
    ...mapGetters({
      token: 'user/token'
    }),
    showHead() {
      return this.$route.meta && this.$route.meta.showHead
    },
    routeName() {
      return this.$route.name
    },
    brandType() {
      return this.merchantConfigDetail.brandType || 1
    }
  },
  created() {
    this.gameKey = this.$route.query.gameKey
    this.tabsactive = this.gameKey
    this.init()
    const container = window.document
    container.scrollTop = container.scrollHeight
    window.scrollTo(0, 1)
    window.addEventListener('load', scroll, false)
    this.show = true
  },
  beforeDestroy() {
    window.removeEventListener('load', scroll)
  },
  methods: {
    onClick(name, title) {
      this.gameKey = name
      this.init()
    },
    scroll() {
      setTimeout(scrollTo, 0, 0, 1)
    },
    onLoad() {
      this.isLoading = false
    },
    init() {
      if (this.gameKey === 'SPORT') {
        this.url = window.origin + '/token?=' + this.token
      } else {
        const params = {
          supplierId: this.$route.query.supplierId,
          gameKey: this.gameKey
        }
        if (this.gameKey === 'BAC-V2.0') {
          params.openType = 2
          params.dirType = 1
        }
        getGameUrl(params).then(gres => {
          const { code, data } = gres
          if (code === 200) {
            if (this.gameKey === 'BAC-V2.0') {
              const gameUrl = gres.data['url'].replace('&isAi=1', '')
              window.location.href =
                gameUrl +
                '&source=7lucky&brandType=' +
                this.brandType +
                '&sourceUrl=' +
                encodeURIComponent(window.location.host)
              // window.location =
              //   data['url'] +
              //   '&backUrl=' +
              //   encodeURIComponent(window.location.href) +
              //   '&aiTerType=16'
            } else {
              this.url = data['url']
            }
          }
        })
      }
    },

    goBack() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="less">
.newheadervantabs {
  margin-left: 8px;
  .van-tabs__nav {
    .van-tab {
      padding: 0 8px;
      font-size: 12px;
    }
  }
}
</style>
<style lang="less" scoped>
.iframeBox {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .iframeView {
    position: absolute;
    top: 40px;
    width: 100%;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 22;
    background: #fff;
  }
  .bjgame-header {
    display: flex;
    align-items: center;
    position: relative;
    height: 40px;
    font-size: 20px;
    z-index: 2;
    color: #fff;
    font-weight: 600;
    padding: 0 11px;
    background: #383838;
    flex-shrink: 0;
    .icon-BackArrowWithTail {
      font-size: 20px;
    }
    .titletext {
      color: #0bd177;
      padding: 0 10px 0 15px;
    }
  }
  iframe {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0px;
    position: absolute;
    z-index: 1;
  }
}

.iframeCalss {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
