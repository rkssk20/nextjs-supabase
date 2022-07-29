import type { ReactElement } from 'react'
import useTrend from '@/hooks/select/useTrend'
import Introduction from '@/atoms/Introduction'
import Circular from '@/atoms/Circular'
import PageLayout from '@/components/provider/PageLayout'
import ContainerLayout from '@/components/provider/ContainerLayout'
import Post from '@/components/post/Post'
import SideUser from '@/components/side/SideUser'

const Home = () => {
  const { data, isFetching } = useTrend()

  return (
    <ContainerLayout
      type='website'
      title=''
      description=''
      image=''
    >
      { data && data.map(item => (
        <Post
          key={ item.id }
          data={ item }
          setRef={ false }
        />
      )) }

      { isFetching && <Circular /> }
    </ContainerLayout>
  )
}

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      <Introduction details />
      
      { page }

      <SideUser />
    </PageLayout>
  )
}