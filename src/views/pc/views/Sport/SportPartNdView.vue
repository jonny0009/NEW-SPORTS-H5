<script  lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import {
    MultipleLangFileNameEunm,
    BottonSize,
    SwiperActiveIndex
} from '@/model'
import ContentView from './components/PartNDView/index.vue'

const props = defineProps(['swiperIndex', 'paddingTop'])

const isAnimated = ref(false)
watch(
    () => [props.swiperIndex],
    (newValue) => {
        const [swiperIndex] = newValue
        isAnimated.value = swiperIndex === SwiperActiveIndex.SportPartNd
    },
    { deep: true }
)
</script>

<template>
    <div>
        <div class="sp-wrap">
            <div :style="{ height: `${paddingTop}px` }"></div>
            <div class="sp-content">
                <div>
                    <div class="sp-content-title">
                        {{ $t(MultipleLangFileNameEunm.ProductAdvantages) }}
                    </div>
                    <div class="sp-content-text">
                        {{ $t(MultipleLangFileNameEunm.ProductAdvantagesTips) }}
                    </div>
                </div>

                <content-view v-if="isAnimated"></content-view>

                <van-row justify="center">
                    <botton-confirm-pc
                        :size="BottonSize.Middle"
                        :text="MultipleLangFileNameEunm.WholeTextBotton"
                    ></botton-confirm-pc>
                </van-row>
            </div>
        </div>
    </div>
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
    background: url(@/assets/image/lg_part_st_bg.png) no-repeat,
        linear-gradient(0, #000 100%, #000 100%);
    background-position: 70%;
    background-size: 40%;
    display: flex;
    flex-direction: column;
}
.sp-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.sp-content-title {
    font-size: 40px;
    font-weight: 500;
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

