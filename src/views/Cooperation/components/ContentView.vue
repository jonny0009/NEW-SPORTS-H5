<script lang="ts" setup>
import 'vant/es/toast/style'
import { i18n } from '@/i18n'
import {
    showToast,
    showFailToast,
    showSuccessToast,
    showLoadingToast,
    closeToast
} from 'vant'
import { ref, reactive } from 'vue'
import useClipboard from 'vue-clipboard3'
import { onSubmitUserInfo } from '@/api'
import { get } from 'loadsh'
import iconURL from '@/assets/image/bc_icon_Triangle.png'
import { contactAddressOptions, AddreessType } from '../constants'
import {
    MultipleLangFileNameEunm,
    BottonSize,
    ContactInformationOptions
} from '@/model'

const { toClipboard } = useClipboard()
const showPicker = ref(false)
const defalut = get(ContactInformationOptions, '0')
const callTypeText = ref(defalut.text)
const callTypeValue = ref([defalut.value])

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

const onSelect = ({ selectedOptions }: any) => {
    const item = get(selectedOptions, '0')
    callTypeText.value = item.text
    useForm.data.callType = item.value
    callTypeValue.value = [item.value]
    showPicker.value = false
}

const onErrorMsg = (msg: string) => {
    const text = i18n.global.t(msg)
    const tips = i18n.global.t(MultipleLangFileNameEunm.PleaseEnter)
    showFailToast(`${tips}${text}`)
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

    showLoadingToast({
        duration: 0,
        forbidClick: true
    })

    try {
        await onSubmitUserInfo(useInfo)
        closeToast()
        useForm.data = { ...infoInit }
        callTypeText.value = defalut.text
        const text = i18n.global.t(
            MultipleLangFileNameEunm.SubmitTextSuccessful
        )
        showSuccessToast(text)
    } catch (err) {
        const text = i18n.global.t(MultipleLangFileNameEunm.SubmitTextFail)
        showFailToast(text)
        closeToast()
    }
}

const onCopy = async (msg: string) => {
    const text = i18n.global.t(MultipleLangFileNameEunm.Copysuccessful)
    try {
        await toClipboard(msg)
        showToast(`${text}: ${msg}`)
    } catch (e) {}
}

const onJump = (link: string) => {
    const str = link.replace(/\s*/g, '')
    str && window.open(`https://t.me/${str}`, '_blank')
}

const onClick = (type: AddreessType, mes: string) => {
    type === AddreessType.Copy ? onCopy(mes) : onJump(mes)
}
</script>

<template>
    <div>
        <van-row justify="space-between" class="bc-addreess-wrap">
            <div
                :key="item.key"
                class="bc-addreess-content"
                v-for="item in contactAddressOptions"
            >
                <van-image
                    :src="item.icon"
                    class="bc-addreess-icon"
                ></van-image>
                <div
                    @click="onClick(item.type, i)"
                    v-for="(i, index) in item.addreess"
                    class="bc-addreess-text"
                    :key="index"
                >
                    {{ i }}
                </div>
            </div>
        </van-row>

        <div class="bc-form-wrap">
            <van-row :gutter="10" align="center" class="bc-form-margin">
                <van-col :span="12">
                    <van-row align="center">
                        <van-col :span="10">
                            <div class="bc-form-label">
                                {{ $t(MultipleLangFileNameEunm.Name) }}
                            </div>
                        </van-col>
                        <van-col :span="14" class="bc-form-label">
                            <input
                                class="bc-form-input"
                                type="text"
                                v-model="useForm.data.nickName"
                            />
                        </van-col>
                    </van-row>
                </van-col>

                <van-col :span="12">
                    <van-row align="center">
                        <van-col :span="10">
                            <div class="bc-form-label">
                                {{ $t(MultipleLangFileNameEunm.ContactNumber) }}
                            </div>
                        </van-col>
                        <van-col :span="14" class="bc-form-label">
                            <input
                                class="bc-form-input"
                                type="text"
                                v-model="useForm.data.phone"
                            />
                        </van-col>
                    </van-row>
                </van-col>
            </van-row>

            <van-row class="bc-form-margin">
                <van-col :span="7">
                    <span class="bc-form-label">
                        {{ $t(MultipleLangFileNameEunm.ContactMethod) }}
                    </span>
                </van-col>
                <van-col :span="7">
                    <span class="bc-form-label" @click="showPicker = true">
                        <span>{{ callTypeText }}</span>
                        <van-image :src="iconURL" alt="" class="bc-icon-img" />
                    </span>
                </van-col>
                <van-col :span="10">
                    <input
                        type="text"
                        class="bc-form-nd-input bc-form-input"
                        v-model="useForm.data.callPhone"
                    />
                </van-col>
            </van-row>

            <div class="bc-form-margin">
                <div class="bc-form-textarea">
                    {{ $t(MultipleLangFileNameEunm.YourProblem) }}
                </div>
                <textarea
                    rows="5"
                    v-model="useForm.data.question"
                    class="bc-form-rd-textarea"
                ></textarea>
            </div>

            <van-row justify="center" class="bc-content-btn">
                <botton-confirm-app
                    @click="onSubmit"
                    :size="BottonSize.Middle"
                    :text="MultipleLangFileNameEunm.SubmitTextBotton"
                ></botton-confirm-app>
            </van-row>
        </div>

        <van-popup round position="bottom" v-model:show="showPicker">
            <van-picker
                v-model="callTypeValue"
                :columns="ContactInformationOptions"
                @cancel="showPicker = false"
                @confirm="onSelect"
            />
        </van-popup>
    </div>
</template>



<style lang="less" scoped>
.bc-addreess-wrap {
    margin: 57px auto 60px auto;
}
.bc-addreess-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.bc-addreess-icon {
    :deep(img) {
        width: 51px;
        height: 50px;
        object-fit: contain;
    }
}
.bc-addreess-text {
    margin-top: 20px;
    font-size: 18px;
    line-height: 24px;
    color: #ffffff;
}
.bc-form-wrap {
    flex: 1;
    padding: 20px 20px 16px 20px;
    background: url(@/assets/image/bc_form_bg.png) no-repeat;
    background-size: 100% 100%;
}

.bc-form-margin {
    margin-top: 20px;
}

.bc-form-label {
    width: 100px;
    font-size: 24px;
    color: #ffffff;
    white-space: pre-wrap;
}

.bc-form-textarea {
    font-size: 24px;
    color: #ffffff;
    white-space: pre-wrap;
}

.bc-form-rd-textarea {
    margin-top: 8px;
    width: 100%;
    border: none;
    font-size: 24px;
    border-radius: 0;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.34);
}
.bc-form-input {
    width: 100%;
    border: none;
    font-size: 24px;
    border-radius: 0;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.34);
}
.bc-content-btn {
    margin-top: 30px;
}
:deep(.van-picker__confirm) {
    color: #ff8727;
}
.bc-icon-wrap {
    display: flex;
    align-items: center;
}
.bc-icon-img {
    margin-left: 8px;
    :deep(img) {
        width: 8px;
        height: 8px;
        object-fit: contain;
    }
}
</style>