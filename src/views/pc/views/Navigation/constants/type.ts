import { i18n } from '@/i18n'
import SportPartStView from '@/views/pc/views/Sport/SportPartStView.vue'
import SportPartNdView from '@/views/pc/views/Sport/SportPartNdView.vue'
import LiveGamePartStView from '@/views/pc/views/LiveGame/LiveGamePartStView.vue'
import LiveGamePartNdView from '@/views/pc/views/LiveGame/LiveGamePartNdView.vue'
import AboutUs from '@/views/pc/views/AboutUs/index.vue'
import Sponsorship from '@/views/pc/views/Sponsorship/index.vue'
import Cooperation from '@/views/pc/views/Cooperation/index.vue'
import { MultipleLangFileNameEunm, SwiperActiveIndex } from '@/model'

/**
 * @params getTabsOptions
 * 1.必须是一个函数返回  否则computed失效
 * 2.数组必须封装在函数内部 否则i18n无法检查更新
*/

export const useTabsOptions = () => {
    return [
        {
            component: SportPartStView,
            key: MultipleLangFileNameEunm.Sport,
            index: SwiperActiveIndex.SportPartSt,
            fileName: i18n.global.t(MultipleLangFileNameEunm.Sport)
        },
        {
            component: SportPartNdView,
            key: MultipleLangFileNameEunm.Sport,
            index: SwiperActiveIndex.SportPartNd,
            fileName: i18n.global.t(MultipleLangFileNameEunm.Sport)
        },
        {
            key: MultipleLangFileNameEunm.LiveGame,
            index: SwiperActiveIndex.LiveGamePartSt,
            fileName: i18n.global.t(MultipleLangFileNameEunm.LiveGame),
            children: [
                { component: LiveGamePartStView, index: SwiperActiveIndex.LiveGamePartSt },
                { component: LiveGamePartNdView, index: SwiperActiveIndex.LiveGamePartNd }
            ]
        },
        {
            component: AboutUs,
            index: SwiperActiveIndex.AboutUs,
            key:MultipleLangFileNameEunm.AboutUs,
            fileName: i18n.global.t(MultipleLangFileNameEunm.AboutUs),
        },
        {
            component: Sponsorship,
            index: SwiperActiveIndex.LiveGamePartSt,
            key:MultipleLangFileNameEunm.Sponsorship,
            fileName: i18n.global.t(MultipleLangFileNameEunm.Sponsorship)
        },
        {
            component: Cooperation,
            index: SwiperActiveIndex.Cooperation,
            key:MultipleLangFileNameEunm.Cooperation,
            fileName: i18n.global.t(MultipleLangFileNameEunm.Cooperation)
        }
    ]
}

export const swiperIndexToTabs: { [key in number]: any } = {
    [0]: MultipleLangFileNameEunm.Sport,
    [1]: MultipleLangFileNameEunm.Sport,
    [2]: MultipleLangFileNameEunm.LiveGame,
    [3]: MultipleLangFileNameEunm.AboutUs,
    [4]: MultipleLangFileNameEunm.Sponsorship,
    [5]: MultipleLangFileNameEunm.Cooperation,
}

export const TabsIndexToSwiper: { [key in string]: any } = {
    [MultipleLangFileNameEunm.Sport]: 0,
    [MultipleLangFileNameEunm.LiveGame]: 2,
    [MultipleLangFileNameEunm.AboutUs]: 3,
    [MultipleLangFileNameEunm.Sponsorship]: 4,
    [MultipleLangFileNameEunm.Cooperation]: 5,
}