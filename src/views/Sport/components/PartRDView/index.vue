
<script  lang="ts" setup>
import videoURL from '@/assets/video/sp_part_02.mp4'
import videoBGURL from '@/assets/video/sp_part_bg_02.jpg'
import {
    MultipleLangFileNameEunm,
    VideoMaskEnum,
    BottonSize,
    BottonType
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
                        <botton-confirm
                            :type="BottonType.Link"
                            :size="BottonSize.Large"
                        ></botton-confirm>
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
    display: block;
    font-size: 32px;
    color: #ff8727;
    text-align: center;
}

.lg-rd-name {
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
