<template>
  <div class="gameView lottery">
    <div class="gameLeft 2">
      <div class="title">{{ gameName }}{{ $t('lottery') }}</div>
      <div class="subTitle">
        {{ $t('lotterySubTitle') }}
      </div>
      <div class="text">
        {{ $t('lotteryText') }}
      </div>
      <ul class="mt20">
        <li>
          {{ $t('lotteryListItem1') }}
        </li>
        <li>
          {{ $t('lotteryListItem2') }}
        </li>
        <li>
          {{ $t('lotteryListItem3') }}
        </li>
        <li>
          {{ $t('lotteryListItem4') }}
        </li>
        <li>
          {{ $t('lotteryListItem5') }}
        </li>
        <li>
          {{ $t('lotteryListItem6') }}
        </li>
      </ul>
      <div class="button" @click="goGameClick">
        {{ $t('loginForFree') }}
      </div>
    </div>
    <div class="gameRight">
      <img :src="require('@/assets/images/start/pc/game/33.png')" />
    </div>
    <!--  -->
  </div>
</template>

<script>
//
import { mapState } from 'vuex'
import { initI18n } from '@/i18n/index'
//
export default {
  name: 'Sports',
  data() {
    return {}
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
  methods: {
    goGameClick() {
      this.$emit('goGameClick', { value: 'AD-LOTTERY' })
    }
  }
}
</script>

<style lang="less" scoped></style>
