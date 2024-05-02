<script  lang="ts" setup>
import { computed } from 'vue'
import { useSelfContentOptions } from '../constants'
const options = computed(() => useSelfContentOptions())
</script>


<template>
    <div>
        <div v-for="item in options" :key="item.key" class="sf-content-wrap">
            <van-row :wrap="false">
                <van-image :src="item.icon" class="sf-content-icon" />
                <div class="sf-content-contanir">
                    <strong class="sf-content-title">{{
                        $t(item.title)
                    }}</strong>
                    <span class="sf-content-text">{{ $t(item.content) }}</span>
                </div>
            </van-row>
        </div>
    </div>
</template>



<style scoped  lang="less">
@lineheight: 30px;

.sf-content-wrap {
    margin-top: 45px;
}
.sf-content-icon {
    ::v-deep img {
        width: 50px;
        height: 44.2px;
        object-fit: contain;
    }
}
.sf-content-contanir {
    margin-left: 20px;
}
.sf-content-title {
    margin-top: 5px;
    color: #ffffff;
    font-size: 26px;
    display: block;
    font-style: italic;
    line-height: @lineheight;
}

.sf-content-text {
    color: #ffffff;
    font-size: 24px;
    display: block;
    margin-top: 10px;
    font-style: italic;
    line-height: @lineheight;
}
</style>