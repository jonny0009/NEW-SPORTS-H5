
<script  lang="ts" setup>
import { MultipleLangFileNameEunm, BottonSize } from '@/model'
import PartSTContent from '@/views/LiveGame/components/PartSTContent.vue'
</script>

<template>
    <div>
        <div class="lg-st-wrap">
            <span
                class="lg-st-title"
                v-t="MultipleLangFileNameEunm.ProductAdvantages"
            ></span>
            <span
                class="lg-st-text"
                v-t="MultipleLangFileNameEunm.ProductAdvantagesTips"
            ></span>
            <PartSTContent></PartSTContent>

            <van-row justify="center" class="lg-btn-wrap">
                <botton-confirm :size="BottonSize.Middle"></botton-confirm>
            </van-row>
        </div>
    </div>
</template>

<style scoped lang="less">
.lg-st-title {
    display: block;
    font-size: 32px;
    color: #ff8727;
    text-align: center;
}
.lg-st-text {
    display: block;
    font-size: 24px;
    color: #ffffff;
    margin-top: 29px;
    margin-bottom: 10px;
}
.lg-st-wrap {
    padding: 75px 40px 29px 40px;
    background: url(@/assets/image/lg_part_st_bg.png) no-repeat center center,
        linear-gradient(0, #000 100%, #000 100%);
    background-position: top 150px left 50%;
    background-size: cover;
}
.lg-btn-wrap {
    margin-top: 50px;
}
</style>
