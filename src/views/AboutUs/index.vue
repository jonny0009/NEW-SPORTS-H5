
<script  lang="ts" setup>
import headURL from '@/assets/image/sf_head_bg.jpg'
import { MultipleLangFileNameEunm, BottonSize, BottonLinkType } from '@/model'
import ContentView from './components/ContentView.vue'
</script>

<template>
    <div>
        <div class="sf-head-wrap">
            <van-image class="sf-head-img" :src="headURL" />
        </div>

        <div class="sf-wrap">
            <span class="sf-content-title">{{
                $t(MultipleLangFileNameEunm.AboutUs)
            }}</span>
            <span class="sf-content-text">{{
                $t(MultipleLangFileNameEunm.AboutUsContent)
            }}</span>
            <span class="sf-content-tips">{{
                $t(MultipleLangFileNameEunm.AboutUsTips)
            }}</span>

            <content-view></content-view>

            <van-row justify="center" class="sf-content-btn">
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
@fontsize: 24px;
@lineheight: 30px;
.sf-head-wrap {
    background: #000;
    padding: 50px 40px 28px 40px;
}
.sf-head-img {
    img {
        width: 100%;
        height: 454px;
        object-fit: contain;
        display: inline-block;
    }
}
.sf-wrap {
    padding: 0 40px 50px 40px;
    background: url(@/assets/image/sf_bg.jpg) no-repeat;
    background-size: cover;
}
.sf-content-title {
    font-weight: 600;
    display: block;
    font-size: 32px;
    color: #ff8727;
    text-align: center;
}
.sf-content-text {
    font-size: @fontsize;
    line-height: @lineheight;
    margin-top: 20px;
    color: #ffffff;
    display: inline-block;
}
.sf-content-tips {
    font-size: @fontsize;
    line-height: @lineheight;
    color: #ffffff;
    display: inline-block;
    margin-top: 10px;
}
.sf-content-btn {
    margin-top: 80px;
}
</style>
