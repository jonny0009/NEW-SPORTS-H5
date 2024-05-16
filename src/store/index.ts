import { createPinia ,defineStore} from 'pinia'
import { Store } from './constants'
import { ref } from 'vue'

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

export const useAudioStatus = defineStore('audioStatus', () => {
  const status = ref(false)
  function toggle(value?:boolean) {
    status.value = value ?? !status.value
  }

  return { status, toggle }
})


export default createPinia()