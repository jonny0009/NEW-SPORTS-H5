import { createPinia ,defineStore} from 'pinia'
import { Store } from './constants'

export const useSwiperStore = defineStore(Store.SwiperActiveIndex, {
    state: () => {
        return {
            index:''
        }
    },
    actions: {
        onChangeSwiper(value: string) {
            this.index = value
        }
    }
})


export default createPinia()