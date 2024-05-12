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
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    white-space: pre-wrap;
    margin: 32px auto;
    line-height: 30px;
}
</style>