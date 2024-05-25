<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import {
    ref,
    getCurrentInstance,
    onMounted,
    computed,
    watch,
    inject,
    nextTick
} from 'vue'
import {
    LanguageOptions,
    MultipleLangFileNameEunm,
    StorageLangNameEnum
} from '@/model'
import { debounce, throttle, isNil } from 'lodash'
import { Mousewheel, Autoplay } from 'swiper/modules'
import { useAudioStatus, useSwiperStore } from '@/store'
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
    useTabsOptions,
    swiperIndexToTabs,
    TabsIndexToSwiper
} from './constants'

import 'swiper/css'

const noScroll = ref(false)
const tabSelected = ref('')
const LangSelected = ref('')
const isMousewheel = ref(false)
const swiperIndex = ref('') //用于执行动画特效
const myRowSwiper = ref<any>(null)
const myColumnSwiper = ref<any>(null)
const navRef = ref<any>(null)
const navHeadHeight = ref(0)
const langOptions = ref(LanguageOptions)
const eventBus = inject('eventBus')

const store = useSwiperStore()
const audio = useAudioStatus()
const { locale } = useI18n()
const { proxy } = getCurrentInstance() as any

watch(tabSelected, (newValue) => {
    eventBus.emit('pageChange', newValue)
})

const tabsOptions = computed(() => {
    const { tabList, logo } = useTabsOptions()
    const list = tabList.map((item) => ({
        ...item,
        id: item.key,
        label: item.fileName
    }))

    return { list, logo }
})

const components = computed(() => {
    return useTabsOptions()?.list
})

//切换菜单
const onChangePage = (value: string) => {
    if (!!value) {
        tabSelected.value = value
        let val = value

        // myRowSwiper.value && myRowSwiper.value.slideTo(index)
        if (value === MultipleLangFileNameEunm.LiveGame) {
            onColumnChangePage(1)
            val = MultipleLangFileNameEunm.Sports
            tabSelected.value = MultipleLangFileNameEunm.LiveGame
        } else if (value === MultipleLangFileNameEunm.Sports) {
            onColumnChangePage(0)
        }
        const index = TabsIndexToSwiper[val]
        const lastIndex = TabsIndexToSwiper[store.index]
        handleMovue({
            deltaY: index - lastIndex,
            index,
            tab: tabSelected.value
        })
    }
}
//切换swiper
const slideWrapChange = (swiper: any) => {
    console.log(swiper, 'swiper')
    const activeIndex = swiper.activeIndex
    const activeSlideEl = swiper.slides[activeIndex]
    const index = activeSlideEl.dataset.extraInfo
    const value = swiperIndexToTabs[activeIndex]
    swiperIndex.value = index
    if (value !== MultipleLangFileNameEunm.LiveGame) {
        tabSelected.value = value
    }
    if (
        value !== MultipleLangFileNameEunm.Sports ||
        value !== MultipleLangFileNameEunm.LiveGame
    ) {
        myColumnSwiper.value.slideTo(0)
    }
    store.onChangeSwiper(value)
    if (
        [
            MultipleLangFileNameEunm.ProductAdvantages,
            MultipleLangFileNameEunm.AboutUs,
            MultipleLangFileNameEunm.Sponsorship
        ].includes(value)
    ) {
        // myRowSwiper.value.mousewheel.disable()
        // nextTick(() => {
        //     // isMousewheel.value = false
        //     myRowSwiper.value.mousewheel.disable()
        // })
    }
}

const onColumnChangePage = (index: number) => {
    myColumnSwiper.value.slideTo(index)
    tabSelected.value =
        index === 1
            ? MultipleLangFileNameEunm.LiveGame
            : MultipleLangFileNameEunm.Sports
}

//切换swiper
const slideChildChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex
    const activeSlideEl = swiper.slides[activeIndex]
    const index = activeSlideEl.dataset.extraInfo

    swiperIndex.value = index
}

