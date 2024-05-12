
import { uniqueId } from 'lodash'
import { MultipleLangFileNameEunm } from '@/model'
import icon1stURL from '@/assets/image/lg_part_1st_icon.png'
import icon2stURL from '@/assets/image/lg_part_2st_icon.png'
import icon3stURL from '@/assets/image/lg_part_3st_icon.png'
import icon4stURL from '@/assets/image/lg_part_4st_icon.png'
import icon5stURL from '@/assets/image/lg_part_5st_icon.png'
import icon6stURL from '@/assets/image/lg_part_6st_icon.png'
import icon7stURL from '@/assets/image/lg_part_7st_icon.png'
import icon8stURL from '@/assets/image/lg_part_8st_icon.png'

import icon1ndURL from '@/assets/image/lg_part_1nd_icon.png'
import icon2ndURL from '@/assets/image/lg_part_2nd_icon.png'
import icon3ndURL from '@/assets/image/lg_part_3nd_icon.png'
import icon4ndURL from '@/assets/image/lg_part_4nd_icon.png'
import icon5ndURL from '@/assets/image/lg_part_5nd_icon.png'
import icon6ndURL from '@/assets/image/lg_part_6nd_icon.png'
import icon7ndURL from '@/assets/image/lg_part_7nd_icon.png'


export const PartNDcontentOptions = [
    [
        {
            id:uniqueId(),
            icon: icon1stURL,
            tips: MultipleLangFileNameEunm.FastAccess,
            title: MultipleLangFileNameEunm.ExtremelyFastExperience,
            content: MultipleLangFileNameEunm.ExtremelyFastExperienceContent,
            animate:'animate__backInLeft'
        },
        {
            id:uniqueId(),
            icon: icon2stURL,
            tips: MultipleLangFileNameEunm.ReliableandSecure,
            title: MultipleLangFileNameEunm.StableSecurityProtection,
            content: MultipleLangFileNameEunm.StableSecurityProtectionContent,
            animate:'animate__backInLeft'
        },
        {
            id:uniqueId(),
            icon: icon3stURL,
            tips: MultipleLangFileNameEunm.WaterCollectorsHaveNowhereToHide,
            title: MultipleLangFileNameEunm.ProfessionalManagementSystem,
            content: MultipleLangFileNameEunm.ProfessionalManagementSystemContent,
            animate:'animate__backInLeft'
        },
        {
            id:uniqueId(),
            icon: icon4stURL,
            tips: MultipleLangFileNameEunm.MakeYourProductUnique,
            title: MultipleLangFileNameEunm.HighQualityDockingService,
            content: MultipleLangFileNameEunm.HighQualityDockingServiceContent,
            animate:'animate__backInLeft'
        },
    ],
    [
        {
            id:uniqueId(),
            icon: icon5stURL,
            tips: MultipleLangFileNameEunm.StandardizeOrderPushModel,
            title: MultipleLangFileNameEunm.GlobalCommunityPromotion,
            content: MultipleLangFileNameEunm.GlobalCommunityPromotionContent,
            animate:'animate__backInRight'
        },
        {
            id:uniqueId(),
            icon: icon6stURL,
            tips: MultipleLangFileNameEunm.SimpleAndEasyToUnderstandInterfaceDesign,
            title: MultipleLangFileNameEunm.UserInterface,
            content: MultipleLangFileNameEunm.UserInterfaceContent,
            animate:'animate__backInRight'
        },
        {
            id:uniqueId(),
            icon: icon7stURL,
            tips: MultipleLangFileNameEunm.MakeItEasyForNewbiesToGetStarted,
            title: MultipleLangFileNameEunm.SmartDescriptionRules,
            content: MultipleLangFileNameEunm.SmartDescriptionRulesContent,
            animate:'animate__backInRight'
        },
        {
            id:uniqueId(),
            icon: icon8stURL,
            tips: MultipleLangFileNameEunm.EventLiveInteraction,
            title: MultipleLangFileNameEunm.LiveBroadcastOfTheGameByAnchor,
            content: MultipleLangFileNameEunm.LiveBroadcastOfTheGameByAnchorContent,
            animate:'animate__backInRight'
        },
    ]
]

export const PartRDcontentOptions = [
    {
        icon: icon1ndURL,
        fileName:MultipleLangFileNameEunm.HighGamesCoverage
    },
    {
        icon: icon2ndURL,
        fileName:MultipleLangFileNameEunm.MultiapplicationTerminal
    },
    {
        icon: icon3ndURL,
        fileName:MultipleLangFileNameEunm.HighPayout
    },
    {
        icon: icon4ndURL,
        fileName:MultipleLangFileNameEunm.InteractiveLiveCommerce
    },
    {
        icon: icon5ndURL,
        fileName:MultipleLangFileNameEunm.VideoAnimation
    },
    {
        icon: icon6ndURL,
        fileName:MultipleLangFileNameEunm.ZeroCostWatchGame
    },
    {
        icon: icon7ndURL,
        fileName:MultipleLangFileNameEunm.EarlySettlement
    }
]
