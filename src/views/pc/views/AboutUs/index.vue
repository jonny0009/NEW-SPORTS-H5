
<script  lang="ts" setup>
import { useSwiperStore } from '@/store'
import { defineProps, computed } from 'vue'
import headURL from '@/assets/image/sf_head_bg.jpg'
import {
    BottonSize,
    BottonLinkType,
    SwiperActiveIndex,
    MultipleLangFileNameEunm
} from '@/model'
import ContentView from './components/ContentView.vue'
const props = defineProps(['paddingTop'])
const store = useSwiperStore()
const isAnimated = computed(() => store.index === SwiperActiveIndex.AboutUs)
</script>

<template>
    <div>
        <div class="sf-wrap">
            <div :style="{ height: `${props.paddingTop}px` }"></div>
            <div class="sf-content">
                <div class="sf-container">
                    <div
                        v-if="isAnimated"
                        class="sf-container-left animate__animated animate__fadeInLeftBig"
                    >
                        <img :src="headURL" class="sf-head-img" alt="" />
                    </div>

                    <div class="sf-container-right">
                        <div
                            v-if="isAnimated"
                            class="animate__animated animate__fadeInRightBig"
                        >
                            <div class="sf-content-title">
                                {{ $t(MultipleLangFileNameEunm.AboutManBetX) }}
                            </div>
                            <div class="sf-content-text">
                                {{
                                    $t(MultipleLangFileNameEunm.AboutUsContent)
                                }}
                            </div>
                            <div class="sf-content-tips">
                                {{ $t(MultipleLangFileNameEunm.AboutUsTips) }}
                            </div>
                        </div>

                        <content-view v-if="isAnimated"></content-view>
                    </div>
                </div>

                <van-row
                    justify="center"
                    v-if="isAnimated"
                    class="sf-content-btn animate__animated animate__fadeInUpBig"
                >
                    <botton-confirm-pc
                        :size="BottonSize.Middle"
                        :link="BottonLinkType.Home"
                        :text="MultipleLangFileNameEunm.WholeTextBotton"
                    ></botton-confirm-pc>
                </van-row>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
@fontsize: 16px;
@lineheight: 20px;

.sf-wrap {
    height: 100vh;
    background: url(@/assets/image/sf_bg.jpg) no-repeat,
        linear-gradient(0, #000 100%, #000 100%);
    // background-position: ;
    // background-size: 100%;

    background-position: 50%;
    background-size: 100%;

    display: flex;
    flex-direction: column;
}
.sf-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.sf-container {
    display: flex;
    align-items: center;
    justify-items: center;
}

.sf-container-left {
    flex: 1;
    margin-right: 50px;
}
.sf-head-img {
    width: 100%;
    height: 670px;
    object-fit: cover;
    display: inline-block;
}
.sf-container-right {
    flex: 1;
    // padding: 0 40px 50px 40px;
}
.sf-content-title {
    display: block;
    font-size: 40px;
    font-weight: 500;
    color: #ff8727;
}
.sf-content-text {
    width: 496px;
    font-size: @fontsize;
    line-height: @lineheight;
    margin-top: 20px;
    color: #ffffff;
    display: inline-block;
}
.sf-content-tips {
    width: 496px;
    font-size: @fontsize;
    line-height: @lineheight;
    color: #ffffff;
    display: inline-block;
    margin-top: 10px;
}
.sf-content-btn {
    margin-top: 50px;
}
</style>
