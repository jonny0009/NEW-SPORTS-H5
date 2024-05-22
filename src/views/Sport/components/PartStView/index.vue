
<script  lang="ts" setup>
import logoURL from '@/assets/image/sport_logo.png'
import videoURL from '@/assets/video/sp_part_01.mp4'
import videoBGURL from '@/assets/video/sp_part_bg_01.jpg'
import {
    MultipleLangFileNameEunm,
    VideoMaskEnum,
    BottonSize,
    BottonLinkType
} from '@/model'
</script>

<template>
    <div>
        <video-back-ground
            :src="videoURL"
            :image="videoBGURL"
            picture
            :type="MultipleLangFileNameEunm.Logo"
            :mask="VideoMaskEnum.Bottom"
        >
            <div class="sp-wrap">
                <div class="sp-content">
                    <van-image class="sp-logo-img" :src="logoURL" />
                    <span class="sp-supplier-tips">{{
                        $t(MultipleLangFileNameEunm.SupplierTips)
                    }}</span>
                    <span class="sp-platform-advantages">{{
                        $t(MultipleLangFileNameEunm.PlatformAdvantages)
                    }}</span>

                    <van-row justify="center" class="sp-btn-wrap">
                        <botton-confirm-app
                            :link="BottonLinkType.Home"
                            :size="BottonSize.Middle"
                            :text="MultipleLangFileNameEunm.WholeTextBotton"
                        ></botton-confirm-app>
                    </van-row>
                </div>
            </div>
        </video-back-ground>
    </div>
</template>

<style scoped lang="less">
.sp-wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sp-logo-img {
    :deep(img) {
        width: 340px;
        height: 172.4px;
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
    font-size: 40px;
    line-height: 50px;
    color: #ff8727;
    margin-top: 32px;
    white-space: pre-wrap;
}
.sp-platform-advantages {
    line-height: 24px;
    font-size: 24px;
    color: #ffffff;
    margin-top: 30px;
    font-style: italic;
}
.sp-btn-wrap {
    margin-top: 100px;
}
</style>
