"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function MembersPage() {

  const [members, setMembers] = useState([])

  useEffect(() => {
    loadMembers()
  }, [])

  async function loadMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("*")

    if (error) {
      console.log(error)
    } else {
      setMembers(data || [])
    }
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Members
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-purple-700 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Phone</th>
          </tr>
        </thead>

        <tbody>

          {members.length === 0 && (
            <tr>
              <td colSpan="2" className="p-4 text-center">
                No members found
              </td>
            </tr>
          )}

          {members.map((m) => (
            <tr key={m.id} className="border-b">
              <td className="p-3">{m.full_name}</td>
              <td className="p-3">{m.phone}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}