<template>
  <div class="home"></div>
</template>

<script>
//
import { getUrlParams } from '@/utils'
export default {
  name: 'Home',
  data() {
    return {}
  },
  computed: {},
  created() {
    const locationSplit = getUrlParams()
    const gameUrl = decodeURIComponent(locationSplit.gameUrl)
    if (gameUrl) {
      window.location = gameUrl
    }
  },

  methods: {}
}
</script>

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
.headImage {
  position: fixed;
  left: 0;
  top: 0;
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
  // height: calc(50vh);
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
// .bg1,
// .bg2,
// .bg3 {
//   background: url('~@/assets/images/home/banner_1.jpg') no-repeat;
//   background-size: contain;
//   min-height: calc(50vh);
// }
// .bg3 {
//   background: url('~@/assets/images/home/banner_3.jpg') no-repeat;
//   background-size: contain;
//   min-height: calc(50vh);
// }

// .bg2 {
//   background: url('~@/assets/images/home/banner_2.jpg') no-repeat;
//   background-size: contain;
//   min-height: calc(50vh);
// }
</style>
<style lang="less">
.home {
  .van-swipe__indicators {
    bottom: 0;
    // top: 230px;
    // left: auto;
    // right: 0;
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
</style>
