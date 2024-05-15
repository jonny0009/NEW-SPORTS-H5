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
const { size, text, link } = defineProps(['size', 'text', 'link'])
const style = size === BottonSize.Middle ? 'botton-xs-wrap' : 'botton-xl-wrap'

const onJump = () => {
    const source = BottonLinkSource[link as BottonLinkType]
    const lang =
        getStore(StorageLangNameEnum.LOCAL_LANGUAGE_NAME) || useLanguages()
    source && window.open(source + `?lang=${lang}`, '_blank')
}
</script>

<template>
    <div>
        <div :class="[style, 'botton-wrap']" @click="onJump">
            <span class="botton-text">{{ $t(text) }}</span>
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
    font-size: 28px;
}
.botton-xl-wrap {
    width: 490px;
    height: 63px;
    background: url(@/assets/image/large_btn_border.png) center center no-repeat;
    background-size: cover;
}
.botton-xs-wrap {
    width: 357px;
    height: 63px;
    background: url(@/assets/image/middle_btn_border.png) center center
        no-repeat;
    background-size: cover;
}
</style>