<template>
  <div class="BusinessCooperation">
    <div class="head">
      <img :src="require('@/assets/images/businessCooperation/bg.jpg')" />
      <span>
        {{ $t('winwin') }}
      </span>
    </div>
    <div
      class="info"
      :class="[{ other: !['zh-cn', 'zh-tw'].includes(lan) }]"
      v-html="$t('businessCooperationBigSubTitlePc')"
    ></div>

    <div class="connect">
      <div class="input">
        <van-field
          v-model="value1"
          maxlength="20"
          class="newField"
          :placeholder="$t('yourHonorableTitle')"
        />
        <img
          width="12"
          height="12"
          :src="require(`@/assets/images/start/line/user.png`)"
        />
      </div>
      <div class="input">
        <van-field
          v-model="value2"
          maxlength="20"
          class="newField"
          :placeholder="$t('yourPhoneNumber')"
        />
        <img
          width="12"
          height="12"
          :src="require(`@/assets/images/start/line/phone.png`)"
        />
      </div>

      <div class="input1">
        <div
          id="appPopoverShow"
          class="select 2"
          :class="{ active: popoverShow }"
        >
          <van-popover
            v-model="popoverShow"
            trigger="click"
            get-container="#appPopoverShow"
            placement="bottom-start"
          >
            <ul>
              <li
                v-for="(item, idx) in popoverShowList"
                :key="idx"
                :class="{ active: item.value === callType }"
                @click="popoverShowListClick(item)"
              >
                {{ item.text }}
              </li>
            </ul>
            <template #reference>
              <div class="popoverVal">
                {{ callType | callTypeFil }}
                <van-icon class="start-play" name="play" />
              </div>
            </template>
          </van-popover>
        </div>
        <div class="account">
          <van-field
            v-model="value3"
            maxlength="20"
            class="newField"
            :placeholder="$t('yourCommunicationAccount')"
          />
          <img
            width="12"
            height="12"
            :src="require(`@/assets/images/start/line/phone.png`)"
          />
        </div>
      </div>

      <div class="input textarea">
        <van-field
          v-model="value4"
          class="newField"
          rows="3"
          autosize
          type="textarea"
          maxlength="100"
          :placeholder="$t('yourQuestion')"
          show-word-limit
        />
        <img
          width="12"
          height="12"
          :src="require(`@/assets/images/start/line/pen.png`)"
        />
      </div>
    </div>
    <div class="button">
      <span class="item" @click="submitClick"> {{ $t('submit') }} </span>
    </div>
  </div>
</template>

<script>
//
import { mapState } from 'vuex'
import { Toast, Notify } from 'vant'
import { getLang } from '@/i18n/index'

