<script lang="ts" setup>
import { contactAddressOptions } from '../constants'
import { MultipleLangFileNameEunm } from '@/model'
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
                <span class="bc-addreess-text">{{ item.addreess }}</span>
            </div>
        </van-row>

        <div class="bc-form-wrap">
            <div class="bc-form-part-st">
                <div class="bc-form-st-content">
                    <span class="bc-form-label">
                        {{ $t(MultipleLangFileNameEunm.Name) }}
                    </span>
                    <div class="bc-form-margin"></div>
                    <input class="bc-form-st-input bc-form-input" type="text" />
                </div>
                <div class="bc-form-st-content">
                    <span class="bc-form-label">
                        {{ $t(MultipleLangFileNameEunm.ContactNumber) }}
                    </span>
                    <div class="bc-form-margin"></div>
                    <input class="bc-form-st-input bc-form-input" type="text" />
                </div>
            </div>

            <van-row
                :wrap="false"
                align="center"
                class="bc-form-part-nd"
                justify="space-between"
            >
                <div class="bc-form-label">
                    {{ $t(MultipleLangFileNameEunm.ContactMethod) }}
                </div>
                <div class="bc-form-label">
                    {{ $t(MultipleLangFileNameEunm.Telegram) }}
                </div>
                <input type="text" class="bc-form-nd-input bc-form-input" />
            </van-row>

            <div class="bc-form-part-rd">
                <div class="bc-form-label">
                    {{ $t(MultipleLangFileNameEunm.YourProblem) }}
                </div>
                <textarea
                    rows="5"
                    class="bc-form-rd-textarea bc-form-input"
                ></textarea>
            </div>
        </div>
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
    ::v-deep img {
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
    display: block;
    white-space: pre-wrap;
}
.bc-form-wrap {
    flex: 1;
    padding: 20px 20px 16px 20px;
    background: url(@/assets/image/bc_form_bg.png) no-repeat;
    background-size: 100% 100%;
}
.bc-form-part-st {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.bc-form-st-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.bc-form-label {
    font-size: 24px;
    color: #ffffff;
    white-space: pre-wrap;
}
.bc-form-margin {
    width: 20px;
}
.bc-form-st-input {
    width: 180px;
    height: 29px;
    border-radius: 0;
}

.bc-form-part-nd {
    margin-top: 30px;
}
.bc-form-nd-input {
    width: 300px;
    border-radius: 0;
}
.bc-form-part-rd {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
}
.bc-form-rd-textarea {
    flex: 1;
    margin-top: 8px;
}
.bc-form-input {
    border: none;
    font-size: 24px;
    border-radius: 0;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.34);
}
</style>