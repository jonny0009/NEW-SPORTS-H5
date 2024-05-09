<template>
    <div>
        <van-row justify="space-between" class="bc-addreess-wrap">
            <div
                :key="item.key"
                class="bc-addreess-content"
                v-for="item in contactAddressOptions"
            >
                <img :src="item.icon" class="bc-addreess-icon" />
                <div class="bc-addreess-text-wrap">
                    <div
                        @click="onClick(item.type, i)"
                        v-for="(i, index) in item.addreess"
                        class="bc-addreess-text"
                        :key="index"
                    >
                        {{ i }}
                    </div>
                </div>
            </div>
        </van-row>
    </div>
</template>

<script lang="ts" setup>
import { i18n } from '@/i18n'
import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'
import { MultipleLangFileNameEunm } from '@/model'
import { contactAddressOptions, AddreessType } from '../constants'

const { toClipboard } = useClipboard()

const onClick = (type: AddreessType, mes: string) => {
    type === AddreessType.Copy ? onCopy(mes) : onJump(mes)
}
const onCopy = async (msg: string) => {
    const text = i18n.global.t(MultipleLangFileNameEunm.Copysuccessful)
    try {
        await toClipboard(msg)
        ElMessage({
            type: 'success',
            message: `${text}: ${msg}`
        })
    } catch (e) {}
}

const onJump = (link: string) => {
    link && window.open(`https://t.me/${link}`, '_blank')
}
</script>

<style lang="less" scoped>
.bc-addreess-wrap {
    margin-top: 20px;
}
.bc-addreess-content {
    display: flex;
}
.bc-addreess-icon {
    width: 30px;
    height: 30px;
    object-fit: contain;
}
.bc-addreess-text-wrap {
    margin-left: 15px;
}
.bc-addreess-text {
    margin-bottom: 5px;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
}
.el-divider {
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>