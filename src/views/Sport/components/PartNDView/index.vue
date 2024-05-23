<script  lang="ts" setup>
import ContentView from './ContentView.vue'
import { MultipleLangFileNameEunm, BottonSize, BottonLinkType } from '@/model'
</script>

<template>
    <div>
        <div class="sp-wrap">
            <div class="sp-content-title">
                {{ $t(MultipleLangFileNameEunm.ProductAdvantages) }}
            </div>
            <div class="sp-content-text">
                {{ $t(MultipleLangFileNameEunm.ProductAdvantagesTips) }}
            </div>

            <content-view></content-view>

            <van-row justify="center" class="sp-content-btn">
                <botton-confirm-app
                    :size="BottonSize.Middle"
                    :link="BottonLinkType.Home"
                    :text="MultipleLangFileNameEunm.WholeTextBotton"
                ></botton-confirm-app>
            </van-row>
        </div>
    </div>
</template>

<style scoped lang="less">
// @fontsize: 24px;
// @lineheight: 30px;
.sp-head-wrap {
    background: #000;
    padding: 50px 40px 28px 40px;
}
.sp-head-img {
    img {
        width: 100%;
        height: 454px;
        object-fit: contain;
        display: inline-block;
    }
}
.sp-wrap {
    padding: 75px 40px 29px 40px;
    background: url(@/assets/image/lg_part_st_bg.png) no-repeat,
        linear-gradient(0, #000 100%, #000 100%);
    background-position: top 150px center;
    background-size: 200%;
}
.sp-content-title {
    font-weight: 600;
    font-size: 32px;
    color: #ff8727;
    text-align: center;
}
.sp-content-text {
    font-size: 24px;
    line-height: 30px;
    margin-top: 20px;
    color: #ffffff;
}
.sp-content-btn {
    margin-top: 80px;
}
</style>