const handleAudioChange = () => {
    audio.toggle()
    eventBus.emit('pageChange', tabSelected.value, false)
}

//实例化
const onRowSwiper = (swiper: any) => {
    myRowSwiper.value = swiper
}
const onColumnSwiper = (swiper: any) => {
    myColumnSwiper.value = swiper
}
const onSelectLang = (value: string) => {
    location.reload()
    locale.value = value
    LangSelected.value = value
    proxy.$storage.setStore(StorageLangNameEnum.LOCAL_LANGUAGE_NAME, value)
}

onMounted(() => {
    const { logo } = useTabsOptions()
    swiperIndex.value = logo.key
    navHeadHeight.value = navRef.value.clientHeight
    LangSelected.value = proxy.$storage.getStore(
        StorageLangNameEnum.LOCAL_LANGUAGE_NAME
    )
})

const handleMovue = (event) => {
    if (noScroll.value) {
        return
    }
    noScroll.value = true
    const _index = myRowSwiper.value.activeIndex
    const { deltaY, index, tab } = event
    const value = swiperIndexToTabs[_index]
    const nextIndex = index ?? _index + (deltaY < 0 ? -1 : 1)
    const nextSwiper = tab ?? swiperIndexToTabs[nextIndex]

    // console.log('onTouchMove', value, store.index, nextSwiper)
    store.onChangeSwiper(swiperIndexToTabs[nextIndex])
    tabSelected.value = nextSwiper
    // isMousewheel.value = true
    // myRowSwiper.value.mousewheel.enable()
    if (nextSwiper === MultipleLangFileNameEunm.Sports) {
        onColumnChangePage(0)
    }
    if (
        [
            MultipleLangFileNameEunm.ProductAdvantages,
            MultipleLangFileNameEunm.AboutUs,
            MultipleLangFileNameEunm.Sponsorship
        ].includes(value)
    ) {
        store.onChangeDealy(0.6)
        setTimeout(() => {
            myRowSwiper.value.slideTo(nextIndex)
            // myRowSwiper.value.mousewheel.enable()
            nextTick(() => {
                noScroll.value = false
            })
        }, 600)
    } else {
        myRowSwiper.value.slideTo(nextIndex)
        // myRowSwiper.value.mousewheel.enable()
        nextTick(() => {
            noScroll.value = false
        })
    }
}

const onTouchMove = debounce((event) => {
    event.preventDefault()
    const { deltaY } = event

    if (!myRowSwiper.value.mousewheel.enabled) {
        return
    }

    // if (deltaY < 0) {
    //     nextTick(() => {
    //         // console.warn(myRowSwiper.value.mousewheel, 'store.isScollUp')
    //         myRowSwiper.value.mousewheel.enable()
    //     })
    //     return
    // }

    // const { deltaY } = event
    const _index = myRowSwiper.value.activeIndex
    if ((_index === 5 && deltaY > 0) || (_index === 0 && deltaY < 0)) {
        return
    }
    const tab = swiperIndexToTabs[_index]
    if (
        [
            MultipleLangFileNameEunm.ProductAdvantages,
            MultipleLangFileNameEunm.AboutUs,
            MultipleLangFileNameEunm.Sponsorship
        ].includes(tab)
    ) {
        // dealyFn(event)

        handleMovue(event)
    } else {
        const _index = myRowSwiper.value.activeIndex
        const nextIndex = _index + (deltaY < 0 ? -1 : 1)
        const nextSwiper = swiperIndexToTabs[nextIndex]
        store.onChangeSwiper(nextSwiper)
        tabSelected.value = nextSwiper
        myRowSwiper.value.slideTo(nextIndex)
    }
}, 300)

let wheelTimeout: any = null
const isCurrentPage = computed(() => {
    return [
        MultipleLangFileNameEunm.ProductAdvantages,
        MultipleLangFileNameEunm.AboutUs,
        MultipleLangFileNameEunm.Sponsorship
    ].includes(tabSelected.value)
})

// console.log(isCurrentPage, 'isCurrentPage')

