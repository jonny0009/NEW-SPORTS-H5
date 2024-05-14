import { i18n } from '@/i18n'
import Sport from '@/views/Sport/index.vue'
import LiveGame from '@/views/LiveGame/index.vue'
import AboutUs from '@/views/AboutUs/index.vue'
import Sponsorship from '@/views/Sponsorship/index.vue'
import BusinessCooperation from '@/views/Cooperation/index.vue'
import { MultipleLangFileNameEunm } from '@/model'

/**
 * @params getTabsOptions
 * 1.必须是一个函数返回  否则computed失效
 * 2.数组必须封装在函数内部 否则i18n无法检查更新
*/
export const useTabsOptions = () => { 
    return [
        {
            component: Sport,
            key:MultipleLangFileNameEunm.Sport,
            fileName: i18n.global.t(MultipleLangFileNameEunm.Sport)
        },
        {
            component: LiveGame,
            key:MultipleLangFileNameEunm.LiveGame,
            fileName: i18n.global.t(MultipleLangFileNameEunm.LiveGame)
        },
        {
            component: AboutUs,
            key:MultipleLangFileNameEunm.AboutUs,
            fileName: i18n.global.t(MultipleLangFileNameEunm.AboutUs)
        },
        {
            component: Sponsorship,
            key:MultipleLangFileNameEunm.Sponsorship,
            fileName: i18n.global.t(MultipleLangFileNameEunm.Sponsorship)
        },
        {
            component: BusinessCooperation,
            key:MultipleLangFileNameEunm.Cooperation,
            fileName: i18n.global.t(MultipleLangFileNameEunm.Cooperation)
        }
    ]
}
// export const useTabsOptions = () => { 
//     return [
//         {
//             component: Sport,
//             id:MultipleLangFileNameEunm.Sport,
//             label: i18n.global.t(MultipleLangFileNameEunm.Sport)
//         },
//         {
//             component: LiveGame,
//             id:MultipleLangFileNameEunm.LiveGame,
//             label: i18n.global.t(MultipleLangFileNameEunm.LiveGame)
//         },
//         {
//             component: AboutUs,
//             id:MultipleLangFileNameEunm.AboutUs,
//             label: i18n.global.t(MultipleLangFileNameEunm.AboutUs)
//         },
//         {
//             component: Sponsorship,
//             id:MultipleLangFileNameEunm.Sponsorship,
//             label: i18n.global.t(MultipleLangFileNameEunm.Sponsorship)
//         },
//         {
//             component: BusinessCooperation,
//             id:MultipleLangFileNameEunm.Cooperation,
//             label: i18n.global.t(MultipleLangFileNameEunm.Cooperation)
//         }
//     ]
// }