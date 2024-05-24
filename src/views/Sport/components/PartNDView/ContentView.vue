
<script  lang="ts" setup>
import { PartNDcontentOptions } from '../../constants'
</script>

<template>
    <div>
        <div
            class="sp-nd-content"
            v-for="(item, index) in PartNDcontentOptions"
            :key="index"
        >
            <div class="sp-nd-content-top">
                <van-image class="sp-nd-icon" :src="item.icon" />
                <div>
                    <span class="sp-nd-content-title">{{
                        $t(item.title)
                    }}</span>
                    <span class="sp-nd-content-tips">{{ $t(item.tips) }}</span>
                </div>
            </div>
            <span class="sp-nd-content-bottom">{{ $t(item.content) }}</span>
        </div>
    </div>
</template>

<style scoped lang="less">
.sp-nd-content {
    padding: 30px;
    margin-top: 30px;
    background: url(@/assets/image/lg_part_st_content.png) no-repeat;
    background-size: 100% 100%;
}
.sp-nd-content-top {
    display: flex;
    align-items: center;
}

.sp-nd-icon {
    :deep(img) {
        margin-right: 20px;
        width: 80px;
        height: auto;
        object-fit: contain;
    }
}

.sp-nd-content-title {
    display: block;
    font-size: 26px;
    color: #ffffff;
    font-style: italic;
}
.sp-nd-content-tips {
    display: block;
    font-size: 20px;
    color: #ffffff;
    font-style: italic;
    margin-top: 10px;
}
.sp-nd-content-bottom {
    display: block;
    font-size: 24px;
    margin-top: 30px;
    color: #ffffff;
}
</style>
