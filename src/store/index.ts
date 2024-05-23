import { createPinia ,defineStore} from 'pinia'
import { Store } from './constants'
import { ref } from 'vue'
import { MultipleLangFileNameEunm } from '@/model'
import { TabsIndexToSwiper } from '@/views/pc/views/Navigation/constants'
export const useSwiperStore = defineStore(Store.SwiperActiveIndex, {
    state: () => {
        return {
            isAnimate:false,
            index:MultipleLangFileNameEunm.Logo,
            dealy: 0,
        }
    },
    actions: {
        onChangeSwiper(value: string) {
            const beforeIndex = TabsIndexToSwiper[this.index]
            const currentIndex = TabsIndexToSwiper[value]
            this.index = value as MultipleLangFileNameEunm
            this.isAnimate = currentIndex > beforeIndex 
            this.dealy = 0.2
        },
        onChangeDealy(value: number) {
            this.dealy = value
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