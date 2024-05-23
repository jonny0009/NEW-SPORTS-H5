<script  lang="ts" setup>
import { useSwiperStore } from '@/store'
import { computed } from 'vue'
import { useSelfContentOptions } from '../constants'
const options = computed(() => useSelfContentOptions())
const props = defineProps({
    show: Boolean
})
const store = useSwiperStore()
</script>


<template>
    <div>
        <div class="sf-wrap">
            <div
                v-for="(item, index) in options"
                :key="index"
                class="sf-container"
            >
                <div
                    v-for="(child, i) in item"
                    :key="i"
                    :class="[
                        'sf-content',
                        'animate__animated',
                        props.show && 'animate__fadeInRightBig'
                    ]"
                    :style="{
                        'animation-delay':
                            (props.show ? store.dealy : 0) +
                            child.animationDelay +
                            's'
                    }"
                >
                    <img :src="child.icon" class="sf-content-icon" />
                    <div class="sf-content-contanir">
                        <strong class="sf-content-title">{{
                            $t(child.title)
                        }}</strong>
                        <span class="sf-content-text">{{
                            $t(child.content)
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped  lang="less">
@lineheight: 25px;

.sf-wrap {
    margin-top: 67px;
}
.sf-container {
    display: flex;
}
.sf-content-icon {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.sf-content {
    flex: 1;
    display: flex;
    margin-right: 50px;
    margin-bottom: 44px;
}

.sf-content-contanir {
    margin-left: 20px;
}
.sf-content-title {
    color: #ffffff;
    font-size: 18px;
    display: block;
    font-style: italic;
    line-height: @lineheight;
}

.sf-content-text {
    color: #ffffff;
    font-size: 16px;
    display: block;
    margin-top: 10px;
    font-style: italic;
    line-height: @lineheight;
}
</style>