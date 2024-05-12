<template>
    <div class="tabs-container" ref="tabsContainer">
        <div class="tabs-wrapper" ref="tabsWrapper">
            <div
                v-for="(tab, index) in tabs"
                :key="tab.id"
                class="tab-item"
                :class="{ 'tab-item--active': selected === tab.id }"
                @click="selectTab(index)"
            >
                {{ tab.label }}
            </div>
        </div>
        <div class="tab-indicator" :style="indicatorStyle"></div>
    </div>
</template>
  <script setup>
import { ref, watch, onMounted, nextTick, computed } from 'vue'
const props = defineProps({
    tabs: Array,
    selected: String
})
const emit = defineEmits(['update:selected'])
const tabsContainer = ref(null)
const tabsWrapper = ref(null)
const indicatorWidth = 35 // 下标指示器的宽度 (px)
const indicatorStyle = computed(() => {
    const tabsElements = tabsWrapper.value?.children
    const selectedIndex = props.tabs.findIndex(
        (tab) => tab.id === props.selected
    )
    const selectedTabEl = tabsElements ? tabsElements[selectedIndex] : null

    if (selectedTabEl) {
        const left =
            selectedTabEl.offsetLeft +
            (selectedTabEl.offsetWidth - indicatorWidth) / 2
        return {
            width: `${indicatorWidth}px`,
            left: `${left}px`,
            transition: 'left 0.3s ease-in-out'
        }
    }
    return {}
})
const selectTab = (index) => {
    const selectedId = props.tabs[index].id
    emit('update:selected', selectedId)
}
watch(
    () => props.selected,
    () => {
        nextTick(() => {
            const tabsElements = tabsWrapper.value?.children
            const selectedIndex = props.tabs.findIndex(
                (tab) => tab.id === props.selected
            )
            const selectedTabEl = tabsElements
                ? tabsElements[selectedIndex]
                : null
            if (selectedTabEl) {
                const scrollOffset =
                    selectedTabEl.offsetLeft +
                    selectedTabEl.offsetWidth / 2 -
                    tabsContainer.value.offsetWidth / 2
                tabsContainer.value.scroll({
                    left: scrollOffset,
                    behavior: 'smooth'
                })
            }
        })
    }
)
onMounted(() => {
    nextTick(() => {
        selectTab(0) // 初始化选择第一个 tab
    })
})
</script>
  <style scoped>
.tabs-container {
    overflow-x: auto;
    white-space: nowrap;
    position: relative;
}
.tabs-wrapper {
    display: flex;
}
.tab-item {
    padding: 10px 20px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #fff;
}
.tab-item--active {
    color: #ff8727;
}
.tab-indicator {
    position: absolute;
    bottom: 0;
    height: 3px;
    background: url('@/assets/image/nav_tab_icon.png') no-repeat;
    background-size: cover;
}
</style>
