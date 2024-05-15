import { MultipleLangEunm, VideoMaskEnum, BottonLinkType } from './enum'

export const LanguageOptions = [
    { value: MultipleLangEunm.CN, text: '简体中文', icon: null, color: '' },
    { value: MultipleLangEunm.US, text: 'English', icon: null, color: '' },
    { value: MultipleLangEunm.TW, text: '繁体中文', icon: null, color: '' },
]

export const VideoMaskType = {
    [VideoMaskEnum.Top]: 'linear-gradient( 0, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%',
    [VideoMaskEnum.Bottom]: 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%)',
    [VideoMaskEnum.Both]: 'linear-gradient( 0, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100% ),linear-gradient(180deg, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%)'
}


export const BottonLinkSource: { [key in BottonLinkType]: string } = {
    [BottonLinkType.Home]: 'https://cn2.manbetx-sports.aisports.io/home',
    [BottonLinkType.Casino]: 'https://cn2.manbetx-sports.aisports.io/casino',
}

export const APP_ID = '#app'