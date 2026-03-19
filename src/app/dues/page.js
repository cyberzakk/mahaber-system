"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function DuesPage(){

  const [members,setMembers] = useState([])
  const [payments,setPayments] = useState([])

  const months = [
    "መስከረም","ጥቅምት","ህዳር","ታህሳስ",
    "ጥር","የካቲት","መጋቢት","ሚያዝያ",
    "ግንቦት","ሰኔ","ሐምሌ","ነሐሴ"
  ]

  useEffect(()=>{
    loadMembers()
    loadPayments()
  },[])

  async function loadMembers(){
    const {data,error} = await supabase
    .from("members")
    .select("*")
    .order("full_name")

    if(error) console.log(error)
    setMembers(data || [])
  }

  async function loadPayments(){
    const {data,error} = await supabase
    .from("payments")
    .select("*")

    if(error) console.log(error)
    setPayments(data || [])
  }

  function unpaid(memberId){

    const paidMonths = payments
      .filter(p=>p.member_id === memberId)
      .map(p=>p.month)

    return months.filter(m => !paidMonths.includes(m))
  }

  return(

    <div className="p-6 text-gray-900">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6">
        All Members Unpaid Months
      </h2>

      {/* CARD */}
      <div className="bg-white rounded-lg shadow border overflow-x-auto">

        <table className="min-w-[900px] w-full border-collapse text-sm">

          {/* HEADER */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Unpaid Months</th>
              <th className="p-3 border">Debt</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {members.map((member, index)=>{

              const u = unpaid(member.id)
              const debt = u.length * 40

              return(

                <tr
                  key={member.id}
                  className={`border ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >

                  {/* NAME */}
                  <td className="p-3 border font-medium">
                    {member.full_name}
                  </td>

                  {/* PHONE */}
                  <td className="p-3 border">
                    {member.phone}
                  </td>

                  {/* UNPAID MONTHS */}
                  <td className="p-3 border">

                    {u.length === 0 ? (
                      <span className="text-green-600 font-semibold">
                        ✔ All Paid
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-2">

                        {u.map((m,i)=>(
                          <span
                            key={i}
                            className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs"
                          >
                            {m}
                          </span>
                        ))}

                      </div>
                    )}

                  </td>

                  {/* DEBT */}
                  <td className="p-3 border font-bold">

                    {debt === 0 ? (
                      <span className="text-green-600">
                        0 ETB
                      </span>
                    ) : (
                      <span className="text-red-600">
                        {debt} ETB
                      </span>
                    )}

                  </td>

                </tr>

              )

            })}

            {members.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
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