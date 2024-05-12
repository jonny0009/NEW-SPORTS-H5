<script  lang="ts" setup>
import videoURL from '@/assets/video/lg_part_01.mp4'
import videoBGURL from '@/assets/video/lg_part_bg_01.jpg'
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
            :src="videoURL"
            :image="videoBGURL"
            :mask="VideoMaskEnum.Both"
        >
            <div class="lg-nd-wrap">
                <div class="lg-nd-content">
                    <span class="lg-nd-title">{{
                        $t(MultipleLangFileNameEunm.OurGamesAndProducts)
                    }}</span>
                    <span class="lg-nd-name">{{
                        $t(MultipleLangFileNameEunm.ManBetXSport)
                    }}</span>

                    <span class="lg-nd-tips">{{
                        $t(MultipleLangFileNameEunm.OurGamesAndProductsTips)
                    }}</span>
                    <span class="lg-nd-text">{{
                        $t(MultipleLangFileNameEunm.OurGamesAndProductsContent)
                    }}</span>

                    <content-view></content-view>

                    <van-row justify="center">
                        <botton-confirm-app
                            :size="BottonSize.Large"
                            :link="BottonLinkType.Casino"
                            :text="MultipleLangFileNameEunm.LoginForFreeBotton"
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

.lg-nd-title {
    display: block;
    font-size: 32px;
    color: #ff8727;
    text-align: center;
}

.lg-nd-name {
    display: block;
    font-size: 26px;
    color: #ffffff;
    text-align: center;
    margin-top: 34px;
    font-style: italic;
}

.lg-nd-tips {
    display: block;
    font-size: 26px;
    color: #ffffff;
    margin-top: 20px;
    font-style: italic;
}

.lg-nd-text {
    display: block;
    font-size: 24px;
    color: #ffffff;
    margin-top: 20px;
    line-height: 40px;
    margin-bottom: 10px;
}
.lg-nd-wrap {
    padding: 50px 30px;
}
.lg-nd-content {
    padding: 30px 40px 29px 40px;
    background: rgba(0, 0, 0, 0.5);
}
</style>

