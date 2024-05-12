
<script  lang="ts" setup>
import { options } from '../constants'
</script>

<template>
    <div>
        <div class="lg-nd-wrap" v-for="(item, index) in options" :key="index">
            <div class="lg-nd-content" v-for="(child, i) in item" :key="i">
                <van-image class="lg-nd-icon" :src="child.icon" />
                <span class="lg-nd-text">{{ $t(child.fileName) }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.lg-nd-wrap {
    display: flex;
    justify-items: center;
    justify-content: space-between;
}
.lg-nd-content {
    width: 200px;

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 30px 30px 0;
}
.lg-nd-icon {
    :deep(img) {
        width: 36px;
        height: 36px;
        object-fit: contain;
    }
}
.lg-nd-text {
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
    white-space: pre-wrap;
    font-style: italic;
    margin-top: 5px;
    text-align: center;
}
</style>
