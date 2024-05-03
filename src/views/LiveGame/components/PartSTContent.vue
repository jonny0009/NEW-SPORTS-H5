
<script  lang="ts" setup>
import { PartSTcontentOptions } from '@/views/LiveGame/constants'
</script>

<template>
    <div>
        <div
            class="lg-st-content"
            v-for="(item, index) in PartSTcontentOptions"
            :key="index"
        >
            <div class="lg-st-content-top">
                <van-image class="lg-st-icon" :src="item.icon" />
                <div>
                    <span class="lg-st-content-title" v-t="item.title"></span>
                    <span class="lg-st-content-tips" v-t="item.tips"></span>
                </div>
            </div>
            <span class="lg-st-content-bottom" v-t="item.content"></span>
        </div>
    </div>
</template>

<style scoped lang="less">
.lg-st-content {
    padding: 30px;
    margin-top: 30px;
    background: url(@/assets/image/lg_part_st_content.png) no-repeat;
    background-size: 100% 100%;
}
.lg-st-content-top {
    display: flex;
    align-items: center;
}

.lg-st-icon {
    ::v-deep img {
        margin-right: 20px;
        width: 48.4px;
        height: 50px;
        object-fit: contain;
    }
}

.lg-st-content-title {
    display: block;
    font-size: 26px;
    color: #ffffff;
    font-style: italic;
}
.lg-st-content-tips {
    display: block;
    font-size: 20px;
    color: #ffffff;
    font-style: italic;
    margin-top: 10px;
}
.lg-st-content-bottom {
    display: block;
    font-size: 24px;
    margin-top: 30px;
    color: #ffffff;
}
</style>
