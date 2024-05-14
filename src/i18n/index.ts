import { App } from 'vue'
import { messages } from './locales';
import { createI18n } from 'vue-i18n';
import { getStore } from '@/config/storage';
import { useLanguages } from '@/hooks'
import { StorageLangNameEnum } from '@/model';

//注册i8n实例并引入语言文件
const localeData = {
    legacy: false, // 使用CompotitionAPI必须添加这条.
    messages, // 一个语言包对象，简单
    globalInjection: true,
    preserveDirectiveContent: true,
    locale: getStore(StorageLangNameEnum.LOCAL_LANGUAGE_NAME) || useLanguages()
}

export const i18n = createI18n(localeData)

export const setupI18n = {
    install(app: App) {
        app.use(i18n)
    }

}