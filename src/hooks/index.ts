//判断是否是移动端
export const useMobile = () => { 
    const ua = navigator.userAgent
    const equipments =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    return equipments.test(ua)
}