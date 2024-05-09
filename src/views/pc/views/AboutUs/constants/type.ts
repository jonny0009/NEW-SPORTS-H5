
import { i18n } from '@/i18n'
import { MultipleLangFileNameEunm } from '@/model'

import stURL from '@/assets/image/sf_1st_icon.png'
import ndURL from '@/assets/image/sf_2nd_icon.png'
import rdURL from '@/assets/image/sf_3rd_icon.png'
import thURL from '@/assets/image/sf_4th_icon.png'

/**
 * @params useSelfContentOptions
 * 1.必须是一个函数返回  否则computed失效
 * 2.数组必须封装在函数内部 否则i18n无法检查更新
*/

export const useSelfContentOptions = () => ([
    [
        {
            icon: stURL,
            animationDelay:0.1,
            key: MultipleLangFileNameEunm.InternationalCertification,
            title: i18n.global.t(MultipleLangFileNameEunm.InternationalCertification),
            content: i18n.global.t(MultipleLangFileNameEunm.InternationalCertificationContent)
        },
        {
            icon: rdURL,
            animationDelay:0.2,
            key: MultipleLangFileNameEunm.TrueAndFair,
            title: i18n.global.t(MultipleLangFileNameEunm.TrueAndFair),
            content: i18n.global.t(MultipleLangFileNameEunm.TrueAndFairContent)
        },
    ],
    [
        {
            icon: ndURL,
            animationDelay:0.3,
            key: MultipleLangFileNameEunm.VariousWaysToPlay,
            title: i18n.global.t(MultipleLangFileNameEunm.VariousWaysToPlay),
            content: i18n.global.t(MultipleLangFileNameEunm.VariousWaysToPlayContent)
        },
        {
            icon: thURL,
            animationDelay:0.4,
            key: MultipleLangFileNameEunm.ProfessionalAnchor,
            title: i18n.global.t(MultipleLangFileNameEunm.ProfessionalAnchor),
            content: i18n.global.t(MultipleLangFileNameEunm.ProfessionalAnchorContent)
        },


    ]

])