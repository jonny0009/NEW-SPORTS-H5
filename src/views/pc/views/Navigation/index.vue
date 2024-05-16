<!-- 

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import {
    ref,
    getCurrentInstance,
    onMounted,
    computed,
    watch,
    inject
} from 'vue'
import {
    LanguageOptions,
    MultipleLangFileNameEunm,
    StorageLangNameEnum
} from '@/model'
import { useSwiperStore } from '@/store'
import { Mousewheel, FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
    useTabsOptions,
    swiperIndexToTabs,
    TabsIndexToSwiper
} from './constants'

import 'swiper/css'

const tabSelected = ref('')
const LangSelected = ref('')
const myRowSwiper = ref<any>(null)
const myColumnSwiper = ref<any>(null)
const navRef = ref<any>(null)
const navHeadHeight = ref(0)
const langOptions = ref(LanguageOptions)
const eventBus = inject('eventBus')

const { locale } = useI18n()
const { proxy } = getCurrentInstance() as any
const store = useSwiperStore()

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
        const index = TabsIndexToSwiper[value]
        myRowSwiper.value && myRowSwiper.value.slideTo(index)
        if (value === MultipleLangFileNameEunm.LiveGame) {
            onColumnChangePage(1)
            tabSelected.value = MultipleLangFileNameEunm.LiveGame
        } else if (value === MultipleLangFileNameEunm.Sports) {
            onColumnChangePage(0)
        }
    }
}
//切换swiper
const slideWrapChange = (swiper: any) => {
    console.log(swiper, 'swiper')
    const activeIndex = swiper.activeIndex
    const value = swiperIndexToTabs[activeIndex]
    if (value !== MultipleLangFileNameEunm.LiveGame) {
        tabSelected.value = value
    }
    store.onChangeSwiper(value)
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
    // const activeIndex = swiper.activeIndex
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
    // const { logo } = useTabsOptions()
    // swiperIndex.value = logo.key
    navHeadHeight.value = navRef.value.clientHeight
    LangSelected.value = proxy.$storage.getStore(
        StorageLangNameEnum.LOCAL_LANGUAGE_NAME
    )
})
</script>
<template>
    <div>
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
                :selected="store.index"
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

        <swiper
            class="swiperBox"
            :loop="false"
            :mousewheel="true"
            :touchRatio="0.5"
            @swiper="onRowSwiper"
            direction="vertical"
            :freeMode="false"
            :modules="[Mousewheel, FreeMode]"
            @slideChange="slideWrapChange"
        >
            <swiper-slide v-for="item in components" :key="item.key">
                <swiper-slide v-if="!!item.children">
                    <swiper
                        class="swiperBox"
                        @swiper="onColumnSwiper"
                        @slideChange="slideChildChange"
                    >
                        <swiper-slide
                            v-for="child in item.children"
                            :key="child.index"
                        >
                            <component
                                class="swiper-slide-item"
                                :is="child.component"
                                :paddingTop="navHeadHeight"
                                @update:change="onColumnChangePage"
                            ></component>
                        </swiper-slide>
                    </swiper>
                </swiper-slide>
                <component
                    class="swiper-slide-item"
                    :is="item.component"
                    :paddingTop="navHeadHeight"
                    v-else
                ></component>
            </swiper-slide>

        </swiper>
    </div>
</template>

<style lang="less" scoped>
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
        object-fit: contain;
        cursor: pointer;
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
    // overflow: hidden;
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
</style> -->





<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import {
  ref,
  getCurrentInstance,
  onMounted,
  computed,
  watch,
  inject,
} from "vue";
import {
  LanguageOptions,
  MultipleLangFileNameEunm,
  StorageLangNameEnum,
} from "@/model";
import { Mousewheel } from "swiper/modules";
import { useAudioStatus, useSwiperStore } from "@/store";
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  useTabsOptions,
  swiperIndexToTabs,
  TabsIndexToSwiper,
} from "./constants";

import "swiper/css";

const tabSelected = ref(MultipleLangFileNameEunm.Logo);
const LangSelected = ref("");
const swiperIndex = ref(""); //用于执行动画特效
const myRowSwiper = ref<any>(null);
const myColumnSwiper = ref<any>(null);
const navRef = ref<any>(null);
const navHeadHeight = ref(0);
const langOptions = ref(LanguageOptions);
const eventBus = inject("eventBus");

