<script lang="ts" setup>
// import { defineProps } from 'vue'
import { MultipleLangFileNameEunm } from '@/model'

// const { size } = defineProps(['size'])
// const style = size === BottonSize.Middle ? 'botton-xs-wrap' : 'botton-xl-wrap'
</script>

<template>
    <div>
        <!-- <div :class="[style, 'botton-wrap']">
            <span class="botton-text">{{
                $t(MultipleLangFileNameEunm.WholeTextBotton)
            }}</span>
        </div> -->
        <div :class="['botton-xs-wrap', 'botton-wrap']">
            <span class="botton-text">{{
                $t(MultipleLangFileNameEunm.WholeTextBotton)
            }}</span>
        </div>
    </div>
</template>



<style lang="less" scoped>
.botton-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
}

.botton-text {
    font-size: 28px;
}
.botton-xl-wrap {
    width: 490px;
    height: 63px;
    background: url(@/assets/image/large_btn_border.png) center center no-repeat;
    background-size: cover;
}
.botton-xs-wrap {
    width: 357px;
    height: 63px;
    background: url(@/assets/image/middle_btn_border.png) center center
        no-repeat;
    background-size: cover;
}
</style>