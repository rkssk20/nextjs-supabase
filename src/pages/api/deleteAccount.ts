import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY as string
)

export default async function deleteAccount(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)
  
  if (body.id && (body.id != '2767ef52-b04e-42ce-9b5e-22166e9eb39')) {
    const { data: deletedUser, error } = await supabaseServer.auth.api.deleteUser(body.id)

    if (error) {
      return res.status(401).json({
        error
      })
    }

    return res.status(200).json({
      deletedUser
    })
  } else {
    return res.status(400).json({
      error: 'no id'
    })
  }
}