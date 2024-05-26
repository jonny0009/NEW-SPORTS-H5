
<script  lang="ts" setup>
import gifURL from '@/assets/video/sp_part_02.gif'
import videoURL from '@/assets/video/sp_part_02.mp3'
import videoBGURL from '@/assets/video/sp_part_bg_02.jpg'
import {
    MultipleLangFileNameEunm,
    VideoMaskEnum,
    BottonSize,
    BottonLinkType
} from '@/model'
import ContentView from './ContentView.vue'
</script>

<template>
    <div>
        <video-back-ground
            :src="gifURL"
            :videoSrc="videoURL"
            :image="videoBGURL"
            :type="MultipleLangFileNameEunm.Sports"
            :mask="VideoMaskEnum.Both"
        >
            <div class="lg-rd-wrap">
                <div class="lg-rd-content">
                    <span class="lg-rd-title">{{
                        $t(MultipleLangFileNameEunm.OurGamesAndProducts)
                    }}</span>
                    <span class="lg-rd-name">{{
                        $t(MultipleLangFileNameEunm.ManBetXSport)
                    }}</span>

                    <span class="lg-rd-tips">{{
                        $t(MultipleLangFileNameEunm.OurGamesAndProductsTips)
                    }}</span>
                    <span class="lg-rd-text">{{
                        $t(MultipleLangFileNameEunm.OurGamesAndProductsContent)
                    }}</span>
                    <content-view></content-view>

                    <van-row justify="center">
                        <botton-confirm-app
                            :size="BottonSize.Large"
                            :link="BottonLinkType.Home"
                            :text="MultipleLangFileNameEunm.GamePalyDome"
                        ></botton-confirm-app>
                    </van-row>
                </div>
            </div>
        </video-back-ground>
    </div>
</template>

<style scoped lang="less">
.lg-part-video {
    display: block;
    width: 100vw;
    height: 80vh;
    object-fit: cover;
}

.lg-rd-title {
    font-weight: 600;
    display: block;
    font-size: 32px;
    color: #ff8727;
    text-align: center;
}

.lg-rd-name {
    font-weight: 600;
    display: block;
    font-size: 26px;
    color: #ffffff;
    text-align: center;
    margin-top: 34px;
    font-style: italic;
}

.lg-rd-tips {
    display: block;
    font-size: 26px;
    color: #ffffff;
    margin-top: 20px;
    font-style: italic;
}

.lg-rd-text {
    display: block;
    font-size: 24px;
    color: #ffffff;
    margin-top: 20px;
    line-height: 40px;
    margin-bottom: 10px;
}
.lg-rd-wrap {
    padding: 50px 32px;
}
.lg-rd-content {
    padding: 30px 40px 29px 40px;
    background: rgba(0, 0, 0, 0.5);
}
</style>