<template>
  <div class="gameView">
    <div class="gameLeft 3">
      <div class="title">{{ gameName }}{{ $t('sports') }}</div>
      <div class="subTitle">{{ $t('sportsSubTitle') }}</div>
      <div class="text">
        {{ $t('sportsText') }}
      </div>
      <ul class="mt20" :class="[{ other: !['zh-cn', 'zh-tw'].includes(lan) }]">
        <li>
          {{ $t('sportsListItem1') }}
        </li>
        <li>
          {{ $t('sportsListItem2') }}
        </li>
        <li>
          {{ $t('sportsListItem3') }}
        </li>
        <li>
          {{ $t('sportsListItem4') }}
        </li>
        <li>
          {{ $t('sportsListItem5') }}
        </li>
        <li>
          {{ $t('sportsListItem6') }}
        </li>
        <li>
          {{ $t('sportsListItem7') }}
        </li>
      </ul>
      <div class="button" @click="goGameClick">
        {{ $t('loginForFree') }}
      </div>
    </div>
    <div class="gameRight">
      <img :src="require('@/assets/images/start/pc/game/11.png')" />
    </div>
    <!--  -->
  </div>
</template>

<script>
//
import { mapState } from 'vuex'
import { initI18n } from '@/i18n/index'
import { getLang } from '@/i18n/index'
//
export default {
  name: 'Sports',
  data() {
    return {
      lan: 'zh-cn'
    }
  },
  computed: {
    ...mapState('app', ['merchantConfigDetail']),
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
    gameNameEn() {
      let text = '7lucky'
      if (this.isRouteName98) {
        text = '98'
      } else if (this.isRouteNameOG) {
        text = 'OG'
      } else if (this.isSharpSports) {
        text = 'SharpSports'
      }
      return text
    }
  },
  mounted() {
    this.lan = getLang()
    setTimeout(() => {
      this.lan = getLang()
    }, 1000)
  },
  methods: {
    goGameClick() {
      this.$emit('goGameClick', { value: 'Sports' })
    }
  }
}
</script>

<style lang="less" scoped></style>
