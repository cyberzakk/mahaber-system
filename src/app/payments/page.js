"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function PaymentsPage() {

  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPayments()
  }, [])

  async function loadPayments() {

    // Fix: include member_id to ensure relation works
    const { data, error } = await supabase
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
      .order("id", { ascending: false })

    if (error) {
      console.log("ERROR:", error)
      setPayments([])
    } else {
      setPayments(data || [])
    }

    setLoading(false)
  }

  if (loading) {
    return <div className="p-10">Loading...</div>
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Payments
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-300">

        {/* Remove nested table */}
        <table className="w-full text-left border-collapse">

          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3 border-b border-gray-700">Name</th>
              <th className="p-3 border-b border-gray-700">Phone</th>
              <th className="p-3 border-b border-gray-700">Month</th>
              <th className="p-3 border-b border-gray-700">Amount</th>
            </tr>
          </thead>

          <tbody>

            {payments.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No payments found
                </td>
              </tr>
            )}

            {payments.map((p) => (

              <tr key={p.id} className="border-b border-gray-200">

                <td className="p-3">
                  {p.members?.full_name || "N/A"}
                </td>

                <td className="p-3">
                  {p.members?.phone || "N/A"}
                </td>

                <td className="p-3">
                  {p.month || "-"}
                </td>

                <td className="p-3">
                  {p.amount ? `${p.amount} ETB` : "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}