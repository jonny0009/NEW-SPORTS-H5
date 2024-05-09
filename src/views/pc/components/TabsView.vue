<template>
    <div class="tabs-container" ref="tabsContainer">
        <div class="tabs-wrapper" ref="tabsWrapper">
            <div
                v-for="(tab, index) in tabs"
                :key="index"
                class="tab-item"
                :class="{ active: currentIndex === index }"
                @click="selectTab(index)"
                ref="tabRefs"
            >
                {{ tab }}
            </div>
        </div>
        <div class="tabs-indicator" :style="indicatorStyle"></div>
    </div>
</template>
  <script setup>
import {
    ref,
    reactive,
    computed,
    watch,
    onMounted,
    nextTick,
    defineProps
} from 'vue'
const props = defineProps(['tabs', 'active'])

const tabsContainer = ref(null) // 用于引用 tabs 容器的 DOM 元素
const tabsWrapper = ref(null) // 用于引用包含所有标签的 wrapper 的 DOM 元素
const tabRefs = ref([]) // 用于引用所有标签的 DOM 元素
const indicatorWidth = 43 // 下标识的固定宽度

const emit = defineEmits(['on-change-page'])

const tabs = ref(props.tabs)
const currentIndex = ref(props.active)

watch(
    () => [props.active],
    (newValue) => {
        const [active] = newValue
        selectTab(active)
    },
    { deep: true }
)

// 计算下标识的样式
const indicatorStyle = computed(() => {
    const tab = tabRefs.value[currentIndex.value]
    const tabWidth = tab ? tab.offsetWidth : 0
    const tabLeft = tab ? tab.offsetLeft : 0
    return {
        width: `${indicatorWidth}px`,
        left: `${tabLeft + tabWidth / 2 - indicatorWidth / 2}px`,
        transition: 'left 0.3s ease-in-out'
    }
})
// 选择标签的方法
const selectTab = async (index) => {
    currentIndex.value = index
    await nextTick() // 等待 DOM 更新
    const selectedTab = tabRefs.value[index]
    const scrollOffset =
        selectedTab.offsetLeft +
        selectedTab.offsetWidth / 2 -
        tabsContainer.value.offsetWidth / 2
    tabsContainer.value.scroll({
        left: scrollOffset,
        behavior: 'smooth'
    })
    emit('on-change-page', index)
}
onMounted(async () => {
    await nextTick() // 等待 DOM 更新
    selectTab(0) // 初始化时选中第一个标签
})
</script>
  <style scoped>
.tabs-container {
    overflow-x: auto;
    white-space: nowrap;
    position: relative;
    scrollbar-width: none; /* Firefox */
}
.tabs-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
}
.tabs-wrapper {
    display: flex;
}
.tab-item {
    color: #fff;
    padding: 10px 20px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
}
.active {
    color: #ff8727;
    font-size: 18px;
}
.tabs-indicator {
    position: absolute;
    bottom: 0;
    height: 5px;
    background: url('@/assets/image/nav_tab_icon.png') no-repeat;
    background-size: 100%;
    transition: left 0.3s ease-in-out;
}
</style>