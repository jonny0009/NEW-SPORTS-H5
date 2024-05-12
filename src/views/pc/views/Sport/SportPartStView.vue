<script lang="ts" setup>
import logoURL from '@/assets/image/sport_logo.png'
import videoURL from '@/assets/video/sp_part_01.mp4'
import videoBGURL from '@/assets/video/sp_part_bg_01.jpg'
import { defineProps, watch, ref } from 'vue'
import {
    VideoMaskEnum,
    MultipleLangFileNameEunm,
    BottonSize,
    SwiperActiveIndex,
    BottonLinkType
} from '@/model'

const isAnimate = ref(false)
const props = defineProps(['swiperIndex'])

watch(
    () => [props.swiperIndex],
    (newValue) => {
        const [swiperIndex] = newValue
        isAnimate.value = swiperIndex === SwiperActiveIndex.SportPartSt
    },
    { deep: true }
)
</script>
<template>
    <video-back-ground
        :src="videoURL"
        :image="videoBGURL"
        :mask="VideoMaskEnum.Both"
    >
        <div class="sp-wrap">
            <div>
                <div class="sp-content">
                    <van-image
                        v-if="isAnimate"
                        class="sp-logo-img animate__animated animate__bounce"
                        :src="logoURL"
                    />
                    <span class="sp-supplier-tips">{{
                        $t(MultipleLangFileNameEunm.SupplierTips)
                    }}</span>
                    <span class="sp-platform-advantages">{{
                        $t(MultipleLangFileNameEunm.PlatformAdvantages)
                    }}</span>

                    <van-row justify="center" class="sp-btn-wrap">
                        <botton-confirm-pc
                            :size="BottonSize.Middle"
                            :link="BottonLinkType.Home"
                            :text="MultipleLangFileNameEunm.WholeTextBotton"
                        ></botton-confirm-pc>
                    </van-row>
                </div>
            </div>
        </div>
    </video-back-ground>
</template>

<style lang="less" scoped>
.sp-wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sp-logo-img {
    :deep(img) {
        width: 334.4px;
        height: 190px;
        object-fit: contain;
    }
}
.sp-content {
    width: 576px;
    display: flex;
    text-align: center;
    align-items: center;
    flex-direction: column;
}
.sp-supplier-tips {
    font-size: 50px;
    line-height: 60px;
    color: #ff8727;
    margin-top: 27px;
}
.sp-platform-advantages {
    line-height: 20px;
    font-size: 20px;
    color: #ffffff;
    margin-top: 53px;
    font-style: italic;
    white-space: nowrap;
}
.sp-btn-wrap {
    margin-top: 50px;
}
</style>
