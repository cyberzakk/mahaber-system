'use client'

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function PaymentsPage(){

  const [members,setMembers] = useState([])
  const [payments,setPayments] = useState([])
  const [total,setTotal] = useState(0)

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
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

    let sum = 0
    data.forEach(p=> sum += p.amount)
    setTotal(sum)
  }

  function isPaid(memberId,month){

    return payments.find(
      p => p.member_id === memberId && p.month === month
    )
  }

  async function pay(memberId,month){

    await supabase
    .from("payments")
    .insert({
      member_id: memberId,
      month: month,
      amount:40
    })

    loadPayments()
  }

  return(

    <div style={{padding:"40px"}}>

      <h2>Mahaber Payments</h2>

      <p>Total Collected: {total} ETB</p>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Name</th>
            <th>Phone</th>

            {months.map(m=>(

              <th key={m}>{m}</th>

            ))}

          </tr>

        </thead>

        <tbody>

          {members.map(member=>(

            <tr key={member.id}>

              <td>{member.full_name}</td>
              <td>{member.phone}</td>

              {months.map(month=>{

                const paid = isPaid(member.id,month)

                return(

                  <td key={month}>

                    {paid ? (

                      <b>40</b>

                    ) : (

                      <button
                        onClick={()=>pay(member.id,month)}
                      >
                        Pay 40
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

  )

}