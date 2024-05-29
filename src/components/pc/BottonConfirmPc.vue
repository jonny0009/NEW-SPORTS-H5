<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { useLanguages } from '@/hooks'
import { getStore } from '@/config/storage'
import {
    BottonSize,
    BottonLinkSourcePc,
    BottonLinkType,
    StorageLangNameEnum
} from '@/model'
import xsURL from '@/assets/image/middle_btn_border.png'
import xlURL from '@/assets/image/large_btn_border.png'
import sdxsURL from '@/assets/image/middle_selected_btn_border.png'
import sdxlURL from '@/assets/image/large_selected_btn_border.png'

const { size, text, link, selected } = defineProps([
    'size',
    'text',
    'link',
    'selected'
])
const imgStyle: { [key in BottonSize]: string } = {
    [BottonSize.Middle]: 'botton-xs-img',
    [BottonSize.Large]: 'botton-xl-img',
    [BottonSize.Submit]: 'botton-sb-img'
}

const imgSource: { [key in BottonSize]: string } = {
    [BottonSize.Middle]: xsURL,
    [BottonSize.Large]: xlURL,
    [BottonSize.Submit]: xsURL
}

const imgHoverSource: { [key in BottonSize]: string } = {
    [BottonSize.Middle]: sdxsURL,
    [BottonSize.Large]: sdxlURL,
    [BottonSize.Submit]: sdxsURL
}
const style = imgStyle[size as BottonSize]
const urlSource = imgSource[size as BottonSize]
const urlHonverSource = imgHoverSource[size as BottonSize]
const textStyle = selected ? 'botton-selected-text' : ''

const imgUrl = ref(urlSource)

const onJump = () => {
    const source = BottonLinkSourcePc[link as BottonLinkType]
    const lang =
        getStore(StorageLangNameEnum.LOCAL_LANGUAGE_NAME) || useLanguages()
    source && window.open(source + `?lang=${lang}`, '_blank')
}

const mouseenter = () => {
    imgUrl.value = urlHonverSource
}
const mouseleave = () => {
    imgUrl.value = urlSource
}
</script>

<template>
    <div>
        <div
            class="botton-wrap"
            @click="onJump"
            @mouseenter="mouseenter"
            @mouseleave="mouseleave"
        >
            <span :class="['botton-text', textStyle]">{{ $t(text) }}</span>
            <img :src="imgUrl" :class="[style]" alt="" />
        </div>
    </div>
</template>



<style lang="less" scoped>
.botton-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    // border: 1px solid #red;
}

.botton-text {
    position: absolute;
    z-index: 10;
    font-weight: 400;
    font-size: 25px;
}

.botton-xl-img {
    width: 750px;
    height: auto;
    position: relative;
}
.botton-xs-img {
    width: 360px;
    height: auto;
    position: relative;
}
.botton-sb-img {
    width: 300px;
    height: auto;
    position: relative;
}
.botton-selected-img {
    width: 360px;
    height: auto;
    position: relative;
}
.botton-selected-text {
    width: 340px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    border: 2px solid #ff8727;
    border-radius: 50px;
    display: inline-block;
}
</style>