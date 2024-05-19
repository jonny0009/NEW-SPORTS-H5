<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { onSubmitUserInfo } from '@/api'
import iconURL from '@/assets/image/bc_icon_Triangle.png'
import {
    BottonSize,
    MultipleLangFileNameEunm,
    ContactInformation,
    BottonLinkType
} from '@/model'

const formName = ref('')
const formPhone = ref('')
const formProblem = ref('')
const formContactNumber = ref('')
const formCallType = ref(ContactInformation.Telegram)
const options = ref([
    { value: 1, text: ContactInformation.Telegram },
    { value: 4, text: ContactInformation.Email },
    { value: 3, text: ContactInformation.Skype }
])

const dynamicValidateForm = reactive({
    domains: '',
    email: ''
})

const onSelect = (value: ContactInformation) => {
    console.log(value, 'value')
    formCallType.value = value
}
const onSubmit = async () => {
    const useInfo = {
        nickName: formName.value,
        phone: formPhone.value,
        callType: formCallType.value,
        callPhone: formContactNumber.value,
        question: formProblem.value
    }
    try {
        await onSubmitUserInfo(useInfo)
    } catch (err) {}
}
</script>

<template>
    <div>
        <div class="bc-form-wrap">
            <!-- <el-row :gutter="10" align="middle" class="ba-form-margin">
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
                                v-model="formName"
                            />
                            <span class="text-error-tips">3242424</span>
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
                                v-model="formPhone"
                            />
                            <span class="text-error-tips">3242424</span>
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
                            <span>{{ formCallType }}</span>
                            <img :src="iconURL" alt="" class="bc-icon-img" />
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    v-for="item in options"
                                    :key="item.value"
                                    :command="item.value"
                                    :style="{
                                        color:
                                            formCallType === item.value
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
                        v-model="formContactNumber"
                    />
                    <span class="text-error-tips">3242424</span>
                </el-col>
            </el-row>

            <div class="bc-form-label ba-form-margin">
                {{ $t(MultipleLangFileNameEunm.YourProblem) }}
            </div>

            <textarea
                rows="5"
                v-model="formProblem"
                class="bc-form-rd-textarea bc-form-textarea"
            ></textarea> -->

            <el-form
                size="medium"
                label-width="80px"
                label-position="left"
                :model="dynamicValidateForm"
                ref="dynamicValidateForm"
                class="demo-dynamic"
            >
                <el-row :gutter="10" align="middle" class="ba-form-margin">
                    <el-col :span="12">
                        <el-form-item
                            :label="$t(MultipleLangFileNameEunm.Name)"
                            :rules="[
                                {
                                    required: true,
                                    message: '请输入邮箱地址',
                                    trigger: 'blur'
                                }
                            ]"
                        >
                            <el-input
                                v-model="dynamicValidateForm.email"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            prop="email"
                            :label="$t(MultipleLangFileNameEunm.ContactNumber)"
                            :rules="[
                                {
                                    required: true,
                                    message: '请输入邮箱地址',
                                    trigger: 'blur'
                                },
                                {
                                    type: 'email',
                                    message: '请输入正确的邮箱地址',
                                    trigger: ['blur', 'change']
                                }
                            ]"
                        >
                            <el-input
                                v-model="dynamicValidateForm.email"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="10" align="middle" class="ba-form-margin">
                    <el-col :span="6">
                        <div class="bc-form-label">
                            {{ $t(MultipleLangFileNameEunm.ContactMethod) }}
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-dropdown trigger="click" @command="onSelect">
                            <div class="bc-form-label">
                                <span>{{ formCallType }}</span>
                                <img
                                    :src="iconURL"
                                    alt=""
                                    class="bc-icon-img"
                                />
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item
                                        v-for="item in options"
                                        :key="item.value"
                                        :command="item.value"
                                        :style="{
                                            color:
                                                formCallType === item.value
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
                        <el-form-item label-width="0px">
                            <el-input
                                v-model="dynamicValidateForm.email"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <botton-confirm-pc
                        type="primary"
                        @click="onSubmit"
                        :size="BottonSize.Middle"
                        :link="BottonLinkType.Home"
                        :text="MultipleLangFileNameEunm.SubmitTextBotton"
                    ></botton-confirm-pc>
                </el-form-item>
            </el-form>

            <!-- <van-row justify="center" class="bc-content-btn">
                <botton-confirm-pc
                    @click="onSubmit"
                    :size="BottonSize.Middle"
                    :link="BottonLinkType.Home"
                    :text="MultipleLangFileNameEunm.SubmitTextBotton"
                ></botton-confirm-pc>
            </van-row> -->
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
:deep(.el-input__wrapper) {
    border: none;
    box-shadow: none;
    padding: 0;
    border-radius: 0px;
    background: rgba(255, 255, 255, 0.34);
}
:deep(.el-input__inner) {
    color: #ffffff;
    border: 0 !important;
    border-radius: 0px;
    // border-color: red;
    // background: rgba(255, 255, 255, 0.34);
}
:deep(.el-form-item__label) {
    color: #ffffff;
    // line-height: 20px;
}
</style>