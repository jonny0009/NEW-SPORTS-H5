<script lang="ts" setup>
import { MultipleLangFileNameEunm } from '@/model'
import { defineProps } from 'vue'
import bcURL from '@/assets/image/bc_img.png'
import ContentView from './components/ContentView.vue'
import AddreessView from './components/AddreessView.vue'
const props = defineProps(['paddingTop'])
</script>

<template>
    <div>
        <div class="bc-wrap">
            <div :style="{ height: `${props.paddingTop}px` }"></div>
            <div class="bc-content">
                <div class="bc-container">
                    <div class="bc-container-mask"></div>
                    <div class="bc-container-left">
                        <div class="bc-title">
                            {{
                                $t(MultipleLangFileNameEunm.BusinessCooperation)
                            }}
                        </div>
                        <div class="bc-tips-st bc-tips-text">
                            {{
                                $t(
                                    MultipleLangFileNameEunm.BusinessCooperationStContent
                                )
                            }}
                        </div>
                        <div class="bc-tips-nd bc-tips-text">
                            {{
                                $t(
                                    MultipleLangFileNameEunm.BusinessCooperationNdContent
                                )
                            }}
                        </div>
                        <div class="bc-tips-rd bc-tips-text">
                            {{
                                $t(
                                    MultipleLangFileNameEunm.BusinessCooperationRdContent
                                )
                            }}
                        </div>
                    </div>
                    <div class="bc-container-right">
                        <content-view></content-view>
                    </div>
                    <div class="bc-container-mask"></div>
                </div>

                <el-row>
                    <el-col :span="12" :offset="6">
                        <addreess-view></addreess-view
                    ></el-col>
                </el-row>

                <el-row>
                    <el-col :span="8" :offset="8">
                        <el-row>
                            <img :src="bcURL" class="bc-img" />
                            <div class="bc-text">
                                {{
                                    $t(
                                        MultipleLangFileNameEunm.CompanyInformation
                                    )
                                }}
                            </div>
                            >
                        </el-row>
                    </el-col>
                </el-row>

                <div>
                    <el-divider />
                    <copy-right-pc></copy-right-pc>
                </div>
            </div>
        </div>
    </div>
</template>



<style lang="less" scoped>
.bc-wrap {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: url(@/assets/image/bc_bg.jpg) no-repeat;
    background-size: cover;
}
.bc-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
}
.bc-container {
    display: flex;
    align-items: center;
}
.bc-container-left {
    flex: 2;
}
.bc-container-right {
    flex: 2;
    margin-left: 20px;
}
.bc-title {
    font-size: 40px;
    font-weight: 700;
    color: #ff8727;
    white-space: pre-wrap;
    text-align: left;
    line-height: 45px;
}
.bc-tips-text {
    color: #ffffff;
    font-size: 16px;
    display: block;
    line-height: 25px;
}
.bc-tips-st {
    margin-top: 30px;
}
.bc-tips-nd {
    margin-top: 30px;
}
.bc-tips-rd {
    margin-top: 20px;
}
.bc-img {
    width: 500px;
    height: auto;
    margin: 10px auto 10px auto;
}
.bc-text {
    font-size: 12px;
    margin-top: 15px;
    color: #ffffff;
    text-align: center;
}
.bc-container-mask {
    flex: 1;
}
</style>