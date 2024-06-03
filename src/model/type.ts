import { MultipleLangEunm, VideoMaskEnum, BottonLinkType, ContactInformation } from './enum'
import cnIcon from '@/assets/image/lang_icon_cn.png'
import usIcon from '@/assets/image/lang_icon_us.png'
import twIcon from '@/assets/image/lang_icon_tw.png'
import vnIcon from '@/assets/image/lang_icon_vn.png'
import jpIcon from '@/assets/image/lang_icon_jp.png'
import koIcon from '@/assets/image/lang_icon_ko.png'
import thIcon from '@/assets/image/lang_icon_th.png'
import idIcon from '@/assets/image/lang_icon_id.png'
import trIcon from '@/assets/image/lang_icon_tr.png'
import ptIcon from '@/assets/image/lang_icon_pt.png'
import esIcon from '@/assets/image/lang_icon_es.png'
import hiIcon from '@/assets/image/lang_icon_hi.png'


export const LanguageOptions = [
    { value: MultipleLangEunm.CN, text: '简体中文', icon: cnIcon, color: '' },
    { value: MultipleLangEunm.US, text: 'English', icon: usIcon, color: '' },
    { value: MultipleLangEunm.TW, text: '繁體', icon: twIcon, color: '' },
    { value: MultipleLangEunm.VN, text: 'Tiếng Việt', icon: vnIcon, color: '' },
    { value: MultipleLangEunm.JP, text: '日本語', icon: jpIcon, color: '' },
    { value: MultipleLangEunm.KO, text: '한국인', icon: koIcon, color: '' },
    { value: MultipleLangEunm.TH, text: 'ไทย', icon: thIcon, color: '' },
    { value: MultipleLangEunm.ID, text: 'bahasa indonesia', icon: idIcon, color: '' },
    { value: MultipleLangEunm.TR, text: 'Türkçe', icon: trIcon, color: '' },
    { value: MultipleLangEunm.PT, text: 'Português', icon: ptIcon, color: '' },
    { value: MultipleLangEunm.ES, text: 'español', icon: esIcon, color: '' },
    { value: MultipleLangEunm.HI, text: 'हिंदी', icon: hiIcon, color: '' },
]

export const VideoMaskType = {
    [VideoMaskEnum.Top]: 'linear-gradient( 0, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%',
    [VideoMaskEnum.Bottom]: 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%)',
    [VideoMaskEnum.Both]: 'linear-gradient( 0, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100% ),linear-gradient(180deg, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%)'
}


export const BottonLinkSource: { [key in BottonLinkType]: string } = {
    [BottonLinkType.Home]: 'https://cn2.manbetx-sports.aisports.io/home',
    [BottonLinkType.Casino]: 'https://cn2.manbetx-sports.aisports.io/casino'
    // [BottonLinkType.Home]: 'https://play.manbet-x.com/home',
    // [BottonLinkType.Casino]: 'https://play.manbet-x.com/home'
}

export const BottonLinkSourcePc: { [key in BottonLinkType]: string } = {
    [BottonLinkType.Home]: 'https://cn2-mx-newpc.yuansport1.com/sports/hot',
    [BottonLinkType.Casino]: 'https://cn2-mx-newpc.yuansport1.com/casino'
    // [BottonLinkType.Home]: 'https://play.manbet-x.com/home',
    // [BottonLinkType.Casino]: 'https://play.manbet-x.com/home'
}

export const ContactInformationOptions = [
    { value: 1, text: ContactInformation.Telegram },
    { value: 4, text: ContactInformation.Email },
    { value: 3, text: ContactInformation.Skype }
]

export const APP_ID = '#app'