<script  lang="ts" >
// import 'amfe-flexible'
import { useI18n } from 'vue-i18n'
import logoUrl from '@/assets/image/nav_logo.png'
import langUrl from '@/assets/image/nav_lang.png'
import langIconUrl from '@/assets/image/nav_lang_icon.png'

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
    DefaultLanguage,
    StorageLangNameEnum,
    MultipleLangFileNameEunm
} from '@/model'

import {
    ref,
    reactive,
    computed,
    defineComponent,
    getCurrentInstance
} from 'vue'

interface TabItem {
    name: number
    isFixed: boolean
    scrollTop: number
}

export default defineComponent({
    name: 'Navigation',
    setup() {
        const { locale } = useI18n()
        const { proxy } = getCurrentInstance() as any

        const tabSelected = ref(0)
        const tabScrollTop = ref(0)

        const state = reactive<any>({ langOptions: [] })

        const tabsOptions = computed(() => useTabsOptions())

        const localLang = proxy.$storage.getStore(
            StorageLangNameEnum.LOCAL_LANGUAGE_NAME
        )

        const onChangeLangOption = (selected: MultipleLangEunm) => {
            const options = LanguageOptions.map((item) => {
                return {
                    ...item,
                    color: item.value === selected ? SELECTED_COLOR : ''
                }
            })
            state.langOptions = options
        }

        const onSelectLang = (item: any) => {
            const { value } = item
            locale.value = value
            onChangeLangOption(value)
            proxy.$storage.setStore(
                StorageLangNameEnum.LOCAL_LANGUAGE_NAME,
                value
            )
        }

        const onScrollTab = ({ scrollTop }: TabItem) => {
            tabScrollTop.value = scrollTop
        }

        const onSelectTab = ({ name }: TabItem) => {
            tabSelected.value = name
        }

        onChangeLangOption(localLang || DefaultLanguage)

        return {
            state,

            langUrl,
            logoUrl,
            langIconUrl,

            tabsOptions,
            tabSelected,
            tabScrollTop,

            TAB_BACK_GROUND,
            TITLE_ACTIVE_COLOR,
            TITLE_INACTIVE_COLOR,

            onSelectTab,
            onScrollTab,
            onSelectLang,
            MultipleLangFileNameEunm
        }
    }
})
</script>

<template>
    <div>
        <div
            class="nav-group-wrap"
            :style="{
                position: !!tabScrollTop ? 'fixed' : 'absolute'
            }"
        >
            <van-row justify="space-between">
                <van-image class="nav-logo-img" :src="logoUrl" />
                <van-popover
                    :offset="[-10, 20]"
                    :show-arrow="false"
                    :actions="state.langOptions"
                    placement="bottom-end"
                    @select="onSelectLang"
                >
                    <template #reference>
                        <van-row class="nav-lang-wrap" align="center">
                            <van-image class="nav-lang-img" :src="langUrl" />
                            <van-image
                                class="nav-lang-icon"
                                :src="langIconUrl"
                            />
                        </van-row>
                    </template>
                </van-popover>
            </van-row>
        </div>

        <van-tabs
            sticky
            scrollspy
            :ellipsis="false"
            :active="tabSelected"
            @scroll="onScrollTab"
            @click-tab="onSelectTab"
            :background="TAB_BACK_GROUND"
            :title-active-color="TITLE_ACTIVE_COLOR"
            :title-inactive-color="TITLE_INACTIVE_COLOR"
        >
            <van-tab
                :key="item.key"
                :title="item.fileName"
                v-for="item in tabsOptions"
            >
                <div>
                    <!-- <div v-show="!!index" class="nav-scroll-mask"></div> -->
                    <component :is="item.component"></component>
                </div>
            </van-tab>
        </van-tabs>
        <div
            class="nav-mask-model"
            :style="{
                position: !!tabScrollTop ? 'fixed' : 'absolute',
                background: !!tabScrollTop ? '#000' : 'none'
            }"
        ></div>
    </div>
</template>

<style scoped lang="less">
.nav-lang-wrap {
    margin-left: 12px;
    margin-right: 20px;
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
</style>
