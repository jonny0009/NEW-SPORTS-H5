<script lang="ts" setup>
import { VideoMaskEnum, MultipleLangFileNameEunm, BottonSize } from '@/model'
import videoURL from '@/assets/video/spon_bg.mp4'
import ContentView from './components/ContentView.vue'
</script>

<template>
    <div>
        <video-back-ground :src="videoURL" :mask="VideoMaskEnum.Both">
            <div class="spon-wrap">
                <span class="spon-title">{{
                    $t(MultipleLangFileNameEunm.Sponsorship)
                }}</span>
                <content-view></content-view>
                <van-row justify="center" class="spon-btn">
                    <botton-confirm :size="BottonSize.Middle"></botton-confirm>
                </van-row>
            </div>
        </video-back-ground>
    </div>
</template>

<style lang="less" scoped>
.spon-wrap {
    padding: 80px 0 60px 0;
}
.spon-title {
    display: block;
    font-size: 32px;
    color: #ff8727;
    text-align: center;
}
.spon-btn {
    margin-top: 100px;
}
</style>