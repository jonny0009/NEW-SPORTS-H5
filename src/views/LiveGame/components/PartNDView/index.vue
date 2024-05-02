
<script  lang="ts" setup>
import videoURL from '@/assets/video/lg_part_2nd.mp4'
import { MultipleLangFileNameEunm, VideoMaskEnum, BottonSize } from '@/model'
import PartSTContent from '@/views/LiveGame/components/PartNDContent.vue'
</script>

<template>
    <div>
        <video-back-ground :src="videoURL" :mask="VideoMaskEnum.Both">
            <div class="lg-nd-wrap">
                <div class="lg-nd-content">
                    <span class="lg-nd-title">{{
                        $t(MultipleLangFileNameEunm.OurGamesAndProducts)
                    }}</span>
                    <span
                        class="lg-nd-name"
                        v-t="MultipleLangFileNameEunm.ManBetXSport"
                    ></span>

                    <span
                        v-t="MultipleLangFileNameEunm.OurGamesAndProductsTips"
                        class="lg-nd-tips"
                    ></span>
                    <span
                        v-t="
                            MultipleLangFileNameEunm.OurGamesAndProductsContent
                        "
                        class="lg-nd-text"
                    ></span>
                    <PartSTContent></PartSTContent>

                    <van-row justify="center">
                        <botton-confirm
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
    padding: 50px 32px;
}
.lg-nd-content {
    padding: 30px 40px 29px 40px;
    background: rgba(0, 0, 0, 0.5);
}
</style>
