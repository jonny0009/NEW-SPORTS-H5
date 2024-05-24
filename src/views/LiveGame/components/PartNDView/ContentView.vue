
<script  lang="ts" setup>
import { personOptions } from '../../constants'
</script>

<template>
    <div class="sp-nd-wrap">
        <div class="sp-nd-content">
            <div
                class="sp-nd-content-wrap"
                v-for="(item, index) in personOptions"
                :key="index"
            >
                <van-image class="sp-nd-icon" :src="item.icon" />
                <span class="sp-nd-content">{{ $t(item.fileName) }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.sp-nd-wrap {
    margin-top: 30px;
}
.sp-nd-content {
    display: flex;
    justify-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}
.sp-nd-content-wrap {
    width: 50%;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}
.sp-nd-icon {
    :deep(img) {
        width: 50px;
        height: auto;
        object-fit: contain;
        margin-right: 10px;
    }
}
.sp-nd-content {
    font-weight: 900;
    font-size: 22px;
    color: #ffffff;
    white-space: pre-wrap;
    font-style: italic;
}
</style>
