'use client'

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function PaymentHistory() {

  const [payments,setPayments] = useState([])

  useEffect(()=>{
    loadPayments()
  },[])

  async function loadPayments(){

    const {data,error} = await supabase
      .from("payments")
      .select(`
        id,
        amount,
        month,
        members (
          full_name,
          phone
        )
      `)
      .order("id",{ascending:false})

    if(error){
      console.log(error)
      return
    }

    setPayments(data)
  }

  return(

    <div style={{
      padding:"40px",
      fontFamily:"Arial",
      background:"#f5f6fa",
      minHeight:"100vh"
    }}>

      <h1 style={{marginBottom:"30px"}}>Payment History</h1>

      <div style={{
        background:"#fff",
        padding:"20px",
        borderRadius:"8px",
        boxShadow:"0 2px 10px rgba(0,0,0,0.08)"
      }}>

        <table style={{
          width:"100%",
          borderCollapse:"collapse",
          textAlign:"center"
        }}>

          <thead>

            <tr style={{background:"#111",color:"#fff"}}>

              <th style={{padding:"10px"}}>Member</th>
              <th style={{padding:"10px"}}>Phone</th>
              <th style={{padding:"10px"}}>Month</th>
              <th style={{padding:"10px"}}>Amount</th>

            </tr>

          </thead>

          <tbody>

            {payments.length === 0 && (
              <tr>
                <td colSpan="4" style={{padding:"20px"}}>
                  No payments yet
                </td>
              </tr>
            )}

            {payments.map(p=>(
              <tr key={p.id}>

                <td style={{border:"1px solid #ddd",padding:"8px"}}>
                  {p.members?.full_name}
                </td>

                <td style={{border:"1px solid #ddd",padding:"8px"}}>
                  {p.members?.phone}
                </td>

                <td style={{border:"1px solid #ddd",padding:"8px"}}>
                  {p.month}
                </td>

                <td style={{
                  border:"1px solid #ddd",
                  padding:"8px",
                  fontWeight:"bold"
                }}>
                  {p.amount} ETB
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}