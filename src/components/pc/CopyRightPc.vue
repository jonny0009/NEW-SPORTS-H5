<script lang="ts" setup>
import { COPY_RIGHT_TEXT } from '@/model'
</script>

<template>
    <div style="">
        <div class="copy-right-text">{{ COPY_RIGHT_TEXT }}</div>
    </div>
</template>



<style lang="less" scoped>
.copy-right-text {
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    width: 500px;
    margin: 0 auto;
}
</style>