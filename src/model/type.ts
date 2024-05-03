import { MultipleLangEunm,VideoMaskEnum } from './enum'

export const LanguageOptions = [
    { value: MultipleLangEunm.CN, text: '简体中文', icon: null, color: '' },
    { value: MultipleLangEunm.US, text: 'English', icon: null, color: '' },
]

export const VideoMaskType = {
    [VideoMaskEnum.Top]:'linear-gradient( 0, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%',
    [VideoMaskEnum.Bottom]:'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%)',
    [VideoMaskEnum.Both]:'linear-gradient( 0, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100% ),linear-gradient(180deg, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%)'
}


export const APP_ID = '#app'