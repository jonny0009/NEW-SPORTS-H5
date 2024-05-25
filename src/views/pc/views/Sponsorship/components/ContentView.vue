<script lang="ts" setup>
import { computed } from 'vue'
import { useSponContentOptions, OtherTeamOptions } from '../constants'
import LineView from './LineView.vue'
import { useSwiperStore } from '@/store'
import { SwiperActiveIndex } from '@/model/enum'

const options = computed(() => useSponContentOptions())
const store = useSwiperStore()
const isAnimate = computed(() => store.index === SwiperActiveIndex.Sponsorship)
</script>

<template>
    <div>
        <div class="spon-content-wrap">
            <div class="spon-content-mask"></div>
            <div class="spon-content-center">
                <div
                    :key="index"
                    v-for="(item, index) in options"
                    class="spon-content-container-wrap"
                >
                    <div
                        v-for="(child, i) in item"
                        :key="i"
                        :class="[
                            'spon-content-container',
                            'animate__animated',
                            !store.noAnimate && !isAnimate ? 'animate__fadeOutUpBig' : ''
                        ]"
                        :style="{
                            'animation-delay': `${index * 0.3 + i * 0.1}s`
                        }"
                    >
                        <img :src="child.icon" class="spon-content-icon" />
                        <strong class="spon-content-title">{{
                            $t(child.title)
                        }}</strong>
                        <div class="spon-content-tips">
                            {{ $t(child.tips) }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="spon-content-mask"></div>
        </div>

        <line-view></line-view>

        <div class="spon-img-wrap">
            <div class="spon-img-container">
                <img
                    v-for="(item, index) in OtherTeamOptions"
                    :key="index"
                    :src="item"
                    class="spon-content-img"
                />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.spon-content-wrap {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
.spon-content-icon {
    width: 100px;
    height: 100px;
    object-fit: contain;
    cursor: pointer;
    transition: all 0.3s;
}
:deep(.spon-content-icon:hover) {
    transform: scale(1.1);
}
.spon-content-center {
    flex: 2;
}
.spon-content-container-wrap {
    flex: 1;
    display: flex;
    justify-content: center;
}
.spon-content-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}
.spon-content-title {
    font-size: 16px;
    color: #ffffff;
    white-space: nowrap;
    text-align: center;
}

.spon-content-tips {
    font-size: 16px;
    color: #ffffff;
    white-space: nowrap;
    text-align: center;
    margin-top: 2px;
}
.spon-content-img {
    margin: 0 15px;
    width: 44.7px;
    height: 44.7px;
    object-fit: contain;
    cursor: pointer;
    transition: all 0.3s;
}
:deep(.spon-content-img:hover) {
    transform: scale(1.1);
}
.spon-img-wrap {
    display: flex;
    align-items: center;
    margin-top: 30px;
}
.spon-img-container {
    flex: 1;
    display: flex;
    justify-content: center;
}
.spon-content-mask {
    flex: 1;
}
</style>