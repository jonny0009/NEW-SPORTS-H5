<script  lang="ts" setup>
import VideoBackGroundPc from '@/components/VideoBackGroundPc.vue'

import videoURL from '@/assets/video/sp_part_02.mp4'
import videoBGURL from '@/assets/video/lg_part_bg_01.jpg'
import { defineProps } from 'vue'
import { BottonType, sportsOptions } from './constants'
import {
    MultipleLangFileNameEunm,
    VideoMaskEnum,
    BottonSize,
    BottonLinkType
} from '@/model'
import ContentView from './components/ContentView.vue'
import ManbetBotton from './components/ManbetBotton.vue'
const props = defineProps(['paddingTop'])
const emit = defineEmits(['update:change'])
const onChangeTab = (index: number) => {
    emit('update:change', index)
}
</script>

<template>
    <div>
        <video-back-ground-pc
            :type="MultipleLangFileNameEunm.Sports"
            :src="videoURL"
            :image="videoBGURL"
            :mask="VideoMaskEnum.Both"
        >
            <div class="lg-nd-wrap">
                <div :style="{ height: `${props.paddingTop}px` }"></div>
                <div class="lg-nd-container">
                    <div class="lg-nd-container-top"></div>
                    <div class="lg-nd-container-center">
                        <div>
                            <span class="lg-nd-title">{{
                                $t(MultipleLangFileNameEunm.OurGamesAndProducts)
                            }}</span>
                            <manbet-botton
                                :active="BottonType.Sport"
                                @update:change="onChangeTab"
                            ></manbet-botton>
                        </div>

                        <div>
                            <span class="lg-nd-name">{{
                                $t(MultipleLangFileNameEunm.ManBetXSport)
                            }}</span>

                            <span class="lg-nd-tips">{{
                                $t(
                                    MultipleLangFileNameEunm.OurGamesAndProductsTips
                                )
                            }}</span>
                            <span class="lg-nd-text">{{
                                $t(
                                    MultipleLangFileNameEunm.OurGamesAndProductsContent
                                )
                            }}</span>

                            <content-view
                                :options="sportsOptions"
                            ></content-view>
                        </div>
                        <van-row justify="center">
                            <botton-confirm-pc
                                :size="BottonSize.Large"
                                :link="BottonLinkType.Home"
                                :text="MultipleLangFileNameEunm.GamePalyDome"
                            ></botton-confirm-pc>
                        </van-row>
                    </div>
                    <div class="lg-nd-container-bottom"></div>
                </div>
            </div>
        </video-back-ground-pc>
    </div>
</template>

<style scoped lang="less">
.lg-nd-title {
    display: block;
    font-size: 40px;
    font-weight: 700;
    color: #ff8727;
    text-align: center;
}

.lg-nd-name {
    display: block;
    font-size: 35px;
    color: #ffffff;
    text-align: center;
    margin-top: 15px;
    // font-style: italic;
}

.lg-nd-tips {
    display: block;
    font-size: 18px;
    color: #ffffff;
    font-weight: 600;
    text-align: center;
    font-style: italic;
    white-space: pre-wrap;
}

.lg-nd-text {
    display: block;
    font-size: 16px;
    color: #ffffff;
    margin-top: 10px;
    line-height: 25px;
    margin-bottom: 50px;
}
.lg-nd-wrap {
    height: 100vh;
    padding: 0px 160px;
    display: flex;
    flex-direction: column;
    // align-items: center;
}
.lg-nd-container {
    flex: 1;
    display: flex;
    flex-direction: column;
}
.lg-nd-container-center {
    flex: 1;
    padding: 20px 378px 30px 378px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.lg-nd-container-top {
    height: 74px;
}
.lg-nd-container-bottom {
    height: 48px;
}
</style>
