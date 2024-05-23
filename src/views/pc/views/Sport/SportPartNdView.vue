<script  lang="ts" setup>
import { defineProps, computed } from 'vue'
import {
    MultipleLangFileNameEunm,
    BottonSize,
    SwiperActiveIndex,
    BottonLinkType,
    VideoMaskEnum
} from '@/model'
import { useSwiperStore } from '@/store'
import videoURL from '@/assets/video/sp_part_01.mp4'
import videoBGURL from '@/assets/video/sp_part_bg_01.jpg'
import ContentView from './components/PartNDView/index.vue'

const store = useSwiperStore()
const props = defineProps(['paddingTop'])
const isAnimate = computed(
    () => store.index === SwiperActiveIndex.ProductAdvantages
)
</script>



<template>
    <video-back-ground
        :type="MultipleLangFileNameEunm.ProductAdvantages"
        :src="videoURL"
        :image="videoBGURL"
        :mask="VideoMaskEnum.Both"
    >
        <div class="sp-wrap">
            <div>
                <div class="sp-bg">
                    <img
                        :class="[
                            'sp-bgimg',
                            'animate__animated',
                            isAnimate
                                ? 'animate__bounceInRight'
                                : 'animate__fadeOutUpBig'
                        ]"
                        src="@/assets/image/lg_part_st_bg.png"
                        alt=""
                    />
                </div>
            </div>
            <div :style="{ height: `${props.paddingTop}px` }"></div>
            <div class="sp-content">
                <div>
                    <div
                        :class="[
                            'sp-content-title',
                            'animate__animated',
                            !isAnimate && 'animate__fadeOutUpBig'
                        ]"
                    >
                        {{ $t(MultipleLangFileNameEunm.ProductAdvantages) }}
                    </div>
                    <div
                        :class="[
                            'sp-content-text',
                            'animate__animated',
                            !isAnimate && 'animate__fadeOutUpBig'
                        ]"
                    >
                        {{ $t(MultipleLangFileNameEunm.ProductAdvantagesTips) }}
                    </div>
                </div>

                <content-view :show="isAnimate"></content-view>

                <van-row justify="center">
                    <botton-confirm-pc
                        :size="BottonSize.Middle"
                        :link="BottonLinkType.Home"
                        :text="MultipleLangFileNameEunm.WholeTextBotton"
                    ></botton-confirm-pc>
                </van-row>
            </div>
        </div>
    </video-back-ground>
</template>

<style scoped lang="less">
.sp-head-img {
    img {
        width: 100%;
        height: 454px;
        object-fit: contain;
        display: inline-block;
    }
}
.sp-wrap {
    height: 100vh;
    padding: 0px 119px;
    display: flex;
    flex-direction: column;
    position: relative;
    .sp-bg {
        position: absolute;
        right: 0;
        z-index: -1;
        width: 100vw;
        height: 100%;
        background-color: #000;
        .sp-bgimg {
            position: absolute;
            top: 20%;
            right: 20%;
            width: 40%;
            opacity: 0.8;
            // transform: translate(50vw, 8vh);
        }
    }
}
.sp-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.sp-content-title {
    font-size: 40px;
    font-weight: 700;
    color: #ff8727;
    text-align: center;
}
.sp-content-text {
    width: 844px;
    font-size: 16px;
    line-height: 18px;
    margin: 0 auto;
    color: #ffffff;
}
</style>

