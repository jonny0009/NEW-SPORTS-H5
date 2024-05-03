<template>
  <div class="home">
    <div class="headImage">
      <van-image
        width="100px"
        height="30px"
        :src="require(`@/assets/images/home/${lan}/logo_minW.png`)"
      />
      <div class="flex-1"></div>

      <div class="headBtn cursor mr15" @click="refresh">
        <div class="item">
          <van-image
            width="12px"
            height="12px"
            class="mr5 image"
            :src="require(`@/assets/images/home/refresh.svg`)"
          />
          <span>{{ $t('refresh') }}</span>
        </div>
      </div>
      <van-popover
        v-model="showPopover"
        class="topPopover"
        trigger="click"
        placement="bottom-end"
        get-container="#lan"
      >
        <ul class="head_ul">
          <li
            v-for="(item, idx) in languageList"
            :key="idx"
            :class="{
              active: item.id === lan
            }"
            @click="clickLi(item)"
          >
            <van-image
              width="16"
              height="16"
              class="mr10"
              :src="require(`@/assets/images/home/language/${item.id}.svg`)"
            />
            {{ item.text }}
          </li>
        </ul>
        <template #reference>
          <div id="lan" class="headBtn cursor">
            <div class="item">
              <van-image
                width="16"
                height="16"
                class="mr5"
                :src="require(`@/assets/images/home/language/${lan}.svg`)"
              />
              {{ lan | lanFil }}
              <van-icon class="play" name="play" />
            </div>
          </div>
        </template>
      </van-popover>
      <!-- <van-button
        class="newbutton cursor"
        type="primary"
        round
        color="red"
        @click="logClick"
      >
        登录
      </van-button> -->

      <!-- <div class="user">
        <van-image
          width="24px"
          height="24px"
          :src="require(`@/assets/images/home/logo_minW.png`)"
        />
        <div class="txt1">
          <div class="p1">money</div>
          <div class="p2">6223.7k</div>
        </div>
      </div> -->
    </div>
    <van-swipe
      ref="vanSwipe"
      class="my-swipe"
      :autoplay="100110 * 10"
      indicator-color="rgba(255,255,255,1)"
    >
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <van-swipe-item class="bg1 bg" @click="swipeClick">
        <van-image :src="require(`@/assets/images/home/${lan}/banner_1.jpg`)" />
        <div class="mark"></div>
      </van-swipe-item>
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <van-swipe-item class="bg2 bg" @click="swipeClick">
        <van-image :src="require(`@/assets/images/home/${lan}/banner_2.jpg`)" />
        <div class="mark"></div>
      </van-swipe-item>
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <van-swipe-item class="bg3 bg" @click="swipeClick">
        <van-image :src="require(`@/assets/images/home/${lan}/banner_3.jpg`)" />
        <connect-box v-if="0" />
        <div class="mark"></div>
      </van-swipe-item>
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
    </van-swipe>
    <connect-box />
    <!-- 222 -->
    <!-- <login-pop ref="refloginpop" /> -->
    <!-- 33 -->
    <tip-pop ref="reftipPop" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getLang, setLanguage } from '@/i18n/index'
import localStore from '@/utils/localStore'
//
import tipPop from './components/tipPop'
import connectBox from './components/connect'
//
export default {
  name: 'Home',
  components: {
    tipPop,
    connectBox
  },
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
      lan: 'zh-cn',
      showPopover: false,
      languageList: [
        {
          text: '简体中文',
          id: 'zh-cn'
        },
        {
          text: 'English',
          id: 'en-us'
        },
        {
          text: '한국인',
          id: 'ko-kr'
        }
      ]
    }
  },
  computed: {
    vanSwipe() {
      return this.$refs.vanSwipe
    }
  },
  created() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.reftipPop?.show()
      }, 2000)
      setTimeout(() => {
        this.$refs.reftipPop?.hide()
      }, 7000)
    })
  },
  mounted() {
    this.mountedUpdata()
  },
  methods: {
    ...mapMutations('app', ['setKeyValue']),
    //
    swipeClick() {
      //
      // 只能在这里触发点击
      // 其他地方点击
      // pc会有问题
      //
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
      location.reload()
    },
    //
    mountedUpdata() {
      this.vanSwipe && this.vanSwipe.resize()
      this.lan = getLang()
    },
    //
    refresh() {
      location.reload()
    }
    //
  }
}
</script>

<style lang="less" scoped>
.headBtn {
  min-width: 90px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 0 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  .item {
    display: inline-block;
    font-size: 12px;
    line-height: 12px;
    color: #fff;
    height: 28px;
    display: flex;
    align-items: center;
    justify-items: center;
    span {
      line-height: 12px;
      font-size: 12px;
    }
    .image {
      vertical-align: middle;
    }
    .play {
      transform: rotate(90deg);
    }
  }
  &::before {
    content: '';
    height: 1px;
    width: 1%;
    flex: 1;
  }
  &::after {
    content: '';
    height: 1px;
    width: 1%;
    flex: 1;
  }
}
.head_ul {
  li {
    height: 50px;
    padding: 0 15px;
    font-size: 12px;
    display: flex;
    align-items: center;
    color: rgba(34, 34, 34, 0.4);
    border-bottom: 1px solid rgba(34, 34, 34, 0.06);
    &.active {
      color: #222;
    }
    &:last-child {
      border-bottom: 0;
    }
  }
}

.bg {
  position: relative;
  .mark {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
}
</style>

<style lang="less">
.my-swipe {
  padding-bottom: 15px;
}
.van-overlay {
  background-color: rgba(0, 0, 0, 0.1) !important;
}
.txt1 {
  padding-left: 5px;
}
.p1 {
  font-size: 12px;
  color: #ffffff;
}
.p2 {
  font-size: 14px;
  color: #ffffff;
  font-weight: 600;
}
.m8 {
  margin: 0 8px;
}
.mr5 {
  margin-right: 5px;
}
.mr10 {
  margin-right: 10px;
}
.mr15 {
  margin-right: 15px;
}
.headImage {
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate3d(-50%, 0, 0);
  z-index: 9;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
}
.newbutton {
  width: 68px;
  height: 28px;
}
.flex-1 {
  flex: 1;
}
.my-swipe .van-swipe-item {
  display: flex;
  flex-direction: column;
}
.user {
  display: flex;
  justify-content: center;
  align-items: center;
}
//
.title,
.subTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #282828;
  font-size: 12px;
  margin-bottom: 25px;
}
.title {
  font-size: 16px;
  font-weight: 600;
}
//
.logoImgList,
.onLine {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: #282828;
  padding-bottom: 30px;
  .mind {
    width: 40px;
  }
  .txt {
    padding-top: 8px;
    font-size: 10px;
    color: #282828;
    text-align: center;
    line-height: 14px;
  }

  .log,
  .img {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.logoImgList {
  padding-bottom: 70px;
  .mind {
    width: 30px;
  }
  .txt {
    font-size: 14px;
  }
}
//
//
//
//
//
//
.home {
  .van-swipe__indicators {
    bottom: 0;
  }
  .van-swipe__indicator {
    width: 8px;
    height: 8px;
    background: #6c99f8;
    border-radius: 2px;
  }
  .van-swipe__indicator--active {
    background: #6c99f8 !important;
  }
}

#lan {
  .van-popover__content {
    border-radius: 2px;
    width: 160px;
  }
}
</style>
