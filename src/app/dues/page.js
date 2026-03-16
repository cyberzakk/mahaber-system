'use client'

import { useEffect,useState } from "react"
import { supabase } from "../../lib/supabase"

export default function DuesPage(){

  const [members,setMembers] = useState([])
  const [payments,setPayments] = useState([])

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

    if(error) console.log(error)

    setMembers(data)
  }

  async function loadPayments(){

    const {data,error} = await supabase
    .from("payments")
    .select("*")

    if(error) console.log(error)

    setPayments(data)
  }

  function unpaid(memberId){

    const paidMonths = payments
      .filter(p=>p.member_id === memberId)
      .map(p=>p.month)

    return months.filter(m => !paidMonths.includes(m))
  }

  return(

    <div style={{padding:"40px"}}>

      <h2>All Members Unpaid Months</h2>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Unpaid Months</th>
            <th>Debt</th>
          </tr>

        </thead>

        <tbody>

          {members.map(member=>{

            const u = unpaid(member.id)
            const debt = u.length * 40

            return(

              <tr key={member.id}>

                <td>{member.full_name}</td>

                <td>{member.phone}</td>

                <td>{u.join(" , ")}</td>

                <td style={{color:"red"}}>

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