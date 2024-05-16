
<script  lang="ts" setup>
import { calculateAnimationDelay } from '@/utils'
import { PartNDcontentOptions } from '../../constants'
</script>

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
                            child.animate
                        ]"
                        :style="{
                            'animation-delay':
                                calculateAnimationDelay(i, item.length, 0.1) +
                                's'
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
        margin-right: 20px;
        width: 32px;
        height: 37.5px;
        object-fit: contain;
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
