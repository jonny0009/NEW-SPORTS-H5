
<script  lang="ts" setup>
import videoURL from '@/assets/video/home.mp4'
import logoURL from '@/assets/image/sp_logo.png'
import { MultipleLangFileNameEunm, VideoMaskEnum } from '@/model'
import VideoBackGround from '@/components/VideoBackGround.vue'
</script>

<template>
    <div>
        <video-back-ground :src="videoURL" :mask="VideoMaskEnum.Bottom">
            <div class="sp-wrap">
                <div class="sp-content">
                    <van-image class="sp-logo-img" :src="logoURL" />
                    <span class="sp-supplier-tips">{{
                        $t(MultipleLangFileNameEunm.SupplierTips)
                    }}</span>
                    <span
                        v-t="MultipleLangFileNameEunm.PlatformAdvantages"
                        class="sp-platform-advantages"
                    ></span>
                    <div class="sp-btn-wrap">
                        <span
                            v-t="MultipleLangFileNameEunm.SpButtonText"
                            class="sp-btn-text"
                        ></span>
                    </div>
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
    ::v-deep img {
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
}
.sp-platform-advantages {
    line-height: 24px;
    font-size: 24px;
    color: #ffffff;
    margin-top: 30px;
    font-style: italic;
}
.sp-btn-wrap {
    width: 357px;
    height: 63px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('@/assets/image/middle_btn_border.png') center center
        no-repeat;
    background-size: cover;
}
.sp-btn-text {
    font-size: 28px;
    z-index: 999;
    color: #000000;
}
</style>
