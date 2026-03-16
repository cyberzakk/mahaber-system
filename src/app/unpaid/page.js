'use client'

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function UnpaidPage(){

  const [members,setMembers] = useState([])
  const [payments,setPayments] = useState([])
  const [search,setSearch] = useState("")

  const monthlyFee = 40

  const months = [
    "መስከረም",
    "ጥቅምት",
    "ህዳር",
    "ታህሳስ",
    "ጥር",
    "የካቲት",
    "መጋቢት",
    "ሚያዝያ",
    "ግንቦት",
    "ሰኔ",
    "ሐምሌ",
    "ነሐሴ"
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

    if(error){
      console.log(error)
      return
    }

    setMembers(data)
  }

  async function loadPayments(){

    const {data,error} = await supabase
      .from("payments")
      .select("*")

    if(error){
      console.log(error)
      return
    }

    setPayments(data)
  }

  function getUnpaid(memberId){

    const paidMonths = payments
      .filter(p => p.member_id === memberId)
      .map(p => p.month)

    return months.filter(m => !paidMonths.includes(m))
  }

  function getDebt(memberId){

    const unpaidMonths = getUnpaid(memberId)

    return unpaidMonths.length * monthlyFee
  }

  const filteredMembers = members.filter(m =>
    m.full_name.toLowerCase().includes(search.toLowerCase())
  )

  return(

    <div style={{
      padding:"40px",
      fontFamily:"Arial",
      background:"#f5f6fa",
      minHeight:"100vh"
    }}>

      <h1 style={{marginBottom:"20px"}}>
        ያልተከፈሉ ወራት & ዕዳ (Unpaid Months & Debt)
      </h1>

      <input
        type="text"
        placeholder="Search member name..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{
          padding:"10px",
          width:"300px",
          marginBottom:"20px",
          border:"1px solid #ccc",
          borderRadius:"5px"
        }}
      />

      <table
        style={{
          width:"100%",
          borderCollapse:"collapse",
          background:"#fff"
        }}
      >

        <thead>

          <tr style={{background:"#111",color:"#fff"}}>

            <th style={{padding:"10px"}}>Name</th>
            <th style={{padding:"10px"}}>Phone</th>
            <th style={{padding:"10px"}}>ያልተከፈሉ ወራት</th>
            <th style={{padding:"10px"}}>Debt (ETB)</th>

          </tr>

        </thead>

        <tbody>

          {filteredMembers.map(member=>{

            const unpaid = getUnpaid(member.id)
            const debt = getDebt(member.id)

            return(

              <tr key={member.id}>

                <td style={{border:"1px solid #ddd",padding:"10px"}}>
                  {member.full_name}
                </td>

                <td style={{border:"1px solid #ddd",padding:"10px"}}>
                  {member.phone}
                </td>

                <td style={{border:"1px solid #ddd",padding:"10px"}}>

                  {unpaid.length === 0
                    ? "ሁሉም ተከፍሏል"
                    : unpaid.join(" , ")
                  }

                </td>

                <td style={{
                  border:"1px solid #ddd",
                  padding:"10px",
                  fontWeight:"bold",
                  color: debt > 0 ? "red" : "green"
                }}>
                  {debt} ETB
                </td>

              </tr>

            )

          })}

        </tbody>

      </table>

    </div>

  )

}