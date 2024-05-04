<!-- 
<script  lang="ts" setup>
import { MultipleLangFileNameEunm, BottonSize } from '@/model'
import ContentView from './ContentView.vue'
</script>

<template>
    <div>
        <div class="sp-nd-wrap">
            <div class="sp-nd-title">
                {{ $t(MultipleLangFileNameEunm.ProductAdvantages) }}
            </div>
            <div class="sp-nd-text">
                {{ $t(MultipleLangFileNameEunm.ProductAdvantagesTips) }}
            </div>
            <content-view></content-view>

            <van-row justify="center" class="sp-btn-wrap">
                <botton-confirm :size="BottonSize.Middle"></botton-confirm>
            </van-row>
        </div>
    </div>
</template>

<style scoped lang="less">
.sp-nd-wrap {
    padding: 75px 40px 29px 40px;
    background: url(@/assets/image/lg_part_st_bg.png) no-repeat center center,
        linear-gradient(0, #000 100%, #000 100%);
    background-position: top 150px left 50%;
    background-size: cover;
}
.sp-nd-title {
    font-size: 32px;
    color: #ff8727;
    text-align: center;
}
.sp-nd-text {
    font-size: 24px;
    color: #ffffff;
    margin-top: 29px;
    margin-bottom: 10px;
}
.sp-btn-wrap {
    margin-top: 50px;
}
</style> -->




<script  lang="ts" setup>
import { MultipleLangFileNameEunm, BottonSize } from '@/model'
import ContentView from './ContentView.vue'
</script>

<template>
    <div>
        <div class="sf-wrap">
            <div class="sf-content-title">
                {{ $t(MultipleLangFileNameEunm.ProductAdvantages) }}
            </div>
            <div class="sf-content-text">
                {{ $t(MultipleLangFileNameEunm.ProductAdvantagesTips) }}
            </div>

            <content-view></content-view>

            <van-row justify="center" class="sf-content-btn">
                <botton-confirm :size="BottonSize.Middle"></botton-confirm>
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
    padding: 75px 40px 29px 40px;
    background: url(@/assets/image/lg_part_st_bg.png) no-repeat center center,
        linear-gradient(0, #000 100%, #000 100%);
    background-position: top 150px left 50%;
    background-size: cover;
}
.sf-content-title {
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
}
.sf-content-btn {
    margin-top: 80px;
}
</style>

