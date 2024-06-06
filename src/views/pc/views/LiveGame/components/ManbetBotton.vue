<template>
    <div>
        <div class="lg-nd-botton">
            <botton-confirm-pc
                :size="BottonSize.Middle"
                :selected="props.active === BottonType.Sport"
                :text="MultipleLangFileNameEunm.SportsManBetXBotton"
                @click="() => onChangeTab(0)"
            ></botton-confirm-pc>
            <botton-confirm-pc
                v-if="store.luckyCasino"
                :size="BottonSize.Middle"
                :selected="props.active === BottonType.Bacccarat"
                :text="MultipleLangFileNameEunm.LiveGameManBetXBotton"
                @click="() => onChangeTab(1)"
            ></botton-confirm-pc>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { BottonType } from '../constants'
import { MultipleLangFileNameEunm, BottonSize } from '@/model'
import { useSwiperStore } from '@/store'
const props = defineProps(['active'])
const store = useSwiperStore()

const emit = defineEmits(['update:change'])
const onChangeTab = (index: number) => {
    emit('update:change', index)
}
</script>

<style lang="less" scoped>
.lg-nd-botton {
    display: flex;
    justify-content: center;
}
</style>