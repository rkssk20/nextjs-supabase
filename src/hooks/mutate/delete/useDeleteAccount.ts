import { useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { notificateState } from "@/lib/recoil";
import { supabase } from '@/lib/supabaseClient'

const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const router = useRouter()

  const mutate = async () => {
    if(loading) return
    setLoading(true)

    try {
      const id = supabase.auth.user()?.id
      if(!id) throw 'error'

      if(id === '2767ef52-b04e-42ce-9b5e-22166e9eb39') {
        setNotificate({
          open: true,
          message: 'かんたんログインは削除できません'
        })

        return
      }

      const { error } = await supabase
      .rpc("handle_delete_user_created_objects")
  
      if(error) throw error

      fetch('/api/deleteAccount', {
        method: 'POST',
        body: JSON.stringify({ id })
      }).then(() => {
        supabase.auth.signOut().then(() => router.push('/'))
      })

    } catch {
      setNotificate({
        open: true,
        message: 'エラーが発生しました'
      })
    } finally {
      setLoading(false)
    }
  }

  return mutate
}

export default useDeleteAccount