const store = useSwiperStore();
const audio = useAudioStatus();
const { locale } = useI18n();
const { proxy } = getCurrentInstance() as any;

watch(tabSelected, (newValue) => {
  eventBus.emit("pageChange", newValue);
});

const tabsOptions = computed(() => {
  const { tabList, logo } = useTabsOptions();
  const list = tabList.map((item) => ({
    ...item,
    id: item.key,
    label: item.fileName,
  }));

  return { list, logo };
});

const components = computed(() => {
  return useTabsOptions()?.list;
});
//切换菜单
const onChangePage = (value: string) => {
  if (!!value) {
    tabSelected.value = value;
    const index = TabsIndexToSwiper[value];
    myRowSwiper.value && myRowSwiper.value.slideTo(index);
    if (value === MultipleLangFileNameEunm.LiveGame) {
      onColumnChangePage(1);
      tabSelected.value = MultipleLangFileNameEunm.LiveGame;
    } else if (value === MultipleLangFileNameEunm.Sports) {
      onColumnChangePage(0);
    }
  }
};
//切换swiper
const slideWrapChange = (swiper: any) => {
  const activeIndex = swiper.activeIndex;
  const activeSlideEl = swiper.slides[activeIndex];
  const index = activeSlideEl.dataset.extraInfo;
  const value = swiperIndexToTabs[activeIndex];
  swiperIndex.value = index;
  if (value !== MultipleLangFileNameEunm.LiveGame) {
    tabSelected.value = value;
  }
  if (
    value !== MultipleLangFileNameEunm.Sports ||
    value !== MultipleLangFileNameEunm.LiveGame
  ) {
    myColumnSwiper.value.slideTo(0);
  }
  store.onChangeSwiper(value);
};

const onColumnChangePage = (index: number) => {
  myColumnSwiper.value.slideTo(index);
  tabSelected.value =
    index === 1
      ? MultipleLangFileNameEunm.LiveGame
      : MultipleLangFileNameEunm.Sports;
};

//切换swiper
const slideChildChange = (swiper: any) => {
  const activeIndex = swiper.activeIndex;
  const activeSlideEl = swiper.slides[activeIndex];
  const index = activeSlideEl.dataset.extraInfo;

  swiperIndex.value = index;
};

const handleAudioChange = () => {
  audio.toggle()
  eventBus.emit("pageChange", tabSelected.value);
};

//实例化
const onRowSwiper = (swiper: any) => {
  myRowSwiper.value = swiper;
};
const onColumnSwiper = (swiper: any) => {
  myColumnSwiper.value = swiper;
};
const onSelectLang = (value: string) => {
  location.reload();
  locale.value = value;
  LangSelected.value = value;
  proxy.$storage.setStore(StorageLangNameEnum.LOCAL_LANGUAGE_NAME, value);
};

onMounted(() => {
  const { logo } = useTabsOptions();
  swiperIndex.value = logo.key;
  navHeadHeight.value = navRef.value.clientHeight;
  LangSelected.value = proxy.$storage.getStore(
    StorageLangNameEnum.LOCAL_LANGUAGE_NAME
  );
});
</script>
<template>
  <div>
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
          <img src="@/assets/image/nav_lang.png" alt="" class="nav-lang-img" />
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
                color: LangSelected === item.value ? '#ff8727' : '#000',
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
        class="audio-logo"
      />
      <img
        v-else
        src="@/assets/image/audio_close_icon.png"
        alt=""
        class="audio-logo"
      />
    </div>

    <swiper
      class="swiperBox"
      :loop="false"
      :mousewheel="true"
      @swiper="onRowSwiper"
      direction="vertical"
      :modules="[Mousewheel]"
      @slideChange="slideWrapChange"
    >
      <swiper-slide
        v-for="item in components"
        :key="item.key"
        :data-extra-info="item.index"
      >
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

.audio-logo-box {
  position: fixed;
  top: 100px;
  right: 50px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .audio-logo {
    width: 80px;
    height: 80px;
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