<template>
  <div class="gameView baccarat">
    <div class="gameLeft 1">
      <div class="title">{{ gameName }}{{ $t('baccarat') }}</div>
      <div class="subTitle">{{ $t('baccaratSubTitle') }}</div>
      <div class="text">
        {{ gameName }}
        {{ $t('baccaratText') }}
      </div>
      <ul class="mt20">
        <li>
          {{ $t('baccaratListItem1') }}
        </li>
        <li>
          {{ $t('baccaratListItem2') }}
        </li>
        <li>
          {{ $t('baccaratListItem3') }}
        </li>
        <li>
          {{ $t('baccaratListItem4') }}
        </li>
        <li>
          {{ $t('baccaratListItem5') }}
        </li>
        <li>
          {{ $t('baccaratListItem6') }}
        </li>
        <li>
          {{ $t('baccaratListItem7') }}
        </li>
      </ul>
      <div class="button" @click="goGameClick">
        {{ $t('loginForFree') }}
      </div>
    </div>
    <div class="gameRight">
      <img :src="require('@/assets/images/start/pc/game/22.png')" />
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
      this.$emit('goGameClick', { value: 'BAC-V2.0' })
    }
  }
}
</script>

<style lang="less" scoped></style>
