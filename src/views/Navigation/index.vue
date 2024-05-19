



<script  lang="ts" >
// import 'amfe-flexible'
import { useI18n } from "vue-i18n";
import logoUrl from "@/assets/image/nav_logo.png";
import langUrl from "@/assets/image/nav_lang.png";
import langIconUrl from "@/assets/image/nav_lang_icon.png";

import { useLanguages } from "@/hooks";

import {
  useTabsOptions,
  SELECTED_COLOR,
  TAB_BACK_GROUND,
  TITLE_ACTIVE_COLOR,
  TITLE_INACTIVE_COLOR,
} from "@/views/Navigation/constants";

import {
  LanguageOptions,
  MultipleLangEunm,
  StorageLangNameEnum,
  MultipleLangFileNameEunm,
} from "@/model";

import {
  ref,
  reactive,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
} from "vue";
import $ from "jquery";
import { throttle } from "lodash";
import { useAudioStatus } from "@/store";

export default defineComponent({
  name: "Navigation",
  setup() {
    const { locale } = useI18n();
    const { proxy } = getCurrentInstance() as any;

    const audio = useAudioStatus();
    const tabSelected = ref();
    const tabScrollTop = ref();
    const sections = ref();
    const noScroll = ref(false);
    const eventBus = inject("eventBus");

    const state = reactive<any>({ langOptions: [] });

    const tabsOptions = computed(() => useTabsOptions());

    const localLang = proxy.$storage.getStore(
      StorageLangNameEnum.LOCAL_LANGUAGE_NAME
    );

    const defaultLang = useLanguages();

    const onChangeLangOption = (selected: MultipleLangEunm) => {
      const options = LanguageOptions.map((item) => {
        return {
          ...item,
          color: item.value === selected ? SELECTED_COLOR : "",
        };
      });
      state.langOptions = options;
    };

    const onSelectLang = (item: any) => {
      const { value } = item;
      locale.value = value;
      onChangeLangOption(value);
      proxy.$storage.setStore(StorageLangNameEnum.LOCAL_LANGUAGE_NAME, value);
    };


    const handleAudioChange = () => {
      audio.toggle();
      eventBus.emit(
        "pageChange",
        tabSelected.value,
        false
      );
    };

    onChangeLangOption(localLang || defaultLang);

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

      TAB_BACK_GROUND,
      TITLE_ACTIVE_COLOR,
      TITLE_INACTIVE_COLOR,

      onSelectLang,
      sections,
      noScroll,
      eventBus,
      MultipleLangFileNameEunm,
    };
  },
  mounted() {
    // 监听滚动事件
    // $(window).scroll(
    //   throttle(() => {
    //     this.onScrollTab();
    //   }, 50)
    // );
    window.addEventListener('scroll', throttle((event) => {
      event.preventDefault();
      this.onScrollTab();
    }, 50), { passive: false });
    this.sections = $(".section");
    this.tabSelected = this.tabsOptions[0].key;
  },
  methods: {
    onScrollTab() {
      this.tabScrollTop = $(window).scrollTop();
      if (this.noScroll) return;
      const height = this.tabScrollTop + 10;
      const windowHeight = $(window).height() || 0;
      let tab = this.tabsOptions[0].key;
      this.sections.each((index, item) => {
        const nowTab = $(item).attr("id-component");
        if (height >= ($(item).offset().top - Math.floor(windowHeight / 2))) {
          tab = nowTab
        }
      });
      if (tab !== this.tabSelected) {
        this.tabSelected = tab;
        this.eventBus.emit("pageChange", tab);
      }
    },
    onSelectTab({ name }) {
      this.tabSelected = name;
      this.noScroll = true;
      let addHeight = -20
      if (name === MultipleLangFileNameEunm.Logo) {
        addHeight = 0
      }
      
      $("html, body").animate(
        {
          scrollTop:
            $(`#${name}_componentEmelent`).offset().top + addHeight,
        },
        300,
        () => {
          this.eventBus.emit("pageChange", name);
          this.noScroll = false;
        }
      );
    },
  },
});
</script>

<template>
  <div
    :class="[
      'h5-box',
      tabSelected === MultipleLangFileNameEunm.Logo ? 'hideLogoLine' : '',
    ]"
  >
    <div
      class="navlogobox"
      @click="onSelectTab({ name: MultipleLangFileNameEunm.Logo })"
      :style="{
        position: !!tabScrollTop ? 'fixed' : 'absolute',
        background: !!tabScrollTop ? '#000' : 'none',
        left: 0,
        paddingRight: '10px',
      }"
    >
      <van-image class="nav-logo-img" :src="logoUrl" />
    </div>
    <div
      class="navlogobox"
      :style="{
        position: !!tabScrollTop ? 'fixed' : 'absolute',
        background: !!tabScrollTop ? '#000' : 'none',
        right: 0,
      }"
    >
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
            <van-image class="nav-lang-icon" :src="langIconUrl" />
          </van-row>
        </template>
      </van-popover>
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

    <van-tabs
      class="navlogobox"
      :style="{
        position: !!tabScrollTop ? 'fixed' : 'absolute',
        background: !!tabScrollTop ? '#000' : 'none',
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
          <div style="opacity: 0; visibility: hidden; cursor: none"></div>
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
        background: !!tabScrollTop ? '#000' : 'none',
      }"
    ></div>
  </div>
</template>

<style scoped lang="less">
.audio-logo-box {
  position: fixed;
  top: 120px;
  right: 40px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .audio-logo {
    width: 36px;
    height: 36px;
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
  background: url("@/assets/image/nav_tab_icon.png") no-repeat;
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
</style>
