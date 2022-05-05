import { useRouter } from 'next/router'
import Image from 'next/image'
import DialogPaper from '@/atoms/DialogPaper'

import styles from '@/styles/components/post/share.module.scss'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Share = () => {
  const router = useRouter()
  const share: {
    url: string;
    social: 'twitter' | 'facebook' | 'line' | 'note' | 'hatena';
    label: 'Twitter' | 'Facebook' | 'LINE' | 'note' | 'はてブ'
  }[] = [{
    url: '/',
    social: 'twitter',
    label: 'Twitter'
  }, {
    url: '/',
    social: 'facebook',
    label: 'Facebook'
  }, {
    url: '/',
    social: 'line',
    label: 'LINE'
  }, {
    url: '/',
    social: 'note',
    label: 'note'
  }, {
    url: '/',
    social: 'hatena',
    label: 'はてブ'
  }]

  const handleClose = () => {
    router.push({
      pathname: router.asPath.replace(/\?.*$/, "")
    }, undefined, {
      shallow: true
    })
  }

  return (
    <DialogPaper
      open={ Boolean(router.query.share) }
      handleClose={ handleClose }
    >
      <DialogTitle>
        <IconButton aria-label='戻る' onClick={ handleClose }>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Typography
        className={ styles.title }
        variant='h3'
      >
        この投稿をシェアする
      </Typography>

      <DialogActions
        className={ styles.stack }
        classes={{ root: styles.stack_root }}
      >
        <FormControlLabel
          className={ styles.label }
          classes={{ root: styles.label_root }}
          control={
            <IconButton className={ styles.copy_button }>
              <ContentCopyIcon className={ styles.copy } />
            </IconButton> 
          }
          label='URLをコピー'
          labelPlacement='bottom'
        />

        { share.map(item => (
          <FormControlLabel
            key={ item.social }
            className={ styles.label }
            classes={{ root: styles.label_root }}
            control={
              <IconButton
                className={ styles.button }
                classes={{ root: styles.button_root }}
                onClick={ () => router.push(item.url) }
              >
                <Image
                  src={ `/image/${ item.social }.png` }
                  alt='共有アイコン'
                  width={ 70 }
                  height={ 70 }
                  quality={ 70 }
                />
              </IconButton>
            }
            label={ item.label }
            labelPlacement='bottom'
          />
        ))}
      </DialogActions>
    </DialogPaper>
  )
}

export default Share