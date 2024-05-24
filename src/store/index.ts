import { createPinia ,defineStore} from 'pinia'
import { Store } from './constants'
import { ref } from 'vue'
import { MultipleLangFileNameEunm } from '@/model'
import { TabsIndexToSwiper } from '@/views/pc/views/Navigation/constants'


export const useSwiperStore = defineStore(Store.SwiperActiveIndex, {
    state: () => {
        return {
            dealy: 0,
            isScollUp:false,
            index:MultipleLangFileNameEunm.Logo,
        }
    },
    actions: {
        onChangeSwiper(value: string) {
            // this.index = value
            this.dealy = 0.2
            const beforeIndex = TabsIndexToSwiper[this.index]
            const currentIndex = TabsIndexToSwiper[value]
            this.index = value as MultipleLangFileNameEunm
            this.isScollUp = currentIndex > beforeIndex 

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