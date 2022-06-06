import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react'
import Color from '@/lib/color'
import Crop from '@/components/account/setting/Crop'

import styles from '@/styles/components/account/setting/icon.module.scss'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

type IconProps = {
  newUserName: string
  newAvatar: string | null
  setNewAvatar: Dispatch<SetStateAction<string | null>>
}

const Icon = ({ newUserName, newAvatar, setNewAvatar }: IconProps) => {
  const [selectImage, setSelectImage] = useState('')
  const color = Color(newUserName)

  // 画像選択
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {    
    if(!e.target.files || !e.target.files[0]) return
    setSelectImage(window.URL.createObjectURL(e.target.files[0]))
  }

  // 切り抜いた画像を削除
  const handleCancel = () => {
    (document.getElementById('icon-button-file') as HTMLInputElement).value = ''
    setNewAvatar(null)
  }

  return (
    <label className={ styles.field } htmlFor="icon-button-file">
      {/* 表示せずボタンと連携するinput */}
      <input
        className={ styles.hidden_button }
        accept="image/*"
        id="icon-button-file"
        type="file"
        onChange={ handleImage }
      />

      <IconButton
        className={ styles.icon_button }
        classes={{ root: styles.icon_button_root }}
        aria-label="upload picture"
        component='span'
      >
        { (newAvatar !== null) ?
          // 切り抜いた画像のアバター
          <Avatar
            className={ styles.avatar }
            classes={{ root: styles.avatar_root }}
            src={ newAvatar }
          />
          :
          // 画像なしのアバター
          <Avatar
            className={ styles.avatar }
            classes={{ root: styles.avatar_root }}
            sx={{ bgcolor: color }}
            // src='/image/back.png'
          >
              { newUserName.slice(0, 1) }
          </Avatar>
        }
      </IconButton>

      {/* 表示せずボタンと連携するinput */}
      <input
        className={ styles.hidden_button }
        accept="image/*"
        id="input-button"
        type="file"
        onChange={ handleImage }
      />

      <Button
        className={ styles.text_button }
        classes={{ root: styles.text_button_root }}
        aria-label="upload picture"
        component='span'
      >
        変更する
      </Button>

      <Button
        className={ styles.text_button }
        classes={{ root: styles.text_button_root }}
        onClick={ handleCancel }
        color='info'
      >
        削除する
      </Button>

      {/* 切り抜きのダイアログ */}
      <Crop
        selectImage={ selectImage }
        setSelectImage={ setSelectImage }
        setNewAvatar={ setNewAvatar }
      />
    </label>
  )
}

export default Icon