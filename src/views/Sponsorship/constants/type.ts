import { i18n } from '@/i18n'
import { MultipleLangFileNameEunm } from '@/model'

import spon_icon_1 from '@/assets/image/spon_icon_01.png';
import spon_icon_2 from '@/assets/image/spon_icon_02.png';
import spon_icon_3 from '@/assets/image/spon_icon_03.png';
import spon_icon_4 from '@/assets/image/spon_icon_04.png';
import spon_icon_5 from '@/assets/image/spon_icon_05.png';
import spon_icon_6 from '@/assets/image/spon_icon_06.png';
import spon_icon_7 from '@/assets/image/spon_icon_07.png';
import spon_icon_8 from '@/assets/image/spon_icon_08.png';
import spon_icon_9 from '@/assets/image/spon_icon_09.png';
import spon_icon_10 from '@/assets/image/spon_icon_10.png';
import spon_icon_11 from '@/assets/image/spon_icon_11.png';
import spon_icon_12 from '@/assets/image/spon_icon_12.png';
import spon_icon_13 from '@/assets/image/spon_icon_13.png';
import spon_icon_14 from '@/assets/image/spon_icon_14.png';
import spon_icon_15 from '@/assets/image/spon_icon_15.png';
import spon_icon_16 from '@/assets/image/spon_icon_16.png';
import spon_icon_17 from '@/assets/image/spon_icon_17.png';
import spon_icon_18 from '@/assets/image/spon_icon_18.png';
import spon_icon_19 from '@/assets/image/spon_icon_19.png';

/**
 * @params getTabsOptions
 * 1.必须是一个函数返回  否则computed失效
 * 2.数组必须封装在函数内部 否则i18n无法检查更新
*/

export const useSponContentOptions = () => ([
    {
        icon: spon_icon_1,
        title: i18n.global.t(MultipleLangFileNameEunm.PremierLeagueWolves),
        tips: i18n.global.t(MultipleLangFileNameEunm.JerseysAndMajorSponsors)
    },
    {
        icon: spon_icon_2,
        title: i18n.global.t(MultipleLangFileNameEunm.PremierLeagueCrystalPalace),
        tips: i18n.global.t(MultipleLangFileNameEunm.JerseysAndMajorSponsors)
    },
    {
        icon: spon_icon_3,
        title: i18n.global.t(MultipleLangFileNameEunm.PremierLeagueOfficial),
        tips: i18n.global.t(MultipleLangFileNameEunm.OfficialPartner)
    },
    {
        icon: spon_icon_4,
        title: i18n.global.t(MultipleLangFileNameEunm.RCDEspanyoldeBarcelona),
        tips: i18n.global.t(MultipleLangFileNameEunm.AsiaOfficialPartner)
    },
    {
        icon: spon_icon_5,
        title: i18n.global.t(MultipleLangFileNameEunm.RealMadridCF),
        tips: i18n.global.t(MultipleLangFileNameEunm.AsiaOfficialPartner)
    },
    {
        icon: spon_icon_6,
        title: i18n.global.t(MultipleLangFileNameEunm.LaLigaOfficial),
        tips: i18n.global.t(MultipleLangFileNameEunm.TheOnlyOfficialPartnerInAsia)
    }
])

export const OtherTeamOptions = [
    [spon_icon_7, spon_icon_8, spon_icon_9, spon_icon_10, spon_icon_11, spon_icon_12, spon_icon_13],
    [spon_icon_14, spon_icon_15, spon_icon_16, spon_icon_17, spon_icon_18, spon_icon_19]
]