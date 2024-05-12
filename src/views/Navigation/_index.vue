<script lang="ts" setup>
import { debounce } from '@/utils'
import {
    useTabsOptions,
    TAB_BACK_GROUND,
    TITLE_ACTIVE_COLOR,
    TITLE_INACTIVE_COLOR
} from './constants'
import { computed, onMounted, ref } from 'vue'
import { nextTick } from 'process'

const selected = ref('')
const tabsOptions = computed(() => useTabsOptions())

const isScrollAtBottom = () => {
    return (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
    )
}

const onScrollTab = debounce(() => {
    let closestAnchorId: any = ''
    let closestAnchorDistance = Number.MAX_VALUE
    // 假设你有多个锚点区域
    const anchors = document.querySelectorAll('[id-component]')

    const anchorPositions = Array.from(anchors).map((anchor) => {
        return {
            element: anchor,
            id: anchor.getAttribute('id-component')
        }
    })

    // 滚动事件处理函数
    anchorPositions.forEach((anchor) => {
        const rect = anchor.element.getBoundingClientRect()
        // 获取元素顶部距离视口顶部的距离
        const distance = Math.abs(rect.top)
        // 检查这个锚点是否比之前记录的锚点更接近视口顶部
        if (distance < closestAnchorDistance) {
            closestAnchorDistance = distance
            closestAnchorId = anchor.id
        }
    })
    // 更新当前激活的锚点
    if (closestAnchorId !== selected.value) {
        console.log(closestAnchorId, 'closestAnchorId')
        selected.value = closestAnchorId
    }

    //元素高度不够时，滚动底部选择最后一个
    if (isScrollAtBottom()) {
        selected.value = anchorPositions[anchorPositions.length - 1]
            .id as string
    }
}, 50)

onMounted(() => {
    // 监听滚动事件
    window.addEventListener('scroll', onScrollTab)
    selected.value = tabsOptions.value[0].fileName
})
// { name }: TabItem
const onSelectTab = ({ name }: any) => {
    // tabSelected.value = name

    nextTick(() => {
        const anchors = document.querySelectorAll('[id-component]')
        const anchorPositions = Array.from(anchors).map((anchor) => {
            return {
                element: anchor,
                id: anchor.getAttribute('id-component')
            }
        })
        const current = anchorPositions.find((item) => name === item.id)
        console.log(current, name, 'name')
        if (current?.element) {
            current?.element.scrollIntoView({ behavior: 'smooth' })
        }
    })

    return true
}
// before - change
</script>

<!-- :ellipsis="false" -->


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