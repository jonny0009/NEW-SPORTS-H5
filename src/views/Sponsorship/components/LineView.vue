<script lang="ts" setup>
import { MultipleLangFileNameEunm } from '@/model'
import lineLeftURL from '@/assets/image/spon_line_left.png'
import lineRightURL from '@/assets/image/spon_line_right.png'
</script>

<template>
    <div>
        <div class="spon-line-wrap">
            <van-image :src="lineLeftURL" class="spon-left-line"></van-image>
            <strong class="spon-text">{{
                $t(MultipleLangFileNameEunm.SerieTeamsSponsorship)
            }}</strong>
            <van-image :src="lineRightURL" class="spon-right-line"></van-image>
        </div>
    </div>
</template>


<style lang="less" scoped>
.spon-line-wrap {
    display: flex;
    align-items: center;
}
.spon-text {
    font-size: 24px;
    color: #ffffff;
    margin: 0 10px;
    white-space: pre-wrap;
    text-align: center;
    font-style: italic;
}
.spon-left-line {
    flex: 1;
    :deep(img) {
        height: 1px;
        width: 100%;
        object-fit: contain;
    }
}
.spon-right-line {
    flex: 1;
    :deep(img) {
        height: 1px;
        width: 100%;
        object-fit: contain;
    }
}
</style>