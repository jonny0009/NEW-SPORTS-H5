import { createPinia ,defineStore} from 'pinia'
import { Store } from './constants'
import { ref } from 'vue'
import { MultipleLangFileNameEunm } from '@/model'
import { TabsIndexToSwiper } from '@/views/pc/views/Navigation/constants'


export const useSwiperStore = defineStore(Store.SwiperActiveIndex, {
    state: () => {
        return {
            dealy: 0,
            noAnimate: false,
            index:MultipleLangFileNameEunm.Logo,
            luckyCasino: false
        }
    },
    actions: {
        onChangeSwiper(value: string) {
            // this.index = value
            this.dealy = 0.2
            this.noAnimate = false
            this.index = value as MultipleLangFileNameEunm

        },
        onChangeDealy(value: number) {
            this.dealy = value
        },
        onChangeAnimate(value: boolean) {
          this.noAnimate = value
        },
        onChangeLuckyCasino(value: boolean) {
          this.luckyCasino = value
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