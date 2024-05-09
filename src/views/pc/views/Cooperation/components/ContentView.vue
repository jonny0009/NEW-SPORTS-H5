<script lang="ts" setup>
import { MultipleLangFileNameEunm, BottonSize } from '@/model'
</script>

<template>
    <div>
        <div class="bc-form-wrap">
            <el-row :gutter="10" align="middle" class="ba-form-margin">
                <el-col :span="12">
                    <el-row align="middle">
                        <el-col :span="8">
                            <div class="bc-form-label">
                                {{ $t(MultipleLangFileNameEunm.Name) }}
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <input type="text" class="bc-form-input" />
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
                            <input type="text" class="bc-form-input" />
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
                    <div class="bc-form-label">
                        {{ $t(MultipleLangFileNameEunm.Telegram) }}
                    </div>
                </el-col>
                <el-col :span="12">
                    <input type="text" class="bc-form-input" />
                </el-col>
            </el-row>

            <div class="bc-form-label ba-form-margin">
                {{ $t(MultipleLangFileNameEunm.YourProblem) }}
            </div>

            <textarea
                rows="5"
                class="bc-form-rd-textarea bc-form-input"
            ></textarea>

            <van-row justify="center" class="bc-content-btn">
                <botton-confirm-pc
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
    background: rgba(255, 255, 255, 0.34);
}

.ba-form-margin {
    margin-top: 30px;
}
</style>