import axios from '@/axios';
import { useLanguages } from '@/hooks'
import { StorageLangNameEnum } from '@/model'
import { getStore } from '@/config/storage'
// 定义接口返回类型
interface UserProfile {
    nickName: string;
    phone: string;
    callType: number;
    callPhone: string;
    question: string
}

// 用户信息提交
export const onSubmitUserInfo = async (req: UserProfile): Promise<void> => {
    const lang = getStore(StorageLangNameEnum.LOCAL_LANGUAGE_NAME) || useLanguages()
    return axios.post('/ai/mobile/external/businessConsult', {
        lang,
        source:'3',
        ...req
    });
};