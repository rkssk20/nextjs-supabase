import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import type { definitions } from '@/types/supabase'
import { notificateState } from '@/lib/recoil'
import { supabase } from '@/lib/supabaseClient'

type TrendType = {
  id: definitions['articles']['id']
  title: definitions['articles']['title']
  image: definitions['articles']['id']
  profiles: {
    username: definitions['profiles']['username']
  }
}

const FetchData = async () => {
  try {
    const res = await fetch(`/api/getTrend`)

    const gaRes = await res.json()
    
    let array: any[] = []
    
    gaRes.response.map((item: any) => (
      array.push(item.dimensionValues[0].value.replace('/article/', ''))
    ))
  
    const { data, error } = await supabase
      .from<TrendType>('articles')
      .select('id, title, image, profiles!reference_articles_profiles(username)')
      .in('id', array)
  
    if (error) throw error
  
    return data
  } catch (error) {
    throw error
  }
}

const useSideTrend = () => {
  const setNotificate = useSetRecoilState(notificateState)

  const { data } = useQuery('side_trend', () => FetchData(), {
    onError: () => {
      setNotificate({
        open: true,
        message: 'エラーが発生しました。',
      })
    }
  })

  return data
}

export default useSideTrend
