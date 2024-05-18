<script lang="ts" setup>
import {
    useTabsOptions,
    TAB_BACK_GROUND,
    TITLE_ACTIVE_COLOR,
    TITLE_INACTIVE_COLOR
} from './constants'
import { computed, onMounted, ref } from 'vue'
import $ from 'jquery'
import { throttle } from 'lodash'

const selected = ref('')
const sections = ref()
const tabsOptions = computed(() => useTabsOptions())

const onScrollTab = throttle(() => {
    const height = $(window).scrollTop()
    let tab = tabsOptions.value[0].key
    sections.value.each((index, item) => {
        if (height >= $(item).offset().top) {
            tab = $(item).attr('id-component')
        }
    })
    if (tab !== selected.value) {
        selected.value = tab
    }
}, 50)

onMounted(() => {
    // 监听滚动事件
    $(window).scroll(onScrollTab)
    sections.value = $('.section')
    selected.value = tabsOptions.value[0].fileName
})
const onSelectTab = ({ name }: any) => {
    selected.value = name
    $('html, body').animate(
        {
            scrollTop: $(`#${name}_componentEmelent`).offset().top
        },
        300
    )
}
</script>

<template>
    <div>
        <div class="nav-tabs-wrap">
            <van-tabs
                :ellipsis="false"
                :active="selected"
                @click-tab="onSelectTab"
                :background="TAB_BACK_GROUND"
                :title-active-color="TITLE_ACTIVE_COLOR"
                :title-inactive-color="TITLE_INACTIVE_COLOR"
            >
                <van-tab
                    :key="item.key"
                    :name="item.key"
                    :title="item.fileName"
                    v-for="item in tabsOptions"
                >
                </van-tab>
            </van-tabs>
        </div>

        <div
            v-for="item in tabsOptions"
            :id-component="item.key"
            :key="`${item.key}_component`"
            :id="`${item.key}_componentEmelent`"
            class="section"
        >
            <component :is="item.component"></component>
        </div>
    </div>
</template>



<style lang="less" scoped>
.nav-tabs-wrap {
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: #000;
}
.nav-tabs-container {
    color: red;
}
.nav-tabs-item {
    font-size: 18px;
    color: #fff;
}
:deep(.van-tabs__line) {
    background: url('@/assets/image/nav_tab_icon.png') no-repeat;
    background-size: cover;
}
</style>