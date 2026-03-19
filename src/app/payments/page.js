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

    // Load members
    const { data: membersData } = await supabase
      .from("members")
      .select("*")

    // Load payments
    const { data: paymentsData, error } = await supabase
      .from("payments")
      .select(`
        id,
        amount,
        month,
        member_id,
        members (
          full_name,
          phone
        )
      `)

    if (error) {
      console.log(error)
    }

    setMembers(membersData || [])
    setPayments(paymentsData || [])
    setLoading(false)
  }

  // Check if member paid for a month
  function getPayment(memberId, month) {
    return payments.find(
      (p) => p.member_id === memberId && p.month === month
    )
  }

  // Add payment
  async function handlePay(member) {

    const month = prompt("Enter month (e.g. March)")
    if (!month) return

    const amount = prompt("Enter amount")
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
      console.log(error)
      alert("❌ Error adding payment")
    } else {
      alert("✅ Payment added!")
      loadData()
    }
  }

  if (loading) {
    return <div className="p-10 text-gray-900">Loading...</div>
  }

  return (
    <div className="p-10 text-gray-900">

      {/* Title FIXED */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Payments
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-300">

        <table className="w-full text-left border-collapse">

          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Phone</th>

              {months.map((m) => (
                <th key={m} className="p-3 border-b text-sm">
                  {m}
                </th>
              ))}

            </tr>
          </thead>

          <tbody>

            {members.length === 0 && (
              <tr>
                <td colSpan="20" className="p-4 text-center">
                  No members found
                </td>
              </tr>
            )}

            {members.map((member) => (
              <tr key={member.id} className="border-b">

                <td className="p-3 font-medium">
                  {member.full_name}
                </td>

                <td className="p-3">
                  {member.phone}
                </td>

                {months.map((m) => {
                  const payment = getPayment(member.id, m)

                  return (
                    <td key={m} className="p-2 text-center">

                      {payment ? (
                        <span className="text-green-600 font-bold">
                          ✔ {payment.amount}
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePay(member)}
                          className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                        >
                          Pay
                        </button>
                      )}

                    </td>
                  )
                })}

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}