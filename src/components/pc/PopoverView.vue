<template>
    <div class="bubble-select-popup" @click="togglePopup" ref="popup">
        <slot name="trigger">
            <button class="popup-trigger">{{ selectedLabel }}</button>
        </slot>
        <transition name="fade">
            <div class="popup-menu" v-show="isPopupVisible" :style="menuStyles">
                <ul>
                    <li
                        v-for="(item, index) in items"
                        :key="index"
                        @click="selectItem(item)"
                        :class="{ 'is-selected': isSelected(item) }"
                    >
                        <slot name="item" :item="item">{{ item.text }}</slot>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>
  <script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
const props = defineProps({
    items: Array,
    modelValue: [String, Number, Object],
    horizontalOffset: {
        type: Number,
        default: 0
    },
    verticalOffset: {
        type: Number,
        default: 0
    }
})
const emit = defineEmits(['update:modelValue'])
const popup = ref(null)
const isPopupVisible = ref(false)
const selectedLabel = computed(() => {
    const selectedItem = props.items.find(
        (item) => item.value === props.modelValue
    )
    return selectedItem ? selectedItem.text : 'Select an option'
})
const menuStyles = computed(() => {
    if (popup.value && isPopupVisible.value) {
        const rect = popup.value.getBoundingClientRect()
        return {
            left: `${rect.left + props.horizontalOffset}px`,
            top: `${rect.bottom + props.verticalOffset}px`
        }
    }
    return {}
})
const togglePopup = () => {
    isPopupVisible.value = !isPopupVisible.value
}
const selectItem = (item) => {
    emit('update:modelValue', item.value)
    isPopupVisible.value = false
}
const isSelected = (item) => {
    return item.value === props.modelValue
}
const handleClickOutside = (event) => {
    if (popup.value && !popup.value.contains(event.target)) {
        isPopupVisible.value = false
    }
}
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
  <style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.bubble-select-popup {
    position: relative;
    display: inline-block;
}
.popup-menu {
    position: absolute;
    z-index: 10;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 0.5em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s;
}
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
li {
    padding: 0.5em 1em;
    cursor: pointer;
}
li:hover,
li.is-selected {
    background-color: #f5f5f5;
}
.popup-trigger {
    cursor: pointer;
}
</style>