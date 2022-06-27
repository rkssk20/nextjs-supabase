import { ReactElement, useState } from 'react'
import { ContainedButton, DisabledButton } from '@/atoms/Button'
import Layout from '@/components/provider/Layout'
import Side from '@/components/side/Side'

import styles from '@/styles/pages/account/withdrawal.module.scss'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const Withdrawal = () => {
  const [confirm, setConfirm] = useState(false)

  const list = ['アカウントデータ', '記事、コメント', '記事、コメントへのいいね']

  return (
    <Layout type='profile' title='アカウント削除 ' description='' image=''>
      <div className={styles.field}>
        <Typography className={styles.title} variant='h3'>
          アカウントを削除しますか?
        </Typography>

        <Typography className={styles.details} variant='body1'>
          アカウントを削除すると、以下の情報も全て削除されます。
        </Typography>

        {list.map((item) => (
          <Typography className={styles.list_item} color='error' key={item}>
            ・{item}
          </Typography>
        ))}

        <FormControlLabel
          className={styles.checkbox}
          control={<Checkbox checked={confirm} onChange={(e) => setConfirm(e.target.checked)} />}
          label='上記の注意事項を確認した'
        />

        {confirm ? (
          <ContainedButton text='削除する' handle={() => {}} />
        ) : (
          <DisabledButton text='削除する' />
        )}
      </div>
    </Layout>
  )
}

export default Withdrawal

Withdrawal.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
      <Side />
    </>
  )
}
