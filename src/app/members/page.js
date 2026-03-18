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
    const { data, error } = await supabase
      .from("members")
      .select("*")

    if (error) {
      console.log(error)
      return
    }

    setMembers(data || [])
  }

  async function addMember() {

    if (!name || !phone) {
      alert("Fill all fields")
      return
    }

    const { error } = await supabase
      .from("members")
      .insert([
        {
          full_name: name,
          phone: phone
        }
      ])

    if (error) {
      alert("Error adding member")
      return
    }

    setName("")
    setPhone("")
    loadMembers()
  }

  // ✅ DELETE FUNCTION
  async function deleteMember(id) {

    const confirmDelete = confirm("Are you sure you want to delete?")

    if (!confirmDelete) return

    const { error } = await supabase
      .from("members")
      .delete()
      .eq("id", id)

    if (error) {
      alert("Delete failed")
      return
    }

    loadMembers()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 p-10">

      <h1 className="text-4xl font-bold mb-8 text-purple-900">
        👥 Members
      </h1>

      {/* FORM */}
      <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg flex flex-wrap gap-4 items-center">

        <input
          placeholder="Enter Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg w-64 text-black"
        />

        <input
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-3 rounded-lg w-64 text-black"
        />

        <button
          onClick={addMember}
          className="bg-purple-700 text-white px-6 py-3 rounded-lg"
        >
          ➕ Add Member
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-purple-800 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>

            {members.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  🚫 No members found
                </td>
              </tr>
            )}

            {members.map((m) => (
              <tr key={m.id} className="border-b">
                <td className="p-4 text-black">{m.full_name}</td>
                <td className="p-4 text-black">{m.phone}</td>

                {/* DELETE BUTTON */}
                <td className="p-4">
                  <button
                    onClick={() => deleteMember(m.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    🗑 Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}