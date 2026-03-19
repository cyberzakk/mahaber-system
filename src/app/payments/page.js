"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function PaymentsPage() {

  const [payments, setPayments] = useState([])
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ]

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {

    const { data: membersData } = await supabase
      .from("members")
      .select("*")

    const { data: paymentsData } = await supabase
      .from("payments")
      .select("*")

    setMembers(membersData || [])
    setPayments(paymentsData || [])
    setLoading(false)
  }

  function getPayment(memberId, month) {
    return payments.find(
      (p) => p.member_id === memberId && p.month === month
    )
  }

  // ✅ ADD PAYMENT (PREVENT DUPLICATE)
  async function handlePay(member, month) {

    const existing = getPayment(member.id, month)

    if (existing) {
      alert("⚠️ Already paid for this month!")
      return
    }

    const amount = prompt(`Enter amount for ${month}`)
    if (!amount) return

    const { error } = await supabase
      .from("payments")
      .insert([
        {
          member_id: member.id,
          month: month,
          amount: amount
        }
      ])

    if (error) {
      alert("❌ Error adding payment")
    } else {
      alert("✅ Payment added")
      loadData()
    }
  }

  // ✏️ EDIT PAYMENT
  async function handleEdit(payment) {

    const newAmount = prompt("Edit amount", payment.amount)
    if (!newAmount) return

    const { error } = await supabase
      .from("payments")
      .update({ amount: newAmount })
      .eq("id", payment.id)

    if (error) {
      alert("❌ Error updating")
    } else {
      alert("✅ Updated")
      loadData()
    }
  }

  if (loading) {
    return <div className="p-10 text-gray-900">Loading...</div>
  }

  return (
    <div className="p-6 text-gray-900">

      <h1 className="text-3xl font-bold mb-6">
        Payments
      </h1>

      <div className="overflow-x-auto border rounded-lg shadow">

        <table className="min-w-[1200px] w-full border-collapse">

          {/* HEADER */}
          <thead className="bg-gray-800 text-white sticky top-0">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Phone</th>

              {months.map((m) => (
                <th key={m} className="p-3 border text-sm">
                  {m}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {members.map((member, index) => (
              <tr
                key={member.id}
                className={`border ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >

                <td className="p-3 border font-semibold">
                  {member.full_name}
                </td>

                <td className="p-3 border text-sm">
                  {member.phone}
                </td>

                {months.map((month) => {
                  const payment = getPayment(member.id, month)

                  return (
                    <td key={month} className="p-2 border text-center">

                      {payment ? (
                        <div
                          onClick={() => handleEdit(payment)}
                          className="cursor-pointer text-green-600 font-bold text-sm hover:underline"
                        >
                          ✔ {payment.amount}
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePay(member, month)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Pay
                        </button>
                      )}

                    </td>
                  )
                })}

              </tr>
            ))}

            {members.length === 0 && (
              <tr>
                <td colSpan="20" className="p-4 text-center text-gray-500">
                  No members found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}