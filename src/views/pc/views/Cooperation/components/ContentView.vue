<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { i18n } from '@/i18n'
import { onSubmitUserInfo } from '@/api'
import { ElMessage } from 'element-plus'
import { find, get } from 'loadsh'
import iconURL from '@/assets/image/bc_icon_Triangle.png'
import 'element-plus/theme-chalk/el-loading.css'

import {
    BottonSize,
    MultipleLangFileNameEunm,
    ContactInformationOptions
} from '@/model'

const loading = ref(false)
const defalut = get(ContactInformationOptions, '0')
const callTypeText = ref(defalut.text)

const infoInit = {
    nickName: '',
    phone: '',
    callType: defalut.value,
    callPhone: '',
    question: ''
}

const useForm = reactive({
    data: { ...infoInit }
})

const onSelect = (value: number) => {
    useForm.data.callType = value
    const item = find(ContactInformationOptions, { value })
    callTypeText.value = item.text
}

const onErrorMsg = (msg: string) => {
    const text = i18n.global.t(msg)
    const tips = i18n.global.t(MultipleLangFileNameEunm.PleaseEnter)
    ElMessage({
        type: 'error',
        message: `${tips}: ${text}`
    })
}

const onSubmit = async () => {
    if (!useForm.data.nickName) {
        return onErrorMsg(MultipleLangFileNameEunm.Name)
    }
    if (!useForm.data.phone) {
        return onErrorMsg(MultipleLangFileNameEunm.ContactNumber)
    }
    if (!useForm.data.callPhone) {
        return onErrorMsg(MultipleLangFileNameEunm.ContactMethod)
    }

    const useInfo = {
        nickName: useForm.data.nickName,
        phone: useForm.data.phone,
        callType: useForm.data.callType,
        callPhone: useForm.data.callPhone,
        question: useForm.data.question
    }

    try {
        loading.value = true
        await onSubmitUserInfo(useInfo)
        loading.value = false
        useForm.data = { ...infoInit }
        callTypeText.value = defalut.text

        const text = i18n.global.t(
            MultipleLangFileNameEunm.SubmitTextSuccessful
        )
        ElMessage({
            type: 'success',
            message: text
        })
    } catch (err) {
        const text = i18n.global.t(MultipleLangFileNameEunm.SubmitTextFail)
        ElMessage({
            type: 'error',
            message: text
        })
        loading.value = false
    }
}
</script>

<template>
    <div>
        <div class="bc-form-wrap" v-loading.fullscreen.lock="loading">
            <el-row :gutter="10" align="middle" class="ba-form-margin">
                <el-col :span="12">
                    <el-row align="middle">
                        <el-col :span="8">
                            <div class="bc-form-label">
                                {{ $t(MultipleLangFileNameEunm.Name) }}
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <input
                                type="text"
                                class="bc-form-input"
                                v-model="useForm.data.nickName"
                            />
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row align="middle">
                        <el-col :span="8">
                            <div class="bc-form-label">
                                {{ $t(MultipleLangFileNameEunm.ContactNumber) }}
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <input
                                type="text"
                                class="bc-form-input"
                                v-model="useForm.data.phone"
                            />
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <el-row align="middle" class="ba-form-margin">
                <el-col :span="6">
                    <div class="bc-form-label">
                        {{ $t(MultipleLangFileNameEunm.ContactMethod) }}
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-dropdown trigger="click" @command="onSelect">
                        <div class="bc-form-label">
                            <span>{{ callTypeText }}</span>
                            <img :src="iconURL" alt="" class="bc-icon-img" />
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    v-for="item in ContactInformationOptions"
                                    :key="item.value"
                                    :command="item.value"
                                    :style="{
                                        color:
                                            useForm.data.callType === item.value
                                                ? '#ff8727'
                                                : '#000'
                                    }"
                                    >{{ item.text }}</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-col>
                <el-col :span="12">
                    <input
                        type="text"
                        class="bc-form-input"
                        v-model="useForm.data.callPhone"
                    />
                </el-col>
            </el-row>

            <div class="bc-form-label ba-form-margin">
                {{ $t(MultipleLangFileNameEunm.YourProblem) }}
            </div>

            <textarea
                rows="5"
                v-model="useForm.data.question"
                class="bc-form-rd-textarea bc-form-textarea"
            ></textarea>

            <i class="el-icon-delete"></i>

            <van-row justify="center" class="bc-content-btn">
                <botton-confirm-pc
                    @click="onSubmit"
                    :size="BottonSize.Middle"
                    :text="MultipleLangFileNameEunm.SubmitTextBotton"
                ></botton-confirm-pc>
            </van-row>
        </div>
    </div>
</template>



<style lang="less" scoped>
.bc-form-wrap {
    padding: 20px 20px 16px 20px;
    background: url(@/assets/image/bc_form_bg.png) no-repeat;
    background-size: 100% 100%;
}
.bc-form-label {
    font-size: 16px;
    color: #ffffff;
}
.bc-form-rd-textarea {
    margin-top: 8px;
}
.bc-form-input {
    width: 100%;
    border: none;
    font-size: 16px;
    border-radius: 0;
    color: #ffffff;
    display: block;
    height: 30px;
    background: rgba(255, 255, 255, 0.34);
    position: relative;
}
.text-error-tips {
    position: absolute;
    top: 30px;
    font-size: 16px;
    color: red;
}

.bc-form-textarea {
    width: 100%;
    border: none;
    font-size: 16px;
    border-radius: 0;
    color: #ffffff;
    display: block;
    background: rgba(255, 255, 255, 0.34);
}

.ba-form-margin {
    margin-top: 30px;
}
.bc-icon-img {
    width: 8px;
    height: 8px;
    margin-left: 8px;
}
:deep(.el-dropdown) {
    display: flex;
}
:deep(.el-dropdown-menu__item):hover {
    background: none !important;
    color: #ff8727 !important;
}

:deep(.el-dropdown-menu__item) {
    background: none !important;
}
</style>