const hanleChange = (swiper) => {
    const activeIndex = swiper.activeIndex
    // const activeSlideEl = swiper.slides[activeIndex]
    // const index = activeSlideEl.dataset.extraInfo
    const value = swiperIndexToTabs[activeIndex]
    console.log(value, 'value')
    tabSelected.value = value
}

const handleWheel1 = (event) => {
    // event.preventDefault()
    // myRowSwiper.value.slideNext()
    // myRowSwiper.value.slidePrev()
    // myRowSwiper.value.mousewheel.enable()
    // myRowSwiper.value.mousewheel.disable()
    // const isNext = event.deltaY > 0
    // console.log(event, 'event')

    event?.preventDefault()

    if (wheelTimeout !== null) {
        return
    }
    myRowSwiper.value.mousewheel.disable()
    wheelTimeout = setTimeout(() => {
        const isNext = event.deltaY > 0
        if (isNext) {
            myRowSwiper.value.slideNext()
        } else {
            myRowSwiper.value.slidePrev()
        }

        myRowSwiper.value.mousewheel.enable()
        // store.onChangeSwiper(swiperIndexToTabs[swiper.activeIndex])
        clearTimeout(wheelTimeout)
        wheelTimeout = null
    }, 1000)
}

const onTouchChangeMove = (data) => {
    if (
        [
            MultipleLangFileNameEunm.ProductAdvantages,
            MultipleLangFileNameEunm.AboutUs,
            MultipleLangFileNameEunm.Sponsorship
        ].includes(tabSelected.value)
    ) {
        handleWheel(data)
    } else {
        hanleChange(data)
    }
}

// watch(store, (newvalue) => {
//     console.log(newvalue, 'newvalue')
// })

// const beforeSlideChangeStart = (swiper) => {
//     console.log(swiper, 'swiper')
//     myRowSwiper.value.mousewheel.disable()
//     if (wheelTimeout !== null) {
//         return
//     }
//     wheelTimeout = setTimeout(() => {
//         // store.onChangeSwiper(swiperIndexToTabs[swiper.activeIndex])
//         myRowSwiper.value.mousewheel.enable()
//         store.onChangeSwiper(swiperIndexToTabs[swiper.activeIndex])
//         clearTimeout(wheelTimeout)
//         wheelTimeout = null
//     }, 1000)
// }

// @wheel.prevent="onTouchMove"
// @wheel.prevent="onTouchMove"

const handleWheel = debounce((event) => {
    // 防止默认的滚动行为
    event.preventDefault()
    const swiper = myRowSwiper.value

    // 清除之前的延迟（如果有）
    if (wheelTimeout !== null) {
        clearTimeout(wheelTimeout)
        wheelTimeout = null
    }

    // 向上滚动时，所有页面都不停留
    if (event.deltaY < 0) {
        swiper.slidePrev()
        return
    }

    // 根据当前幻灯片决定是否延迟
    const delayForCurrentSlide = shouldDelayForSlide(swiper.activeIndex)

    // 如果需要延迟，使用 setTimeout
    if (delayForCurrentSlide) {
        wheelTimeout = setTimeout(() => {
            swiper.slideNext()
        }, 2000) // 延迟2秒
    } else {
        swiper.slideNext()
    }
}, 1000)

