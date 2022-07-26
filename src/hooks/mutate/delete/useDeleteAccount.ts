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

      if(id === 'c6161f81-2879-4fad-a52c-1d19c78c8ff6') {
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