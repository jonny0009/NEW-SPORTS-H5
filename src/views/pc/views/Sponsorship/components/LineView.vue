<script lang="ts" setup>
import { MultipleLangFileNameEunm } from '@/model'
import lineLeftURL from '@/assets/image/spon_line_left.png'
import lineRightURL from '@/assets/image/spon_line_right.png'
</script>

<template>
    <div>
        <div class="spon-line-wrap">
            <div class="spon-line-position"></div>
            <div class="spon-line-content">
                <img :src="lineLeftURL" class="spon-left-line" />
                <strong class="spon-text">{{
                    $t(MultipleLangFileNameEunm.SerieTeamsSponsorship)
                }}</strong>
                <img :src="lineRightURL" class="spon-right-line" />
            </div>
            <div class="spon-line-position"></div>
        </div>
    </div>
</template>


<style lang="less" scoped>
.spon-line-wrap {
    display: flex;
}
.spon-line-content {
    flex: 2;
    display: flex;
    align-items: center;
}
.spon-line-position {
    flex: 1;
}
.spon-text {
    font-size: 18px;
    color: #ffffff;
    margin: 0 10px;
    text-align: center;
    font-style: italic;
}
.spon-left-line {
    flex: 1;
    height: 1px;
    width: 100%;
    object-fit: contain;
}
.spon-right-line {
    flex: 1;
    height: 1px;
    width: 100%;
    object-fit: contain;
}
</style>