import { ReactElement } from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ContainedButton } from '@/atoms/Button'
import ArticleImage from '@/atoms/Image/ArticleImage'
import Introduction from '@/atoms/Introduction'
import PageLayout from '@/components/provider/PageLayout'
import ContainerLayout from '@/components/provider/ContainerLayout'
import Side from '@/components/side/Side'

import styles from '@/styles/pages/about.module.scss'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'

const About = () => {
  const router = useRouter()

  return (
    <ContainerLayout
      type='article'
      title='このサイトについて'
      description=''
      image=''
    >
      <Typography className={styles.title} classes={{ root: styles.title_root }} variant='h3'>
        技術選定
      </Typography>

      <NextLink href='/article/NyAwXWU3ZIpjT8AK9MER' passHref>
        <MuiLink className={styles.link}>Next.js × Supabaseの技術選定</MuiLink>
      </NextLink>

      <Typography className={styles.title} classes={{ root: styles.title_root }} variant='h3'>
        GitHubリポジトリ
      </Typography>

      <NextLink href='https://github.com/rkssk20/nextjs-supabase' passHref>
        <MuiLink className={styles.link} target='_blank'>
          rkssk20/nextjs-supabase
        </MuiLink>
      </NextLink>

      <div className={styles.button}>
        <ContainedButton text='かんたんログイン' handle={() => router.push('/login')} />
      </div>

      <ArticleImage image='/others/lighthouse.jpeg' />
    </ContainerLayout>
  )
}

export default About

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      <Introduction details={ false } />
      
      {page}

      <Side />
    </PageLayout>
  )
}
