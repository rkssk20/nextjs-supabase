import React from 'react'
import useObserver from '@/hooks/atoms/useObserver'
import useUserNoWord from '@/hooks/select/search/useUserNoWord'
import Circular from '@/atoms/Circular'
import Account from '@/components/account/follow/Account'

const UserNoWord = () => {
  const { data, isFetching, hasNextPage, fetchNextPage } = useUserNoWord()
  const setRef = useObserver({ hasNextPage, fetchNextPage })

  return (
    <React.Fragment>
      { data && data.pages.map((page, page_index) => (
        page.map((item, index) => (
          <Account
            key={ item.id }
            data={ item }
            setRef={
              ((data.pages.length - 1) === page_index) && ((page.length - 1) === index) && setRef
            }
          />
        ))
      ))}

      { isFetching && <Circular /> }
    </React.Fragment>
  )
}

export default UserNoWord