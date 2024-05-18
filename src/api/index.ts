import axios from '@/axios';
// 定义接口返回类型
interface UserProfile {
    nickName: string;
    phone: string;
    callType: number;
    callPhone: string;
    question: string
}

// 用户信息提交
export const onSubmitUserInfo = async (data: UserProfile): Promise<void> => {
    return axios.post('/ai/mobile/external/businessConsult', data);
};