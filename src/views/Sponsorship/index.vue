<script lang="ts" setup>
import {
    VideoMaskEnum,
    MultipleLangFileNameEunm,
    BottonSize,
    BottonLinkType
} from '@/model'
import videoURL from '@/assets/video/spon_part_01.mp4'
import videoBGURL from '@/assets/video/span_part_bg_01.jpg'

import ContentView from './components/ContentView.vue'
</script>

<template>
    <div>
        <video-back-ground
            :src="videoURL"
            :image="videoBGURL"
            :type="MultipleLangFileNameEunm.Sponsorship"
            :mask="VideoMaskEnum.Both"
        >
            <div class="spon-wrap">
                <span class="spon-title">{{
                    $t(MultipleLangFileNameEunm.Sponsorship)
                }}</span>
                <content-view></content-view>
                <van-row justify="center" class="spon-btn">
                    <botton-confirm-app
                        :size="BottonSize.Middle"
                        :link="BottonLinkType.Home"
                        :text="MultipleLangFileNameEunm.WholeTextBotton"
                    ></botton-confirm-app>
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
    font-weight: 600;
    display: block;
    font-size: 32px;
    color: #ff8727;
    text-align: center;
}
.spon-btn {
    margin-top: 100px;
}
</style>