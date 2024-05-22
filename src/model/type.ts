import { MultipleLangEunm, VideoMaskEnum, BottonLinkType ,ContactInformation} from './enum'

export const LanguageOptions = [
    { value: MultipleLangEunm.CN, text: '简体中文', icon: null, color: '' },
    { value: MultipleLangEunm.US, text: 'English', icon: null, color: '' },
    { value: MultipleLangEunm.TW, text: '繁體', icon: null, color: '' },
    { value: MultipleLangEunm.VN, text: 'Tiếng Việt', icon: null, color: '' },
    { value: MultipleLangEunm.JP, text: '日本語', icon: null, color: '' },
    { value: MultipleLangEunm.KO, text: '한국인', icon: null, color: '' },
    { value: MultipleLangEunm.TH, text: 'ไทย', icon: null, color: '' },
    { value: MultipleLangEunm.ID, text: 'bahasa indonesia', icon: null, color: '' },
    { value: MultipleLangEunm.TR, text: 'Türkçe', icon: null, color: '' },
    { value: MultipleLangEunm.PT, text: 'Português', icon: null, color: '' },
    { value: MultipleLangEunm.ES, text: 'español', icon: null, color: '' },
    { value: MultipleLangEunm.HI, text: 'हिंदी', icon: null, color: '' },
]

export const VideoMaskType = {
    [VideoMaskEnum.Top]: 'linear-gradient( 0, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%',
    [VideoMaskEnum.Bottom]: 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%)',
    [VideoMaskEnum.Both]: 'linear-gradient( 0, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100% ),linear-gradient(180deg, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%)'
}


export const BottonLinkSource: { [key in BottonLinkType]: string } = {
    [BottonLinkType.Home]: 'https://cn2.manbetx-sports.aisports.io/home',
    [BottonLinkType.Casino]: 'https://cn2.manbetx-sports.aisports.io/casino'
}

export const ContactInformationOptions = [
    { value: 1, text: ContactInformation.Telegram },
    { value: 4, text: ContactInformation.Email },
    { value: 3, text: ContactInformation.Skype }
]

export const APP_ID = '#app'