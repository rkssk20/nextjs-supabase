import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import type { ProfilesSummaryType } from '@/types/types'
import { notificateState } from '@/lib/recoil'
import { supabase } from '@/lib/supabaseClient'

const FetchData = async () => {
  try {  
    const { data, error } = await supabase
      .from<ProfilesSummaryType>('profiles')
      .select('id, username, details, avatar')
      .order('follower_count', {
        ascending: false
      })
      .limit(5)
  
    if (error) throw error
  
    return data
  } catch (error) {
    throw error
  }
}

const useTrendUser = () => {
  const setNotificate = useSetRecoilState(notificateState)

  const { data } = useQuery('trend_user', () => FetchData(), {
    onError: () => {
      setNotificate({
        open: true,
        message: 'エラーが発生しました。',
      })
    }
  })

  return data
}

export default useTrendUser
