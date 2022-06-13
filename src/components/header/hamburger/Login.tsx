import NextLink from 'next/link'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import InitialIcon from '@/atoms/InitialIcon'
import AvatarIcon from '@/atoms/AvatarIcon'

import styles from '@/styles/components/header/hamburger/login.module.scss'
import useMediaQuery from '@mui/material/useMediaQuery'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiLink from '@mui/material/Link'
import ArticleIcon from '@mui/icons-material/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';

type LoginProps = {
  id: string
  username: string
  avatar: string | undefined
  handleClose: () => void
}

const Login = ({ id, username, avatar, handleClose }: LoginProps) => {
  const pc = useMediaQuery('(min-width: 1182px')

  const account_list = [{
    url: `/account/${ id }`,
    text: '自分の投稿',
    icon: <ArticleIcon />
  }, {
    url: `/account/${ id }/likes`,
    text: 'いいねした投稿',
    icon: <FavoriteIcon />
  }]

  // アカウントのリンク
  const Account = () => {
    const account = useRecoilValue(accountState)

    return (
      <NextLink href={ `/account/${ id }` } passHref>
        <ListItemButton
          className={ styles.list_item_button }
          classes={{ root: styles.list_item_button_root }}
          component='a'
          onClick={ handleClose }
        >
          <ListItemIcon>
            { account.data?.avatar ?
              <AvatarIcon src={ account.data.avatar } variant='medium' /> :
              <InitialIcon username={ username } variant='medium' />
            }
          </ListItemIcon>

          <ListItemText
            primaryTypographyProps={{
              variant: 'h5',
              noWrap: true
            }}
            primary={ username }
          />
        </ListItemButton>
      </NextLink>
    )
  }

  // フォロー、フォロワーのリンク
  const Follow = () => {
    const follow_list = [{
      url: `/account/${ id }/follow`,
      text: 'フォロー'
    }, {
      url: `/account/${ id }/follower`,
      text: 'フォロワー'
    }]

    return (
      <ListItem className={ styles.list_item_follow } classes={{ root: styles.list_item_follow_root }}>
        <ListItemText
          className={ styles.list_text_follow }
          classes={{ primary: styles.list_text_follow_primary }}
          primaryTypographyProps={{ variant: 'caption' }}
          primary={
            follow_list.map(item => (
              <NextLink key={ item.url } href={ item.url } passHref>
                <MuiLink
                  underline='hover'
                  color='inherit'
                  onClick={ handleClose }
                >
                  { item.text }
                </MuiLink>
              </NextLink>
            ))
          }
        />
      </ListItem>
    )
  }

  return (
    <List>
      { pc ?
        // pcサイズ
        <Account />
        :
        // モバイルサイズではフォロー、フォロワーも表示
        <div className={ styles.follow_field }>
          <Account />

          <Follow />
        </div>
      }

      {/* アカウントの各ページ */}
      { account_list.map(item => (
        <NextLink key={ item.url } href={ item.url } passHref>
          <ListItemButton
            className={ styles.list_item_button }
            classes={{ root: styles.list_item_button_root }}
            component='a'
            onClick={ handleClose }
          >
            <ListItemIcon>
              { item.icon }
            </ListItemIcon>

            <ListItemText primaryTypographyProps={{ variant: 'h5' }}>
              { item.text }
            </ListItemText>
          </ListItemButton>
        </NextLink>
      )) }
    </List>
  )
}

export default Login