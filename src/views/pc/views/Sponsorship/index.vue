<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import {
    VideoMaskEnum,
    MultipleLangFileNameEunm,
    BottonSize,
    BottonLinkType,
    SwiperActiveIndex
} from '@/model'
import { useSwiperStore } from '@/store'
import videoURL from '@/assets/video/spon_part_01.mp4'
import videoBGURL from '@/assets/video/span_part_bg_01.jpg'
import ContentView from './components/ContentView.vue'

const store = useSwiperStore()
const props = defineProps(['paddingTop'])
const isAnimate = computed(() => store.index === SwiperActiveIndex.Sponsorship)
</script>

<template>
    <div>
        <video-back-ground-pc
            :type="MultipleLangFileNameEunm.Sponsorship"
            :src="videoURL"
            :image="videoBGURL"
            :mask="VideoMaskEnum.Both"
        >
            <div class="spon-wrap">
                <div :style="{ height: `${props.paddingTop}px` }"></div>
                <div class="spon-contanier">
                    <div>
                        <div
                            :class="[
                                'spon-title ',
                                'animate__animated',
                                !isAnimate && 'animate__fadeOutUpBig'
                            ]"
                        >
                            {{ $t(MultipleLangFileNameEunm.Sponsorship) }}
                        </div>
                        <div
                            :class="[
                                'spon-content',
                                'animate__animated',
                                !isAnimate && 'animate__fadeOutUpBig'
                            ]"
                        >
                            {{
                                $t(MultipleLangFileNameEunm.SponsorshipContent)
                            }}
                        </div>
                        <content-view></content-view>
                        <van-row justify="center" class="spon-btn">
                            <botton-confirm-pc
                                :size="BottonSize.Middle"
                                :link="BottonLinkType.Home"
                                :text="MultipleLangFileNameEunm.WholeTextBotton"
                            ></botton-confirm-pc>
                        </van-row>
                    </div>
                </div>
            </div>
        </video-back-ground-pc>
    </div>
</template>

<style lang="less" scoped>
.spon-wrap {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.spon-contanier {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.spon-title {
    font-size: 40px;
    font-weight: 700;
    color: #ff8727;
    text-align: center;
}
.spon-content {
    font-size: 16px;
    color: #fff;
    width: 844px;
    margin: 20px auto auto auto;
}
.spon-btn {
    margin-top: 50px;
}
</style>