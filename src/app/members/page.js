"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function MembersPage() {

  const [members, setMembers] = useState([])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    loadMembers()
  }, [])

  async function loadMembers() {
    const { data } = await supabase
      .from("members")
      .select("*")

    setMembers(data || [])
  }

  async function addMember() {

    if (!name || !phone) {
      alert("Fill all fields")
      return
    }

    await supabase.from("members").insert([
      {
        full_name: name,
        phone: phone
      }
    ])

    setName("")
    setPhone("")

    loadMembers()
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Members
      </h1>

      {/* ADD FORM */}
      <div className="mb-6 bg-white p-4 rounded shadow">

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 mr-2"
        />

        <button
          onClick={addMember}
          className="bg-purple-700 text-white px-4 py-2 rounded"
        >
          Add Member
        </button>

      </div>

      {/* TABLE */}
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