import { useInfiniteQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import type { ArticleType } from '@/types/types'
import { notificateState } from '@/lib/recoil'
import { supabase } from '@/lib/supabaseClient'

const FetchData = async (
  pageParam: string | undefined,
  word: string | string[],
) => {
  const { data, error } = pageParam
    ? // 初回読み込み
      await supabase.rpc('handle_articles_search_more', {
        word,
        created: pageParam,
      })
    : // 追加読み込み
      await supabase.rpc('handle_articles_search', {
        word,
      })

  if (error) throw error

  return data as unknown as ArticleType[]
}

const useArticlesSearch = (word: string | string[]) => {
  const setNotificate = useSetRecoilState(notificateState)

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['articles_search', word],
    ({ pageParam }) => FetchData(pageParam, word),
    {
      onError: () => {
        setNotificate({
          open: true,
          message: 'エラーが発生しました。',
        })
      },
      getNextPageParam: (lastPage) => 
        lastPage && lastPage.length === 10 ? lastPage[lastPage.length - 1].created_at : false
    },
  )

  return { data, isFetching, hasNextPage, fetchNextPage }
}

export default useArticlesSearch
