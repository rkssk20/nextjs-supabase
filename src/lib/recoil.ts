import { atom, selector, DefaultValue } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

type AccountProps = {
  name: string
  display_id: string
  image: string
  loading: boolean
}

type NotificateProps = {
  open: boolean;
  message: string;
}

type DialogProps = {
  content: '' | 'share' | 'login' | 'article_report' | 'comment_report' | 'article_delete' | 'comment_delete'
  id: string | null
}

// アカウント
export const accountState = atom<AccountProps>({
  key: 'account',
  default: {
    name: '',
    display_id: '',
    image: '',
    loading: true
  }
})

// 通知
export const notificateState = atom<NotificateProps>({
  key: 'notificate',
  default: {
    open: false,
    message: ''
  }
})

// ダイアログ
export const dialogState = atom<DialogProps>({
  key: 'dialog',
  default: {
    content: '',
    id: null
  }
})

// 検索履歴
export const searchHistoryState = atom<string[]>({
  key: 'searchHistroy',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const searchHistorySelector = selector<string[]>({
  key: 'searchHistorySelector',
  get: ({ get }) => {
    return get(searchHistoryState)
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) return

    set(searchHistoryState, (currVal: string[]) => {
      return Array.from(new Set([...newValue, ...currVal])).slice(0, 5)
    })
  },
})
