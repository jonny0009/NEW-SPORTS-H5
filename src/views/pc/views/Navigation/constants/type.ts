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
    const tabList = [{
        key: MultipleLangFileNameEunm.ProductAdvantages,
        index: SwiperActiveIndex.ProductAdvantages,
        fileName: i18n.global.t(MultipleLangFileNameEunm.ProductAdvantages)
    }, {
        key: MultipleLangFileNameEunm.Sports,
        index: SwiperActiveIndex.LiveGamePartSt,
        fileName: i18n.global.t(MultipleLangFileNameEunm.Sports)
    },
    {
        key: MultipleLangFileNameEunm.LiveGame,
        index: SwiperActiveIndex.LiveGamePartSt,
        fileName: i18n.global.t(MultipleLangFileNameEunm.LiveGame),
    },
    {
        index: SwiperActiveIndex.AboutUs,
        key: MultipleLangFileNameEunm.AboutUs,
        fileName: i18n.global.t(MultipleLangFileNameEunm.AboutUs),
    },
    {
        index: SwiperActiveIndex.LiveGamePartSt,
        key: MultipleLangFileNameEunm.Sponsorship,
        fileName: i18n.global.t(MultipleLangFileNameEunm.Sponsorship)
    },
    {
        index: SwiperActiveIndex.ContactUs,
        key: MultipleLangFileNameEunm.ContactUs,
        fileName: i18n.global.t(MultipleLangFileNameEunm.ContactUs)
    }]
    const componentList = [
        {
            component: SportPartStView,
            key: MultipleLangFileNameEunm.Logo,
            index: SwiperActiveIndex.Logo,
            fileName: ''
        },
        {
            component: SportPartNdView,
            key: MultipleLangFileNameEunm.ProductAdvantages,
            index: SwiperActiveIndex.ProductAdvantages,
            fileName: i18n.global.t(MultipleLangFileNameEunm.ProductAdvantages)
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
            key: MultipleLangFileNameEunm.AboutUs,
            fileName: i18n.global.t(MultipleLangFileNameEunm.AboutUs),
        },
        {
            component: Sponsorship,
            index: SwiperActiveIndex.LiveGamePartSt,
            key: MultipleLangFileNameEunm.Sponsorship,
            fileName: i18n.global.t(MultipleLangFileNameEunm.Sponsorship)
        },
        {
            component: Cooperation,
            index: SwiperActiveIndex.ContactUs,
            key: MultipleLangFileNameEunm.ContactUs,
            fileName: i18n.global.t(MultipleLangFileNameEunm.ContactUs)
        }
    ]
    return {
        tabList,
        list: componentList,
        logo: {
            key: MultipleLangFileNameEunm.Logo,
            type: 'logo',
            index: SwiperActiveIndex.Logo,
            fileName: 'logo'
        }
    }
}

export const swiperIndexToTabs: { [key in number]: any } = {
    [0]: MultipleLangFileNameEunm.Logo,
    [1]: MultipleLangFileNameEunm.ProductAdvantages,
    [2]: MultipleLangFileNameEunm.Sports,
    [3]: MultipleLangFileNameEunm.AboutUs,
    [4]: MultipleLangFileNameEunm.Sponsorship,
    [5]: MultipleLangFileNameEunm.ContactUs,
}

export const TabsIndexToSwiper: { [key in string]: any } = {
    [MultipleLangFileNameEunm.Logo]: 0,
    [MultipleLangFileNameEunm.ProductAdvantages]: 1,
    [MultipleLangFileNameEunm.Sports]: 2,
    [MultipleLangFileNameEunm.LiveGame]: 2,
    [MultipleLangFileNameEunm.AboutUs]: 3,
    [MultipleLangFileNameEunm.Sponsorship]: 4,
    [MultipleLangFileNameEunm.ContactUs]: 5,
}