
<script  lang="ts" setup>
const props = defineProps(['options'])
</script>

<template>
    <div>
        <div
            class="lg-nd-wrap"
            v-for="(item, index) in props.options"
            :key="index"
        >
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
        width: 45px;
        height: 45px;
        object-fit: contain;
        cursor: pointer;
        transition: all 0.3s;
    }
    :deep(img:hover) {
        transform: scale(1.1);
    }
}
.lg-nd-text {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    white-space: pre-wrap;
    font-style: italic;
    margin-top: 10px;
    text-align: center;
}
</style>