// api
import { businessConsult } from '@/api/common'
//
export default {
  name: 'BusinessCooperation',
  filters: {
    callTypeFil(val) {
      const obj = {
        1: 'Telegram ',
        2: 'WhatsApp',
        3: 'Skype'
      }
      return obj[val] || val
    }
  },
  data() {
    return {
      sendLoading: false,
      callType: 1,
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      lan: 'zh-cn',
      popoverShow: false,
      popoverShowList: [
        { value: 1, text: 'Telegram' },
        { value: 2, text: 'WhatsApp' },
        { value: 3, text: 'Skype' }
      ]
    }
  },
  computed: {
    ...mapState('app', ['businessConfig', 'merchantConfigDetail', 'isPc']),
    brandType() {
      return this.merchantConfigDetail.brandType || 1
    }
  },
  mounted() {
    this.lan = getLang()
    setTimeout(() => {
      this.lan = getLang()
    }, 1000)
  },
  methods: {
    //
    popoverShowListClick({ value }) {
      this.callType = value
      this.popoverShow = !this.popoverShow
    },
    //
    async submitClick() {
      const params = {
        nickName: this.value1,
        phone: this.value2,
        callType: this.callType,
        callPhone: this.value3,
        question: this.value4,
        lang: this.lan,
        source: this.merchantConfigDetail.brandType || 1
      }
      if (!params.nickName) {
        Notify(this.$t('pleaseInput') + this.$t('yourHonorableTitle'))
        return
      } else if (!params.phone) {
        Notify(this.$t('pleaseInput') + this.$t('yourPhoneNumber'))
        return
      } else if (!params.callPhone) {
        Notify(this.$t('pleaseInput') + this.$t('yourCommunicationAccount'))
        return
      } else if (!params.question) {
        Notify(this.$t('pleaseInput') + this.$t('yourQuestion'))
        return
      }
      const toastloading = Toast.loading({
        message: this.$t('loading'),
        forbidClick: true
      })
      try {
        if (this.sendLoading) {
          return
        }
        this.sendLoading = true
        await businessConsult(params)
        this.sendLoading = false
        Notify({ type: 'success', message: this.$t('submitSuccess') })
        await this.$nextTick(() => {
          this.value1 = ''
          this.value2 = ''
          this.value3 = ''
          this.value4 = ''
          this.callType = 1
        })
      } catch (e) {
        this.sendLoading = false
        Notify({ type: 'success', message: this.$t('submitError') })
      }
      toastloading.clear()
    }
  }
}
</script>
<style lang="less">
.BusinessCooperation {
  .head {
    padding-top: 40px;
    position: relative;
    min-height: 160px;
    display: flex;
    align-items: center;
    img {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      display: block;
      width: 100%;
      height: 100%;
    }
    span {
      position: relative;
      z-index: 2;
      font-size: 24px;
      color: #ffffff;
      padding-left: 16px;
    }
  }
  .info {
    font-size: 13px;
    color: #000000;
    padding: 20px 16px;
    br {
      display: none;
    }
  }
  .connect {
    padding: 20px 16px;
    .input {
      position: relative;
      height: 58px;
      display: flex;
      padding: 0 16px;
      align-items: center;
      background-image: linear-gradient(180deg, #f3f5f8 0%, #f9fafc 100%);
      border: 2px solid rgba(255, 255, 255, 1);
      border-radius: 8px;
      margin-bottom: 16px;
      .newField {
        background: transparent;
        &::after {
          display: none;
        }
      }
      img {
        position: absolute;
        top: 50%;
        right: 16px;
        z-index: 2;
        margin-top: -6px;
      }
      &.textarea {
        height: 142px;
        padding-right: 34px;
        border-radius: 8px;
        display: flex;
        align-items: flex-start;
        .newField {
          padding: 16px 16px;
        }
        .van-field__word-limit {
          display: none;
        }
        img {
          top: 18px;
          margin-top: 0;
        }
      }
    }
  }
  .input1 {
    display: flex;
    margin-bottom: 16px;
    .select {
      margin-right: 16px;
      &.active {
        .start-play {
          transform: rotate(270deg);
        }
      }
      .start-play {
        margin-left: 5px;
      }
    }
    .popoverVal {
      width: 97px;
      height: 58px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: linear-gradient(180deg, #f3f5f8 0%, #f9fafc 100%);
      border: 2px solid rgba(255, 255, 255, 1);
      border-radius: 8px;
    }
    .account {
      flex: 1;
      position: relative;
      height: 58px;
      display: flex;
      padding: 0 16px;
      align-items: center;
      background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#f3f5f8),
        to(#f9fafc)
      );
      background-image: linear-gradient(180deg, #f3f5f8 0%, #f9fafc 100%);
      border: 2px solid #ffffff;
      border-radius: 8px;
      .newField {
        &::after {
          display: none;
        }
      }
      img {
        position: absolute;
        top: 50%;
        right: 16px;
        z-index: 2;
        margin-top: -6px;
      }
    }
  }

  .button {
    padding: 0 16px 60px;
    .item {
      height: 48px;
      background: #f25e40;
      border-radius: 24px;
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
