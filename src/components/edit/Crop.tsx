import { useState, useRef, Dispatch, SetStateAction } from 'react';
import AvatarEditor from 'react-avatar-editor'
import CropSlider from '@/atoms/CropSlider';
import CropButtons from '@/atoms/CropButtons'
import Circular from '@/atoms/Circular'

import MuiDialog from '@mui/material/Dialog'

type Props = {
  selectImage: string
  setSelectImage: Dispatch<SetStateAction<string>>
  setImage: Dispatch<SetStateAction<Blob | null>>
}

const Crop = ({ selectImage, setSelectImage, setImage }: Props) => {
  const [loading, setLoading] = useState(false)
  const [scale, setScale] = useState(10)
  const ref = useRef<AvatarEditor>(null)
  const bodyWidth = document.body.clientWidth

  // キャンセル
  const handleClose = () => {
    if(loading) return
    (document.getElementById('icon-button-file') as HTMLInputElement).value = '';
    setSelectImage('')
  }

  // 送信
  const handleConfirm = () => {
    if(ref) {
      if(loading) return
      setLoading(true)
      // chromeならwebpに変換し、画質を0.5にする
      // chrome以外ではpngに変換される
      ref.current.getImage().toBlob((blob: Blob) => {
        setImage(blob);
        
        (document.getElementById('icon-button-file') as HTMLInputElement).value = '';
        setSelectImage('');
        setLoading(false)
      }, 'image/webp', 1)
    }
  }

  return (
    <MuiDialog
      open={ Boolean(selectImage) }
      onClose={ handleClose }
    >
      {/* 画像の切り抜き */}
      <AvatarEditor
        ref={ ref }
        image={ selectImage }
        width={ (bodyWidth > 600) ? 600 : (bodyWidth - 64) }
        height={ (bodyWidth > 600) ? 385 : ((bodyWidth - 64) * 0.525) }
        border={ 0 }
        color={ [ 0, 0, 0, 0.6] }
        scale={ scale / 10 }
      />

      {/* 画像サイズのスライダー */}
      <CropSlider scale={ scale } setScale={ setScale } />

      {/* ボタン全体 */}
      { loading ?
        <Circular />
        :
        <CropButtons handleClose={ handleClose } handleConfirm={ handleConfirm } />
      }
    </MuiDialog>
  )
}

export default Crop