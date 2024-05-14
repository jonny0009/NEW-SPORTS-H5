
<script  lang="ts" setup>
import { sportsOptions } from '../../constants'
</script>

<template>
    <div class="lg-nd-wrap">
        <div class="lg-nd-content">
            <div
                class="lg-nd-content-wrap"
                v-for="(item, index) in sportsOptions"
                :key="index"
            >
                <van-image class="lg-nd-icon" :src="item.icon" />
                <span class="lg-nd-content">{{ $t(item.fileName) }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.lg-nd-wrap {
    margin-top: 30px;
}
.lg-nd-content {
    display: flex;
    justify-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}
.lg-nd-content-wrap {
    width: 50%;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}
.lg-nd-icon {
    :deep(img) {
        width: 36px;
        height: 36px;
        object-fit: contain;
        margin-right: 10px;
    }
}
.lg-nd-content {
    font-size: 22px;
    color: #ffffff;
    white-space: pre-wrap;
    font-style: italic;
}
</style>
