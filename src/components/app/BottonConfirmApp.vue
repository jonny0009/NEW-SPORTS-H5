<script lang="ts" setup>
import { defineProps } from 'vue'
import { useLanguages } from '@/hooks'
import { getStore } from '@/config/storage'
import {
    BottonSize,
    BottonLinkSource,
    StorageLangNameEnum,
    BottonLinkType
} from '@/model'
import xsURL from '@/assets/image/middle_btn_border.png'
import xlURL from '@/assets/image/large_btn_border.png'
const { size, text, link } = defineProps(['size', 'text', 'link'])
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
const style = imgStyle[size as BottonSize]
const source = imgSource[size as BottonSize]

const onJump = () => {
    const source = BottonLinkSource[link as BottonLinkType]
    const lang =
        getStore(StorageLangNameEnum.LOCAL_LANGUAGE_NAME) || useLanguages()
    source && window.open(source + `?lang=${lang}`, '_blank')
}
</script>

<template>
    <div>
        <div class="botton-wrap" @click="onJump">
            <span class="botton-text">{{ $t(text) }}</span>
            <van-image :src="source" :class="[style]" alt="" />
        </div>
    </div>
</template>



<style lang="less" scoped>
.botton-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
}

.botton-text {
    position: absolute;
    z-index: 10;
    font-weight: 400;
    font-size: 28px;
}
.botton-xl-img {
    width: auto;
    height: 110px;
    object-fit: contain;
    position: relative;
}
.botton-xs-img {
    width: 450px;
    height: auto;
    position: relative;
}
.botton-sb-img {
    width: 400px;
    height: auto;
    position: relative;
}
.botton-selected-img {
    width: 450px;
    height: auto;
    position: relative;
}
</style>