// 根据幻灯片索引决定是否延迟
const shouldDelayForSlide = (index) => {
    // 假设我们只在第二个幻灯片上延迟
    return index === 1
}
</script>
<template>
    <div class="wrap">
        <div class="nav-wrap" ref="navRef">
            <img
                @click="onChangePage(tabsOptions?.logo?.key)"
                src="@/assets/image/pc_logo.png"
                alt=""
                class="nav-logo-img"
            />
            <tabs-view
                class="nav-tabs"
                :tabs="tabsOptions?.list"
                :selected="tabSelected"
                @update:selected="onChangePage"
            ></tabs-view>
            <el-dropdown trigger="click" @command="onSelectLang">
                <div class="nav-lang-wrap">
                    <img
                        src="@/assets/image/nav_lang.png"
                        alt=""
                        class="nav-lang-img"
                    />
                    <img
                        src="@/assets/image/nav_lang_icon.png"
                        alt=""
                        class="nav-lang-icon"
                    />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            v-for="item in langOptions"
                            :key="item.value"
                            :command="item.value"
                            :style="{
                                color:
                                    LangSelected === item.value
                                        ? '#ff8727'
                                        : '#000'
                            }"
                            >{{ item.text }}</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div @click="handleAudioChange" class="audio-logo-box">
            <img
                v-if="audio.status"
                src="@/assets/image/audio_open_icon.png"
                alt=""
                class="audio-logo-open"
            />
            <img
                v-else
                src="@/assets/image/audio_close_icon.png"
                alt=""
                class="audio-logo-close"
            />
        </div>
        <!-- :modules="[Mousewheel]" -->

        <!-- @slideChange="slideWrapChange" -->

        <!-- :allow-touch-move="false" -->
        <!-- @slideChange="slideWrapChange" -->

        <!-- @slideChange="slideWrapChange" -->

        <!-- @wheel.prevent="handleWheel" -->

        <!-- @slideChange="slideWrapChange" -->
        <!-- {
                thresholdTime: 30
            } -->

        <swiper
            class="swiperBox"
            :loop="false"
            :speed="1000"
            :mousewheel="true"
            @swiper="onRowSwiper"
            direction="vertical"
            :autoplay="false"
            :modules="[Mousewheel]"
            @slideChange="slideWrapChange"
        >
            <swiper-slide
                v-for="item in components"
                :key="item.key"
                :data-extra-info="item.index"
            >
                <span style="color: red">{{ isCurrentPage }}</span>
                <swiper-slide v-if="!!item.children">
                    <swiper
                        class="swiperBox"
                        @swiper="onColumnSwiper"
                        @slideChange="slideChildChange"
                    >
                        <swiper-slide
                            v-for="child in item.children"
                            :key="child.index"
                            :data-extra-info="child.index"
                        >
                            <component
                                class="swiper-slide-item"
                                :is="child.component"
                                :paddingTop="navHeadHeight"
                                :swiperIndex="swiperIndex"
                                @update:change="onColumnChangePage"
                            ></component>
                        </swiper-slide>
                    </swiper>
                </swiper-slide>

                <component
                    class="swiper-slide-item"
                    :is="item.component"
                    :paddingTop="navHeadHeight"
                    :swiperIndex="swiperIndex"
                    v-else
                ></component>
            </swiper-slide>
        </swiper>
    </div>
</template>

<style lang="less" scoped>
.wrap {
    height: 100vh;
    overflow-y: hidden;
}
.audio-logo-box {
    position: fixed;
    top: 100px;
    right: 40px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .audio-logo-open {
        width: 40px;
        height: 40px;
    }
    .audio-logo-close {
        width: 40px;
        height: 40px;
    }
}
.nav-wrap {
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    padding: 9px 20px;
    // background: red;

    .nav-logo-img {
        width: 188.8px;
        height: 48px;
        cursor: pointer;
        object-fit: contain;
    }
    .nav-tabs {
        flex: 1;
        margin-left: 54.2px;
    }
    .nav-lang-wrap {
        display: flex;
        align-items: center;
        .nav-lang-img {
            width: 30px;
            height: 30px;
            object-fit: contain;
        }
        .nav-lang-icon {
            margin-left: 10px;
            width: 14px;
            height: 8px;
            object-fit: contain;
        }
    }
}
.swiperBox {
    height: 100vh;
    overflow: hidden;
}
.font-size {
    font-size: 18px;
}

.swiper-slide-item {
    height: 100%;
}

:deep(.el-dropdown-menu__item):hover {
    background: none !important;
    color: #ff8727 !important;
}

:deep(.el-dropdown-menu__item) {
    background: none !important;
}
</style>