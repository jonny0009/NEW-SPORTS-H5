<script lang="ts" setup>
import { defineProps } from 'vue'
import { BottonSize } from '@/model'
import xsURL from '@/assets/image/middle_btn_border.png'
import xlURL from '@/assets/image/large_btn_border.png'
import sdURL from '@/assets/image/middle_selected_btn_border.png'

const { size, text } = defineProps(['size', 'text'])
const imgStyle: { [key in BottonSize]: string } = {
    [BottonSize.Middle]: 'botton-xs-img',
    [BottonSize.Large]: 'botton-xl-img',
    [BottonSize.Selected]: 'botton-selected-img'
}
const imgSource: { [key in BottonSize]: string } = {
    [BottonSize.Middle]: xsURL,
    [BottonSize.Large]: xlURL,
    [BottonSize.Selected]: sdURL
}
const style = imgStyle[size as BottonSize]
const source = imgSource[size as BottonSize]
</script>

<template>
    <div>
        <div class="botton-wrap">
            <span class="botton-text">{{ $t(text) }}</span>
            <img :src="source" :class="[style]" alt="" />
        </div>
    </div>
</template>



<style lang="less" scoped>
.botton-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.botton-text {
    position: absolute;
    z-index: 10;
    font-weight: 400;
    font-size: 25px;
}
.botton-xl-img {
    width: 500px;
    height: auto;
    position: relative;
}
.botton-xs-img {
    width: 300px;
    height: auto;
    position: relative;
}
.botton-selected-img {
    width: 300px;
    height: auto;
    position: relative;
}
</style>