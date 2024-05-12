<template>
    <div>
        <div class="lg-nd-botton">
            <botton-confirm-pc
                :size="btSport"
                :text="MultipleLangFileNameEunm.SportsManBetXBotton"
                @click="() => onChangeTab(0)"
            ></botton-confirm-pc>
            <botton-confirm-pc
                :size="btBacccarat"
                :text="MultipleLangFileNameEunm.LiveGameManBetXBotton"
                @click="() => onChangeTab(1)"
            ></botton-confirm-pc>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { BottonType } from '../constants'
import { MultipleLangFileNameEunm, BottonSize } from '@/model'
const props = defineProps(['active'])
const emit = defineEmits(['update:change'])
const btSport =
    props.active === BottonType.Sport ? BottonSize.Selected : BottonSize.Middle
const btBacccarat =
    props.active === BottonType.Bacccarat
        ? BottonSize.Selected
        : BottonSize.Middle
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