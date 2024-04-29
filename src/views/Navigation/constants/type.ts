import { i18n } from '@/i18n'
import Sport from '@/views/Sport/index.vue'
import LiveGame from '@/views/LiveGame/index.vue'
import { MultipleLangFileNameEunm } from '@/model'

/**
 * @params getTabsOptions
 * 1.必须是一个函数返回  否则computed失效
 * 2.数组必须封装在函数内部 否i18n无法检查更新
*/
export const getTabsOptions = () => { 
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
        // {
        //     component: Sport,
        //     key:MultipleLangFileNameEunm.AboutUs,
        //     fileName: i18n.global.t(MultipleLangFileNameEunm.AboutUs)
        // }
    ]
} 