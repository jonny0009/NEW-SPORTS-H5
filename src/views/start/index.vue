<template>
  <div
    class="start"
    :class="[
      { start98: isRouteName98 || isRouteNameOG },
      { start7: !(isRouteName98 || isRouteNameOG || isSharpSports) },
      {
        isPc: isPc
      },
      {
        isMobile: !isPc
      }
    ]"
  >
    <div v-if="videoToggle" class="start-imgBox">
      <video
        id="mobileVideo"
        class="start-img"
        :class="{ pc: isPc }"
        :poster="require('@/assets/images/start/pc/video_bg.jpg')"
        autoplay="autoplay"
        loop="loop"
        x5-video-player-fullscreen="true"
        data-v-e25fe002=""
        muted="muted"
        x5-video-player-type="h5"
        x5-playsinline=""
        playsinline=""
        webkit-playsinline=""
      >
        <source :src="videoSrc" type="video/mp4" />
        {{ $t('notSupportVideo') }}
      </video>
    </div>

    <!--  -->
    <div class="start-main">
      <!-- 1 -->
      <div class="start-pageFirst">
        <div class="start-pageFirst-text">
          <img
            class="toImage"
            :src="require('@/assets/images/live/logo1.png')"
          />
          <div class="title" :class="lan">
            {{ $t('appTitle') }}
          </div>
          <div
            class="subTitle"
            :class="{ other: !['zh-cn', 'zh-tw'].includes(lan) }"
          >
            {{ $t('appSubTitle') }}
          </div>
          <div class="list">
            <div class="list-item" @click="goGameClick({ value: 'Sports' })">
              <span>
                {{ $t('tryItNow') }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="showMore" class="more">
          <div class="more-btn">
            <img :src="require('@/assets/images/arrow.svg')" />
            {{ $t('swipeMore') }}
          </div>
        </div>
      </div>

      <!-- 2 -->
      <div class="start-pageSecond">
        <div class="start-pageSecond-main">
          <div class="start-bigTitle">
            <span>
              {{ $t('productAdvantages') }}
            </span>
          </div>
          <div class="bigSubTitle">
            {{ $t('productAdvantagesBigSubTitle') }}
          </div>
          <ul
            class="start-ul one"
            :class="[{ other: !['zh-cn', 'zh-tw'].includes(lan) }]"
          >
            <li v-for="(item, idx) in ulList" :key="idx">
              <div class="mian">
                <van-image
                  v-if="isRouteName98"
                  width="40"
                  height="40"
                  class="image"
                  :src="require(`@/assets/images/start/98/goods/${idx}.svg`)"
                />
                <van-image
                  v-else-if="isRouteNameOG"
                  width="40"
                  height="40"
                  class="image"
                  :src="require(`@/assets/images/start/98/goods/${idx}.svg`)"
                />
                <van-image
                  v-else
                  width="40"
                  height="40"
                  class="image"
                  :src="require(`@/assets/images/start/pc/goods/${idx}.svg`)"
                />
                <div class="title">{{ item.title }}</div>
                <div
                  class="subTitle"
                  :class="[{ other: !['zh-cn', 'zh-tw'].includes(lan) }]"
                  v-html="item.subTitle"
                ></div>
                <div class="text">
                  {{ item.text }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- start 3 -->
      <!-- 3 pc -->
      <div v-if="isPc" class="start-pageThird pc">
        <component :is="currentVideo" class="start-pageThird-img" />
        <div class="start-pageThird-mian">
          <div class="start-bigTitle white">
            <span>
              {{ $t('gameProduct') }}
            </span>
          </div>
          <div
            class="listThird"
            :class="[{ other: !['zh-cn', 'zh-tw'].includes(lan) }]"
          >
            <div
              v-for="(item, idx) in headList"
              v-show="item.title"
              :key="idx"
              class="listThird-item"
              :class="[
                {
                  active: gameActive === item.value
                },
                { other: !['zh-cn', 'zh-tw'].includes(lan) }
              ]"
              @click="gameClick(item)"
            >
              <van-image
                v-if="item.title"
                width="30"
                height="24"
                class="image"
                :src="require(`@/assets/images/start/pc/project/${idx}.svg`)"
              />
              <span>
                <template v-if="isRouteName98">{{ item.title98 }}</template>
                <template v-if="isRouteNameOG">{{ item.titleOG }}</template>
                <template v-if="isSharpSports">{{
                  item.titleSharpSports
                }}</template>
                <template v-else>{{ item.title }}</template>
              </span>
            </div>
          </div>
          <component :is="currentCom" @goGameClick="goGameClick" />
        </div>
      </div>
      <!-- 3 mobile -->

      <div v-if="!isPc" class="start-pageThird-mobile mobile">
        <div class="start-mobileBigTitle">
          <span> {{ $t('gameProduct') }} </span>
        </div>
        <!--  -->
        <div class="start-mobileGame" :class="lan">
          <div class="title">{{ gameName }}{{ $t('sports') }}</div>
          <div class="subTitle">{{ $t('sportsSubTitle') }}</div>
          <div class="text">
            {{ $t('sportsText') }}
          </div>
          <div class="img">
            <img :src="require('@/assets/images/start/pc/game/11.png')" />
          </div>
          <ul :class="[{ other: !['zh-cn', 'zh-tw'].includes(lan) }]">
            <li>
              {{ $t('sportsListItem1') }}
            </li>
            <li>
              {{ $t('sportsListItem2') }}
            </li>
            <li>
              {{ $t('sportsListItem3') }}
            </li>
            <li>
              {{ $t('sportsListItem4') }}
            </li>
            <li>
              {{ $t('sportsListItem5') }}
            </li>
            <li>
              {{ $t('sportsListItem6') }}
            </li>
            <li>
              {{ $t('sportsListItem7') }}
            </li>
          </ul>
          <div class="button" @click="goGameClick({ value: 'Sports' })">
            {{ $t('loginForFree') }}
          </div>
        </div>
        <div class="start-mobileGame" :class="lan">
          <div class="title">{{ gameName }}{{ $t('baccarat') }}</div>
          <div class="subTitle">{{ $t('baccaratSubTitle') }}</div>
          <div class="text">
            {{ gameName }}
            {{ $t('baccaratText') }}
          </div>
          <div class="img">
            <img :src="require('@/assets/images/start/pc/game/22.png')" />
          </div>
          <ul :class="[{ other: !['zh-cn', 'zh-tw'].includes(lan) }]">
            <li>{{ $t('baccaratListItem1') }}</li>
            <li>{{ $t('baccaratListItem2') }}</li>
            <li>{{ $t('baccaratListItem3') }}</li>
            <li>{{ $t('baccaratListItem4') }}</li>
            <li>{{ $t('baccaratListItem5') }}</li>
            <li>{{ $t('baccaratListItem6') }}</li>
            <li>{{ $t('baccaratListItem7') }}</li>
          </ul>
          <div class="button" @click="goGameClick({ value: 'BAC-V2.0' })">
            {{ $t('loginForFree') }}
          </div>
        </div>
        <!-- <div class="start-mobileGame" :class="lan">
          <div class="title">{{ gameName }}{{ $t('lottery') }}</div>
          <div class="subTitle">{{ $t('lotterySubTitle') }}</div>
          <div class="text">
            {{ $t('lotteryText') }}
          </div>
          <div class="img">
            <img :src="require('@/assets/images/start/pc/game/33.png')" />
          </div>
          <ul :class="[{ other: !['zh-cn', 'zh-tw'].includes(lan) }]">
            <li>{{ $t('lotteryListItem1') }}</li>
            <li>{{ $t('lotteryListItem2') }}</li>
            <li>{{ $t('lotteryListItem3') }}</li>
            <li>{{ $t('lotteryListItem4') }}</li>
            <li>{{ $t('lotteryListItem5') }}</li>
            <li>{{ $t('lotteryListItem6') }}</li>
          </ul>
          <div class="button" @click="goGameClick({ value: 'AD-LOTTERY' })">
            {{ $t('loginForFree') }}
          </div>
        </div> -->
        <!--  -->
      </div>
      <!-- end 3pc -->

      <!-- 4 -->
      <div class="start-pageFourth start-pageSecond">
        <div class="start-pageSecond-main start-pageSecond-main">
          <div class="start-bigTitle textCenter">
            <span>
              {{ $t('about') }}
              {{ gameName }}
            </span>
          </div>
          <div
            class="bigSubTitle"
            :class="[{ other: !['zh-cn', 'zh-tw'].includes(lan) }]"
            v-html="$t('aboutBigSubTitle', { gameName: gameName })"
          ></div>
          <ul class="start-ul second">
            <li v-for="(item, idx) in ulListFourth" :key="idx">
              <div class="mian">
                <van-image
                  v-if="isRouteName98 || isRouteNameOG"
                  width="40"
                  height="40"
                  class="image"
                  :src="require(`@/assets/images/start/98/items/${idx}.svg`)"
                />
                <van-image
                  v-else
                  width="40"
                  height="40"
                  class="image"
                  :src="require(`@/assets/images/start/pc/items/${idx}.svg`)"
                />
                <div class="title">{{ item.title }}</div>
                <div class="text">
                  {{ item.text }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 5 -->

      <!-- 6 -->
      <div class="start-pageSixth">
        <div class="start-pageSixth-main">
          <div class="start-bigTitle pc">
            <span>{{ $t('businessCooperation') }}</span>
          </div>

          <div
            class="bigSubTitle pc"
            :class="[{ other: !['zh-cn', 'zh-tw'].includes(lan) }]"
            v-html="$t('businessCooperationBigSubTitlePc')"
          ></div>

          <!-- <div class="start-bigTitle mobile">
            <span>
              {{ $t('businessCooperationMobile') }}
            </span>
          </div> -->
          <!-- <div class="bigSubTitle mobile">
            {{ $t('businessCooperationBigSubTitleMobile') }}
          </div> -->

          <!-- <div class="start-pageSixth-connect">
            <div class="leftBox">
              <div class="left-item">
                <img
                  v-if="isRouteName98 || isRouteNameOG"
                  class="image"
                  :src="require(`@/assets/images/start/98/like/telegram.svg`)"
                />
                <img
                  v-else
                  class="image"
                  :src="require(`@/assets/images/start/pc/like/telegram.svg`)"
                />
                <div class="left-text">
                  <div class="title">Telegram</div>
                  <div class="text">
                    <a
                      v-clipboard:copy="'https://t.me/WGUni'"
                      v-clipboard:success="onCopy"
                      class="aLabel"
                      href="https://t.me/WGUni"
                      target="_blank"
                    >
                      @WGUni
                    </a>
                    <a
                      v-clipboard:copy="'https://t.me/WGKurt'"
                      v-clipboard:success="onCopy"
                      class="aLabel"
                      href="https://t.me/WGKurt"
                      target="_blank"
                    >
                      @WGKurt
                    </a>
                    <a
                      v-clipboard:copy="'https://t.me/WGTempo'"
                      v-clipboard:success="onCopy"
                      class="aLabel"
                      href="https://t.me/WGTempo"
                      target="_blank"
                    >
                      @WGtempo
                    </a>
                  </div>
                </div>
              </div>
              <div class="left-item">
                <img
                  v-if="isRouteName98 || isRouteNameOG"
                  class="image"
                  :src="require(`@/assets/images/start/98/like/mail.svg`)"
                />
                <img
                  v-else
                  class="image"
                  :src="require(`@/assets/images/start/pc/like/mail.svg`)"
                />
                <div class="left-text">
                  <div class="title">Mail</div>
                  <div class="text">
                    <a
                      v-clipboard:copy="'Uni@wg.com'"
                      v-clipboard:success="onCopy"
                      class="aLabel"
                      target="_blank"
                    >
                      Uni@wg.com
                    </a>
                    <a
                      v-clipboard:copy="'kurt@wg.com'"
                      v-clipboard:success="onCopy"
                      class="aLabel"
                      target="_blank"
                    >
                      kurt@wg.com
                    </a>
                    <a
                      v-clipboard:copy="'Tempo@wg.com'"
                      v-clipboard:success="onCopy"
                      class="aLabel"
                      target="_blank"
                    >
                      Tempo@wg.com
                    </a>
                  </div>
                </div>
              </div>
              <div class="left-item">
                <img
                  v-if="isRouteName98 || isRouteNameOG"
                  class="image"
                  :src="require(`@/assets/images/start/98/like/skype.svg`)"
                />
                <img
                  v-else
                  class="image"
                  :src="require(`@/assets/images/start/pc/like/skype.svg`)"
                />
                <div class="left-text">
                  <div class="title">Skype</div>
                  <div class="text">
                    <a
                      v-clipboard:copy="'Uni@wg.com'"
                      v-clipboard:success="onCopy"
                      class="aLabel"
                      target="_blank"
                    >
                      Uni@wg.com
                    </a>
                    <a
                      v-clipboard:copy="'kurt@wg.com'"
                      v-clipboard:success="onCopy"
                      class="aLabel"
                      target="_blank"
                    >
                      kurt@wg.com
                    </a>
                    <a
                      v-clipboard:copy="'Tempo@wg.com'"
                      v-clipboard:success="onCopy"
                      class="aLabel"
                      target="_blank"
                    >
                      Tempo@wg.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="rightBox">
              <div class="row-1">
                <div class="row-1-input1">
                  <span>
                    <van-field
                      v-model.trim="value1"
                      maxlength="20"
                      class="newField"
                      :placeholder="$t('yourHonorableTitle')"
                    />
                  </span>
                  <img
                    width="12"
                    height="12"
                    :src="require(`@/assets/images/start/line/user.png`)"
                  />
                </div>
                <div class="row-1-input2">
                  <span>
                    <van-field
                      v-model.trim="value2"
                      maxlength="20"
                      class="newField"
                      :placeholder="$t('yourPhoneNumber')"
                    />
                  </span>
                  <img
                    width="12"
                    height="12"
                    :src="require(`@/assets/images/start/line/phone.png`)"
                  />
                </div>
              </div>
              <div class="row-2">
                <div id="appPopoverShow" class="row-2-input1 1">
                  <van-popover
                    v-model="popoverShow"
                    trigger="click"
                    get-container="#appPopoverShow"
                  >
                    <ul>
                      <li
                        v-for="(item, idx) in popoverShowList"
                        :key="idx"
                        class="textCenter"
                        :class="{ active: item.value === callType }"
                        @click.stop="popoverShowListClick(item)"
                      >
                        {{ item.text }}
                      </li>
                    </ul>
                    <template #reference>
                      <div
                        class="popoverVal"
                        :class="{
                          active: popoverShow
                        }"
                      >
                        {{ callType | callTypeFil }}
                        <van-icon class="start-play" name="play" />
                      </div>
                    </template>
                  </van-popover>
                </div>
                <div class="row-2-input2">
                  <span>
                    <van-field
                      v-model.trim="value3"
                      maxlength="20"
                      class="newField"
                      :placeholder="$t('yourCommunicationAccount')"
                    />
                  </span>
                  <img
                    width="12"
                    height="12"
                    :src="require(`@/assets/images/start/line/phone.png`)"
                  />
                </div>
              </div>
              <div class="row-3 textarea">
                <span>
                  <van-field
                    v-model.trim="value4"
                    class="newField"
                    rows="3"
                    autosize
                    type="textarea"
                    maxlength="100"
                    :placeholder="$t('yourQuestion')"
                    show-word-limit
                  />
                </span>
                <img
                  width="12"
                  height="12"
                  :src="require(`@/assets/images/start/line/pen.png`)"
                />
              </div>
              <div class="row-4" @click="submitClick">{{ $t('submit') }}</div>
            </div>
          </div> -->
        </div>
      </div>

      <!-- 7 -->
      <div class="start-pageFooter">
        <div class="start-pageFooter-img">
          <img
            v-for="(item, idx) in footerList"
            :key="idx"
            :src="require(`@/assets/images/start/footer/footer_${item}.png`)"
          />
        </div>
        <p
          class="start-pageFooter-remark"
          :class="[{ other: !['zh-cn', 'zh-tw'].includes(lan) }]"
        >
          {{ $t('footerRegister', { gameName: gameName }) }}
        </p>
        <p class="start-pageFooter-line"></p>

        <p class="start-pageFooter-register">
          COPYRIGHT © 1998 - {{ year }} {{ gameNameEn }}. ALL RIGHTSRESERVED
          <br />
          {{ $t('footerRemark', { gameNameEn: gameNameEn }) }}
        </p>
      </div>

      <!--  -->
    </div>
  </div>
</template>

<script>
//
import { mapGetters, mapState } from 'vuex'
import { getLang, initI18n } from '@/i18n/index'
import { Toast, Notify } from 'vant'
// api
import { getGameUrl, getRBMatch, businessConsult } from '@/api/common'
//
import video from '@/assets/images/start/video/video1.mp4'
import videoPc from '@/assets/images/start/video/video2-0.mp4'
//
import videoMobileNoWord from '@/assets/images/start/video/noWord/mobile.mp4'
import videoPcNoWord from '@/assets/images/start/video/noWord/pc.mp4'

// start components

import baccarat from './components/baccarat'
import baccaratVideo from './components/baccaratVideo'
import lottery from './components/lottery'
import lotteryVideo from './components/lotteryVideo'
import sports from './components/sports'
import sportsVideo from './components/sportsVideo'
// end components
//
export default {
  name: 'Start',
  components: {
    baccaratView: baccarat,
    sportsView: sports,
    lotteryView: lottery,
    baccaratVideo,
    lotteryVideo,
    sportsVideo
  },
  filters: {
    lanFil(val) {
      const obj = {
        'zh-cn': '简体中文',
        'zh-tw': '繁体中文',
        'en-us': 'English',
        'ko-kr': '한국인',
        'th-th': 'ไทย',
        'vi-vn': 'Tiếng Việt',
        'pt-pt': 'Português'
      }
      return obj[val] || val
    },
    callTypeFil(val) {
      const obj = {
        1: 'Telegram',
        2: 'WhatsApp',
        3: 'Skype'
      }
      return obj[val] || val
    }
  },
  data() {
    return {
      showMore: true,
      video,
      videoPc,
      sendLoading: false,
      callType: 1,
      popoverShow: false,
      popoverShowList: [
        { value: 1, text: 'Telegram' },
        { value: 2, text: 'WhatsApp' },
        { value: 3, text: 'Skype' }
      ],
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      lan: 'zh-cn',
      appActive: null,
      year: new Date().getFullYear(),
      gameActive: 'Sports',
      showPopover: false,
      setIntervalTimer: null,
      gameUrl: '',
      languageList: [
        {
          text: '简体中文',
          id: 'zh-cn'
        },
        {
          text: 'English',
          id: 'en-us'
        },
        {
          text: '한국인',
          id: 'ko-kr'
        }
      ],
      partnerList: [
        1, 2, 4, 7, 8, 11, 12, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
      ],
      footerList: [1, 2, 3],
      currentCom: 'sportsView',
      currentVideo: 'sportsVideo',
      count: 0,
      videoToggle: false,
      videoSrc: ''
    }
  },
  computed: {
    ...mapState('app', [
      'businessConfig',
      'Fingerprint2Time',
      'businessConfigLoading',
      'merchantConfigDetail',
      'merchantConfigDetailLoading',
      'isPc',
      'isPcClientWidth'
    ]),
    headList() {
      return [
        {
          text: initI18n().t('sports'),
          title: initI18n().t('sevenLuckySports'),
          title98: initI18n().t('sports98'),
          titleOG: initI18n().t('sportsOG'),
          titleSharpSports: initI18n().t('sportsSharpSports'),
          subTitle: initI18n().t('testSports'),
          value: 'Sports'
        },
        {
          text: initI18n().t('baccarat'),
          title: initI18n().t('sevenLuckyBaccarat'),
          title98: initI18n().t('baccarat98'),
          titleOG: initI18n().t('baccaratOG'),
          titleSharpSports: initI18n().t('baccaratSharpSports'),
          subTitle: initI18n().t('testbaccarat'),
          value: 'BAC-V2.0'
        },
        {
          text: initI18n().t('lottery'),
          title: initI18n().t('sevenLuckyLottery'),
          title98: initI18n().t('lottery98'),
          titleOG: initI18n().t('lotteryOG'),
          titleSharpSports: initI18n().t('lotterySharpSports'),
          subTitle: initI18n().t('testlottery'),
          value: 'AD-LOTTERY'
        },
        {
          text: initI18n().t('businessCooperation'),
          title: '',
          subTitle: '',
          value: 'BusinessPartner'
        }
      ]
    },
    ulList() {
      return [
        {
          title: initI18n().t('fastSpeedExperience'),
          subTitle: `${initI18n().t('fastSpeedExperienceSubTitleA')}
          <br/>
          ${initI18n().t('fastSpeedExperienceSubTitleB')}`,
          text: initI18n().t('fastSpeedExperienceText')
        },
        {
          title: initI18n().t('stableSecurityProtection'),
          subTitle: initI18n().t('stableSecurityProtection'),
          text: initI18n().t('stableSecurityProtectiontext')
        },
        {
          title: initI18n().t('professionalManagementSystem'),
          subTitle: initI18n().t('professionalManagementSystemSubTitle'),
          text: initI18n().t('professionalManagementSystemText')
        },
        {
          title: initI18n().t('highQualityDockingService'),
          subTitle: initI18n().t('highQualityDockingServiceSubTitle'),
          text: initI18n().t('highQualityDockingServiceText')
        }
      ]
    },
    ulListFourth() {
      return [
        {
          title: initI18n().t('professionalAnchor'),
          text: initI18n().t('professionalAnchorText')
        },
        {
          title: initI18n().t('trueAndFair'),
          text: initI18n().t('trueAndFairText')
        },
        {
          title: initI18n().t('variousWaysToPlay'),
          text: initI18n().t('variousWaysToPlayText')
        },
        {
          title: initI18n().t('internationalCertification'),
          text: initI18n().t('internationalCertificationText')
        }
      ]
    },
    brandType() {
      return this.merchantConfigDetail.brandType || 1
    },
    isRouteName98() {
      return this.brandType * 1 === 2
    },
    isRouteNameOG() {
      return this.brandType * 1 === 3
    },
    isSharpSports() {
      return this.brandType * 1 === 4
    },
    gameName() {
      let text = initI18n().t('sevenStars')
      if (this.isRouteName98) {
        text = '98'
      } else if (this.isRouteNameOG) {
        text = 'OG'
      } else if (this.isSharpSports) {
        text = 'SharpSports'
      }

      return 'LiveSports'
    },
    gameNameEn() {
      let text = '7lucky'
      if (this.isRouteName98) {
        text = '98'
      } else if (this.isRouteNameOG) {
        text = 'OG'
      } else if (this.isSharpSports) {
        text = 'SharpSports'
      }
      return 'LiveSports'
    },
    ...mapGetters({
      token: 'user/token'
    }),
    queryLang() {
      return this.$route.query.lang
    }
  },
  watch: {
    token(val) {
      if (val && this.count < 1) {
        this.count += 1
        this.getZR()
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.lan = getLang()
    }, 1000)

    const lanToggle = ['zh-cn', 'zh-tw'].includes(this.lan)

    this.$nextTick(async () => {
      setTimeout(() => {
        if (this.isPc) {
          this.videoSrc = lanToggle ? videoPc : videoPcNoWord
        } else {
          this.videoSrc = lanToggle ? video : videoMobileNoWord
        }
        this.videoToggle = true
        this.mountedUpdata()
      }, 400)
    })

    this.$nextTick(() => {
      window.scrollTo(0, 0)
    })
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    clearInterval(this.setIntervalTimer)
  },
  created() {
    if (this.token) {
      this.getZR()
    }
    // 定时器，25分钟一次，保证token不过期
    this.setIntervalTimer = setInterval(() => {
      const params = {
        gameSort: 1,
        gameType: 'FT',
        leagueIds: '',
        teamId: '',
        page: 1,
        pageSize: 1,
        isNovice: 'Y',
        gameTypeSon: '',
        showtype: ''
      }
      getRBMatch(params).then(res => {})
    }, 1000 * 60 * 25)

    this.lan = getLang()
  },
  methods: {
    handleScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 50) {
        this.showMore = false
      } else {
        this.showMore = true
      }
    },

    //
    //
    onCopy(val) {
      const { text } = val
      Toast(`${this.$t('copySuccessfully')}，${text}`)
    },
    //
    //
    async submitClick() {
      //
      //

      // 1// 称呼
      // private String nickName;

      // 2// 电话
      // private String phone;

      // 3// 1 Telegram 2 WhatsApp 3. skype
      // private Integer callType;

      // 4// 通讯号码
      // private String callPhone;

      // 5// 语种
      // private String lang;

      // 6// 来源 1 七星 2 98
      // private String source;

      // 7// 咨询问题
      // eslint-disable-next-line no-irregular-whitespace
      // private String question;

      //
      //

      const params = {
        nickName: this.value1,
        phone: this.value2,
        callType: this.callType,
        callPhone: this.value3,
        question: this.value4,
        lang: this.lan,
        source: this.brandType
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

      //
    },
    //
    popoverShowListClick({ value }) {
      this.callType = value
      this.popoverShow = !this.popoverShow
    },
    //
    getZR() {
      const params = {
        supplierId: 'aigame',
        gameKey: 'BAC-V2.0',
        openType: 2,
        dirType: 1,
        brandType: this.brandType
      }
      getGameUrl(params).then(getGameUrlRes => {
        const { code, data } = getGameUrlRes
        if (code === 200) {
          const gameUrl = data['url'].replace('&isAi=1', '')
          const url =
            gameUrl +
            '&backUrl=' +
            window.location.href +
            `&aiTerType=16&brandType=${this.brandType}`
          this.gameUrl = encodeURIComponent(url)
        }
      })
    },
    //
    //
    mountedUpdata() {
      this.lan = getLang()
      document.querySelector('#mobileVideo') &&
        document.querySelector('#mobileVideo').play()
    },
    //
    //
    gameClick({ value }) {
      this.gameActive = value
      const obj = {
        Sports: 'sportsView',
        'BAC-V2.0': 'baccaratView',
        'AD-LOTTERY': 'lotteryView'
      }
      const objVideo = {
        Sports: 'sportsVideo',
        'BAC-V2.0': 'baccaratVideo',
        'AD-LOTTERY': 'lotteryVideo'
      }

      this.currentVideo = objVideo[value] || value
      this.currentCom = obj[value] || value
    },
    //
    //
    async goGameClick(val) {
      const { value } = val
      const lang = getLang()
      const gameKey = value
      let url
      if (gameKey === 'Sports') {
        if (window.location.href.indexOf('yuansports2.com') > -1) {
          url =
            'https://play.yuansports2.com/home' +
            '?token=' +
            `&lang=${lang}&brandType=${this.brandType}&theme=blue`
        } else {
          url =
            window.origin +
            '/casino?token=' +
            `&lang=${lang}&brandType=${this.brandType}&theme=blue`
        }

        window.open(url)
      } else if (gameKey === 'BusinessPartner') {
        this.$router.push({
          name: 'BusinessCooperation'
        })
        this.appActive = 'BusinessCooperation'
      } else if (gameKey === 'appHome') {
        this.$router.push({
          name: 'start'
        })
        this.appActive = null
      } else if (gameKey === 'BAC-V2.0') {
        const params = {
          supplierId: 'aigame',
          openType: 2,
          dirType: 1,
          gameKey
        }
        const gres = await getGameUrl(params)
        const { code } = gres
        if (code === 200) {
          const gameUrl = gres.data['url'].replace('&isAi=1', '')
          window.location.href =
            gameUrl +
            '&source=7lucky&brandType=' +
            this.brandType +
            '&sourceUrl=' +
            encodeURIComponent(window.location.host)
        }
      } else {
        url =
          window.origin +
          '/bjgame?token=' +
          this.token +
          '&supplierId=aigame' +
          '&gameKey=' +
          gameKey +
          `&lang=${lang}&brandType=${this.brandType}`
        window.open(url)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.popoverVal {
  .start-play {
    transform: rotate(90deg);
  }
  &.active {
    .start-play {
      transform: rotate(270deg);
    }
  }
}

.aLabel {
  font-size: 14px;
  margin-right: 20px;
}
</style>
