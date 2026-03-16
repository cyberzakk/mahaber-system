'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Rotations() {

  const [members, setMembers] = useState([])
  const [date, setDate] = useState('')
  const [sabaqi, setSabaqi] = useState('')
  const [snacks, setSnacks] = useState('')

  useEffect(() => {
    getMembers()
  }, [])

  async function getMembers() {
    const { data } = await supabase
      .from('members')
      .select('*')

    setMembers(data)
  }

  async function addRotation() {

    await supabase
      .from('rotations')
      .insert([
        {
          meeting_date: date,
          sabaqi_id: sabaqi,
          snacks_id: snacks
        }
      ])

    alert('Rotation saved')
  }

  return (
    <div>

      <h1>Monthly Rotation</h1>

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />

      <br/><br/>

      <label>Sabaqi</label>
      <select onChange={(e) => setSabaqi(e.target.value)}>
        <option>Select member</option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>
            {m.full_name}
          </option>
        ))}
      </select>

      <br/><br/>

      <label>Snacks</label>
      <select onChange={(e) => setSnacks(e.target.value)}>
        <option>Select member</option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>
            {m.full_name}
          </option>
        ))}
      </select>

      <br/><br/>

      <button onClick={addRotation}>
        Save Rotation
      </button>

    </div>
  )
}