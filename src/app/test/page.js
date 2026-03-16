'use client'

import { useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Test() {

  useEffect(() => {
    async function getMembers() {
      const { data, error } = await supabase
        .from('members')
        .select('*')

      console.log(data)
    }

    getMembers()
  }, [])

  return <div>Check browser console</div>
}