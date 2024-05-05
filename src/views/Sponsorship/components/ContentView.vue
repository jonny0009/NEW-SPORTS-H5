<script lang="ts" setup>
import { computed } from 'vue'
import { useSponContentOptions, OtherTeamOptions } from '../constants'
import LineView from './LineView.vue'

const options = computed(() => useSponContentOptions())
</script>

<template>
    <div>
        <van-row class="spon-content-wrap">
            <van-col span="8" :key="index" v-for="(item, index) in options">
                <div class="spon-content-container">
                    <van-image
                        :src="item.icon"
                        class="spon-content-icon"
                    ></van-image>
                    <strong class="spon-content-title">{{
                        $t(item.title)
                    }}</strong>
                    <span class="spon-content-tips">{{ $t(item.tips) }}</span>
                </div>
            </van-col>
        </van-row>

        <line-view></line-view>

        <div class="spon-img-wrap">
            <van-row
                v-for="(item, index) in OtherTeamOptions"
                :key="index"
                class="spon-img-container"
            >
                <van-row v-for="(src, i) in item" :key="`${index}_${i}`">
                    <van-image :src="src" class="spon-content-img"></van-image>
                </van-row>
            </van-row>
        </div>
    </div>
</template>

<style lang="less" scoped>
.spon-content-wrap {
    margin-top: 30px;
}
.spon-content-icon {
    ::v-deep img {
        width: 130px;
        height: 130px;
        object-fit: contain;
    }
    display: block;
}
.spon-content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}
.spon-content-title {
    font-size: 20px;
    color: #ffffff;
    white-space: pre-wrap;
    text-align: center;
}

.spon-content-tips {
    font-size: 16px;
    color: #ffffff;
    white-space: pre-wrap;
    text-align: center;
    margin-top: 2px;
}
.spon-content-img {
    margin: 0 10px;
    ::v-deep img {
        width: 44.7px;
        height: 44.7px;
        object-fit: contain;
    }
}
.spon-img-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
}
.spon-img-container {
    margin-bottom: 20px;
}
</style>