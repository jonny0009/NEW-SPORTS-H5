



<script  lang="ts" >
// import 'amfe-flexible'
import { i18n } from '@/i18n'
import { useI18n } from 'vue-i18n'
import logoUrl from '@/assets/image/nav_logo.png'
import langUrl from '@/assets/image/nav_lang.png'
import langIconUrl from '@/assets/image/nav_lang_icon.png'

import { useLanguages } from '@/hooks'

import {
    useTabsOptions,
    SELECTED_COLOR,
    TAB_BACK_GROUND,
    TITLE_ACTIVE_COLOR,
    TITLE_INACTIVE_COLOR
} from '@/views/Navigation/constants'

import {
    LanguageOptions,
    MultipleLangEunm,
    StorageLangNameEnum,
    MultipleLangFileNameEunm
} from '@/model'

import {
    ref,
    reactive,
    computed,
    defineComponent,
    getCurrentInstance,
    inject
} from 'vue'
import $ from 'jquery'
import { getShowVideo } from '@/utils/system'
import { throttle, get } from 'lodash'
import { useAudioStatus, useSwiperStore } from '@/store'
import { text } from 'stream/consumers'

export default defineComponent({
    name: 'Navigation',
    setup() {
        const { locale } = useI18n()
        const showVidoe = ref(false)
        const { proxy } = getCurrentInstance() as any

        const audio = useAudioStatus()
        const tabSelected = ref()
        const tabScrollTop = ref()
        const sections = ref()
        const noScroll = ref(false)
        const showPicker = ref(false)
        const store = useSwiperStore()

        const eventBus = inject('eventBus')

        const state = reactive<any>({ langOptions: [] })

        const tabsOptions = computed(() => useTabsOptions(store.luckyCasino))
        const pickerOptions = computed(() => {
            return LanguageOptions.map((item) => ({
                text: `<img class="lang-icon" src='${item.icon}'><span class="lang-text">${item.text}</span>`,
                value: item.value
            }))
        })
        const cancelText = computed(() =>
            i18n.global.t(MultipleLangFileNameEunm.CancelText)
        )
        const confirmText = computed(() =>
            i18n.global.t(MultipleLangFileNameEunm.ConfirmText)
        )

        const defaultLang = useLanguages()
        const localLang = proxy.$storage.getStore(
            StorageLangNameEnum.LOCAL_LANGUAGE_NAME
        )
        const selectLang = ref([localLang || defaultLang])

        const onSelectLang = ({ selectedOptions }: any) => {
            const { value } = get(selectedOptions, '0')
            locale.value = value
            proxy.$storage.setStore(
                StorageLangNameEnum.LOCAL_LANGUAGE_NAME,
                value
            )
            showPicker.value = false
        }

        const handleAudioChange = () => {
            audio.toggle()
            eventBus.emit('pageChange', tabSelected.value, false)
        }

        return {
            state,

            audio,
            handleAudioChange,

            langUrl,
            logoUrl,
            langIconUrl,

            tabsOptions,
            tabSelected,
            tabScrollTop,
            showPicker,
            showVidoe,

            TAB_BACK_GROUND,
            TITLE_ACTIVE_COLOR,
            TITLE_INACTIVE_COLOR,

            onSelectLang,
            sections,
            noScroll,
            eventBus,
            MultipleLangFileNameEunm,

            selectLang,
            pickerOptions,

            cancelText,
            confirmText
        }
    },
    mounted() {
        // 监听滚动事件
        // $(window).scroll(
        //   throttle(() => {
        //     this.onScrollTab();
        //   }, 50)
        // );
        const res = getShowVideo()
        this.showVidoe = res.show
        window.addEventListener(
            'scroll',
            throttle((event) => {
                event.preventDefault()
                this.onScrollTab()
            }, 50),
            { passive: false }
        )
        this.sections = $('.section')
        this.tabSelected = this.tabsOptions[0].key
    },
    methods: {
        onScrollTab() {
            this.tabScrollTop = $(window).scrollTop()
            if (this.noScroll) return
            const height = this.tabScrollTop + 10
            const windowHeight = $(window).height() || 0
            let tab = this.tabsOptions[0].key
            this.sections.each((index, item) => {
                const nowTab = $(item).attr('id-component')
                if (
                    height >=
                    $(item).offset().top - Math.floor(windowHeight / 2)
                ) {
                    tab = nowTab
                }
            })
            if (tab !== this.tabSelected) {
                this.tabSelected = tab
                this.eventBus.emit('pageChange', tab)
            }
        },
        onSelectTab({ name }) {
            this.tabSelected = name
            this.noScroll = true
            let addHeight = -20
            if (name === MultipleLangFileNameEunm.Logo) {
                addHeight = 0
            }

            $('html, body').animate(
                {
                    scrollTop:
                        $(`#${name}_componentEmelent`).offset().top + addHeight
                },
                300,
                () => {
                    this.eventBus.emit('pageChange', name)
                    this.noScroll = false
                }
            )
        }
    }
})
</script>

