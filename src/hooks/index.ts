import { LanguageOptions,MultipleLangEunm } from '@/model'

//判断是否是移动端
export const useMobile = () => { 
    const ua = navigator.userAgent
    const equipments =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    return equipments.test(ua)
}


//获取浏览器默认语言
export const useLanguages = () => { 
    const browserLang = navigator?.language && navigator?.language?.toLocaleLowerCase()
    const systemLang =  LanguageOptions.find(item=> item.value === browserLang)
    return systemLang?.value || MultipleLangEunm.US
}