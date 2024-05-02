<script lang="ts" setup>
import { MultipleLangFileNameEunm } from '@/model'
import bcURL from '@/assets/image/bc_img.png'
import ContentView from './components/ContentView.vue'
</script>

<template>
    <div>
        <div class="bc-wrap">
            <span class="bc-title">{{
                $t(MultipleLangFileNameEunm.BusinessCooperation)
            }}</span>
            <span class="bc-tips-st bc-tips-text">{{
                $t(MultipleLangFileNameEunm.BusinessCooperationStContent)
            }}</span>
            <span class="bc-tips-nd bc-tips-text">{{
                $t(MultipleLangFileNameEunm.BusinessCooperationNdContent)
            }}</span>
            <span class="bc-tips-rd bc-tips-text">{{
                $t(MultipleLangFileNameEunm.BusinessCooperationRdContent)
            }}</span>
            <content-view></content-view>

            <van-image :src="bcURL" class="bc-img"></van-image>

            <div class="bc-text">
                {{ $t(MultipleLangFileNameEunm.CompanyInformation) }}
            </div>

            <van-divider />

            <copy-right></copy-right>
        </div>
    </div>
</template>



<style lang="less" scoped>
.bc-wrap {
    padding: 80px 40px 30px 40px;
    background: url(@/assets/image/bc_bg.jpg) no-repeat;
    background-size: cover;
}
.bc-title {
    font-size: 32px;
    color: #ff8727;
    text-align: center;
    display: block;
}
.bc-tips-text {
    color: #ffffff;
    font-size: 24px;
    display: block;
    line-height: 35px;
}
.bc-tips-st {
    margin-top: 30px;
}
.bc-tips-nd {
    margin-top: 30px;
}
.bc-tips-rd {
    margin-top: 40px;
}
.bc-img {
    margin-top: 40px;
    ::v-deep img {
        width: 100%;
        height: 85px;
        object-fit: contain;
    }
}
.bc-text {
    font-size: 24px;
    color: #ffffff;
    margin-top: 20px;
    line-height: 40px;
}
</style>