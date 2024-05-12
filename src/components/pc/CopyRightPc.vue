<script lang="ts" setup>
import { MultipleLangFileNameEunm } from '@/model'
</script>

<template>
    <div style="">
        <div class="copy-right-text">
            {{ $t(MultipleLangFileNameEunm.CopyRight) }}
        </div>
    </div>
</template>



<style lang="less" scoped>
.copy-right-text {
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    width: 500px;
    margin: 0 auto;
    white-space: pre-wrap;
}
</style>