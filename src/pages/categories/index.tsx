import type { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PageLayout from '@/components/provider/PageLayout'
import ContainerLayout from '@/components/provider/ContainerLayout'
import Side from '@/components/side/Side'

import styles from '@/styles/pages/categories/index.module.scss'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Categories = () => {
  const categories = [{
    url: 'nextjs',
    text: 'Next.js',
  }, {
    url: 'supabase',
    text: 'Supaabse',
  }, {
    url: 'hasura',
    text: 'Hasura'
  }, {
    url: 'firebase',
    text: 'Firebase'
  }]

  return (
    <ContainerLayout
      type='article'
      title=''
      description=''
      image=''
    >
      <Typography className={styles.title} variant='h3'>
        カテゴリ一覧
      </Typography>

      <div className={styles.content}>
        {categories.map((item) => (
          <Link key={item.url} href={'/categories/' + item.url} passHref>
            <Button
              className={styles.button}
              classes={{
                root: styles.button_root,
                focusVisible: styles.button_focus,
                startIcon: styles.button_start_icon,
              }}
              variant='contained'
              color='info'
              disableElevation
              component='a'
              startIcon={
                <Image
                  layout='fill'
                  objectFit='contain'
                  quality={70}
                  alt={item.text}
                  src={`/image/${item.url}.png`}
                />
              }
            >
              {'# ' + item.text}
            </Button>
          </Link>
        ))}
      </div>
    </ContainerLayout>
  )
}

export default Categories

Categories.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}
      <Side />
    </PageLayout>
  )
}
