
<script  lang="ts" setup>
import { MultipleLangFileNameEunm, BottonSize } from '@/model'
import ContentView from './ContentView.vue'
</script>

<template>
    <div>
        <div class="sp-nd-wrap">
            <span class="sp-nd-title">{{
                $t(MultipleLangFileNameEunm.ProductAdvantages)
            }}</span>
            <span class="sp-nd-text">{{
                $t(MultipleLangFileNameEunm.ProductAdvantagesTips)
            }}</span>
            <content-view></content-view>

            <van-row justify="center" class="sp-btn-wrap">
                <botton-confirm :size="BottonSize.Middle"></botton-confirm>
            </van-row>
        </div>
    </div>
</template>

<style scoped lang="less">
.sp-nd-title {
    display: block;
    font-size: 32px;
    color: #ff8727;
    text-align: center;
}
.sp-nd-text {
    display: block;
    font-size: 24px;
    color: #ffffff;
    margin-top: 29px;
    margin-bottom: 10px;
}
.sp-nd-wrap {
    padding: 75px 40px 29px 40px;
    background: url(@/assets/image/lg_part_st_bg.png) no-repeat center center,
        linear-gradient(0, #000 100%, #000 100%);
    background-position: top 150px left 50%;
    background-size: cover;
}
.sp-btn-wrap {
    margin-top: 50px;
}
</style>