<template>
    <div
        :class="[
            'h5-box',
            tabSelected === MultipleLangFileNameEunm.Logo ? 'hideLogoLine' : ''
        ]"
    >
        <div
            class="navlogobox"
            @click="onSelectTab({ name: MultipleLangFileNameEunm.Logo })"
            :style="{
                position: !!tabScrollTop ? 'fixed' : 'absolute',
                background: !!tabScrollTop ? '#000' : 'none',
                left: 0,
                paddingRight: '10px'
            }"
        >
            <van-image class="nav-logo-img" :src="logoUrl" />
        </div>
        <div
            class="navlogobox"
            :style="{
                position: !!tabScrollTop ? 'fixed' : 'absolute',
                background: !!tabScrollTop ? '#000' : 'none',
                right: 0
            }"
        >
            <van-row
                align="center"
                class="nav-lang-wrap"
                @click="showPicker = true"
            >
                <van-image class="nav-lang-img" :src="langUrl" />
                <van-image class="nav-lang-icon" :src="langIconUrl" />
            </van-row>
        </div>

        <div v-if="showVidoe" @click="handleAudioChange" class="audio-logo-box">
            <img
                v-if="audio.status"
                src="@/assets/image/audio_open_icon.png"
                alt=""
                class="audio-logo"
            />
            <img
                v-else
                src="@/assets/image/audio_close_icon.png"
                alt=""
                class="audio-logo"
            />
        </div>

        <van-tabs
            class="navlogobox"
            :style="{
                position: !!tabScrollTop ? 'fixed' : 'absolute',
                background: !!tabScrollTop ? '#000' : 'none'
            }"
            :ellipsis="false"
            :active="tabSelected"
            @click-tab="onSelectTab"
            :background="TAB_BACK_GROUND"
            :title-active-color="TITLE_ACTIVE_COLOR"
            :title-inactive-color="TITLE_INACTIVE_COLOR"
            :line-height="
                tabSelected === MultipleLangFileNameEunm.Logo ? 0 : undefined
            "
            :line-width="
                tabSelected === MultipleLangFileNameEunm.Logo ? 0 : undefined
            "
        >
            <van-tab
                :key="item.key"
                :name="item.key"
                :title="item.fileName"
                v-for="item in tabsOptions"
            >
                <template v-if="item?.type === 'logo'" #title>
                    <div
                        style="opacity: 0; visibility: hidden; cursor: none"
                    ></div>
                </template>
                <div></div>
            </van-tab>
        </van-tabs>
        <div
            v-for="item in tabsOptions"
            :id-component="item.key"
            :key="`${item.key}_component`"
            :id="`${item.key}_componentEmelent`"
            class="section"
        >
            <component :is="item.component"></component>
        </div>
        <div
            class="nav-mask-model"
            :style="{
                position: !!tabScrollTop ? 'fixed' : 'absolute',
                background: !!tabScrollTop ? '#000' : 'none'
            }"
        ></div>

        <van-popup v-model:show="showPicker" round position="bottom">
            <van-picker
                :allow-html="true"
                v-model="selectLang"
                :columns="pickerOptions"
                @cancel="showPicker = false"
                @confirm="onSelectLang"
                :cancel-button-text="cancelText"
                :confirm-button-text="confirmText"
            />
        </van-popup>
    </div>
</template>

<style scoped lang="less">
.audio-logo-box {
    position: fixed;
    top: 120px;
    right: 35px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .audio-logo {
        width: 45px;
        height: 45px;
    }
}
.nav-lang-wrap {
    margin-left: 12px;
    margin-right: 20px;
}
.navlogobox {
    position: fixed;
    top: 0;
    z-index: 1000;
    height: 100px;
    width: auto;
    display: flex;
    align-items: center;
    background: red;
}
.nav-logo-img {
    margin-left: 26px;
    :deep(img) {
        width: 36px;
        height: 35px;
        object-fit: contain;
    }
}
.nav-lang-img {
    margin-right: 10px;
    :deep(img) {
        width: 30px;
        height: 30px;
        object-fit: contain;
    }
}

.nav-lang-icon {
    :deep(img) {
        width: 14px;
        height: 8px;
        object-fit: contain;
    }
}

.nav-group-wrap {
    width: 100vw;
    top: 32px;
    z-index: 888;
}
.nav-lang-content {
    width: 200px;
}
.nav-mask-model {
    width: 100vw;
    height: 100px;
    top: 0;
    left: 0;
    z-index: 777;
}

:deep(.van-sticky--fixed) {
    z-index: 999;
}

:deep(.van-popover__content) {
    border-radius: 5px;
}
.nav-scroll-mask {
    width: 100vw;
    height: 30px;
    background-color: #000;
}

:deep(.van-picker__columns) {
    background: rgba(225, 225, 225, 0.5);
}
:deep(.van-ellipsis) {
    display: flex;
    align-items: center;
    .lang-icon {
        width: 30px;
        height: 30px;
        margin-right: 5px;
    }
    .lang-text {
        font-size: 24px;
        font-weight: 500;
    }
}

:deep(.van-tabs__wrap) {
    width: 78vw;
    left: 11vw;
    z-index: 999;
    height: 100px !important;
    position: absolute !important;
    top: 0;
}
:deep(.van-tabs__nav) {
    padding-left: 0px;
    padding-right: 0px;
}
:deep(.van-tabs__line) {
    background: url('@/assets/image/nav_tab_icon.png') no-repeat;
    background-size: cover;
}

.h5-box {
    &.hideLogoLine {
        :deep(.van-tabs__line) {
            width: 0;
            height: 0;
            transform: none !important;
            transition-duration: 0ms !important;
        }
    }
    :deep(#van-tabs-1-0) {
        padding: 0 !important;
    }
}
:deep(.van-picker__confirm) {
    color: #ff8727;
}
// :deep(.van-tab__text) {
//     font-weight: 300;
// }
// :deep(.van-tab--active .van-tab__text) {
//     font-weight: 900;
//     // color: red;
// }
</style>
