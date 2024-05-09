<!-- <script lang="ts" setup>
import { debounce } from '@/utils'
import { useTabsOptions } from './constants'
import { computed, onMounted, ref } from 'vue'

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
})
</script>

<template>
    <div>
        <div class="nav-tabs-wrap">
            <v-tabs
                v-model="selected"
                color="#ff8727"
                show-arrows="nav-tabs-container"
            >
                <v-tab
                    class="nav-tabs-item"
                    :value="item.key"
                    v-for="item in tabsOptions"
                    :key="`${item.key}_tab`"
                    >{{ $t(item.fileName) }}</v-tab
                >
            </v-tabs>
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
:deep(.v-tab__slider) {
    // width: 50%;
    // left: 50%;
    // transform: translateX(-50%);
    // background: none;
    // height: 5px;
    // background-repeat: no-repeat;
    // background-image: url('@/assets/image/nav_tab_icon.png') !important;
    // background-size: cover;
    // background-size: 100%;
    // background-attachment: fixed;
    // background-position: center center;
}
.nav-tabs-item {
    font-size: 18px;
    color: #fff;
}
</style> -->