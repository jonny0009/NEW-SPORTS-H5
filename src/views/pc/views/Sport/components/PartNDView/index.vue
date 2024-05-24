
<script  lang="ts" setup>
import { useSwiperStore } from '@/store'
import { calculateAnimationDelay } from '@/utils'
import { PartNDcontentOptions } from '../../constants'

const props = defineProps({
    show: Boolean
})

const store = useSwiperStore()
</script>
<!-- animate__bounceInLeft animate__bounceInRight -->
<template>
    <div>
        <div class="sp-nd-wrap">
            <div
                v-for="(item, index) in PartNDcontentOptions"
                :key="index"
                class="sp-nd-content"
            >
                <transition-group name="'list'" tag="div">
                    <div
                        v-for="(child, i) in item"
                        :key="child.id"
                        :class="[
                            'sp-nd-item',
                            'animate__animated',
                            props.show
                                ? index > 0
                                    ? 'animate__bounceInRight'
                                    : 'animate__bounceInLeft'
                                : 'animate__fadeOutUpBig'
                        ]"
                        :style="{
                            'animation-delay': `${
                                props.show
                                    ? store.dealy - 0.4 + i * 0.4
                                    : i * 0.2
                            }s`
                        }"
                    >
                        <div class="sp-nd-content-top">
                            <van-image class="sp-nd-icon" :src="child.icon" />
                            <div>
                                <span class="sp-nd-content-title">{{
                                    $t(child.title)
                                }}</span>
                                <span class="sp-nd-content-tips">{{
                                    $t(child.tips)
                                }}</span>
                            </div>
                        </div>
                        <span class="sp-nd-content-bottom">{{
                            $t(child.content)
                        }}</span>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.sp-nd-wrap {
    display: flex;
    justify-items: center;
}
.sp-nd-content {
    flex: 1;
    // margin-top: 30px;
}
.sp-nd-item {
    padding: 10px 40px;
    height: 125px;
    // margin-top: 30px;
    align-items: center;
    margin-bottom: 20px;
    margin-right: 57px;
    background: url(@/assets/image/pc_sp_part_nd_content.png) no-repeat;
    background-size: 100% 100%;
}
.sp-nd-content-top {
    display: flex;
    align-items: center;
}

.sp-nd-icon {
    :deep(img) {
        margin-right: 5px;
        width: 60px;
        height: auto;
        object-fit: contain;
        cursor: pointer;
        transition: all 0.6s;
    }
    :deep(img:hover) {
        transform: scale(1.2);
    }
}

.sp-nd-content-title {
    display: block;
    font-size: 16px;
    color: #ffffff;
    font-style: italic;
}
.sp-nd-content-tips {
    display: block;
    font-size: 12px;
    color: #ffffff;
    font-style: italic;
    margin-top: 5px;
}
.sp-nd-content-bottom {
    display: block;
    font-size: 14px;
    margin-top: 8px;
    line-height: 18px;
    color: #ffffff;
}
</style>
