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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 p-10">

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-8 text-purple-900">
        👥 Members
      </h1>

      {/* FORM CARD */}
      <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg flex flex-wrap gap-4 items-center">

        <input
          placeholder="Enter Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-purple-300 p-3 rounded-lg w-64 
                     bg-white text-gray-900 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-purple-300 p-3 rounded-lg w-64 
                     bg-white text-gray-900 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={addMember}
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
        >
          ➕ Add Member
        </button>

      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gradient-to-r from-purple-700 to-purple-900 text-white">
            <tr>
              <th className="p-4 text-lg">Name</th>
              <th className="p-4 text-lg">Phone</th>
            </tr>
          </thead>

          <tbody>

            {members.length === 0 && (
              <tr>
                <td colSpan="2" className="p-6 text-center text-gray-500 text-lg">
                  🚫 No members found
                </td>
              </tr>
            )}

            {members.map((m) => (
              <tr
                key={m.id}
                className="border-b hover:bg-purple-50 transition"
              >
                <td className="p-4 font-medium text-gray-800">
                  {m.full_name}
                </td>
                <td className="p-4 text-gray-700">
                  {m.phone}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}