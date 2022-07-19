import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import type { ArticleType } from '@/types/types'
import { notificateState } from '@/lib/recoil'
import { supabase } from '@/lib/supabaseClient'

const FetchData = async () => {
  const res = await fetch(`/api/getTrend`)

  const gaRes = await res.json()
  
  let array: any[] = []
  
  gaRes.response.map((item: any) => (
    array.push(item.dimensionValues[0].value.replace('/article/', ''))
  ))

  const { data, error } = await supabase
    .from<ArticleType>('articles')
    .select('*')
    .in('id', array)

  if (error) throw error

  return data
}

const useTrend = () => {
  const setNotificate = useSetRecoilState(notificateState)

  const { data, isFetching } = useQuery('trend', () => FetchData(), {
    onError: () => {
      setNotificate({
        open: true,
        message: 'エラーが発生しました。',
      })
    }
  })

  return { data, isFetching }
}

export default useTrend
