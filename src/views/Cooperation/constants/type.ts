import { AddreessType } from './enum' 
import mailURL from '@/assets/image/bc_icon_mail.png'
import skURL from '@/assets/image/bc_icon_sk.png'
import tgURL from '@/assets/image/bc_icon_tg.png'


export const contactAddressOptions = [
    {
        key:'mail',
        icon: mailURL,
        type:AddreessType.Copy,
        addreess: [
            '6qxyc7nt@gmail.com',
            'l36773502@gmail.com'
        ]
    },
    {
        key:'sk',
        icon: skURL,
        type:AddreessType.Copy,
        addreess: [
            'live:.cid.dd9a22bb322592db',
            'live:.cid.8f51e12a2522eb58'
        ]
    },
    {
        key:'tg',
        icon: tgURL,
        type:AddreessType.Jump,
        addreess: [
            '+1 206 202 1645',
            '+1 234 529 4040'
        ]
    },
]