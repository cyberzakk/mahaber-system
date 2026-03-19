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
        member_id,
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

    setPayments(data || [])
  }

  return(

    <div style={{
      padding:"40px",
      fontFamily:"Arial",
      background:"#f5f6fa",
      minHeight:"100vh",
      color:"#111"   // ✅ FIX: force visible text
    }}>

      {/* TITLE */}
      <h1 style={{
        marginBottom:"30px",
        color:"#111"   // ✅ FIX
      }}>
        Payment History
      </h1>

      {/* CARD */}
      <div style={{
        background:"#ffffff",
        padding:"20px",
        borderRadius:"8px",
        boxShadow:"0 2px 10px rgba(0,0,0,0.08)",
        overflowX:"auto"   // ✅ scroll if needed
      }}>

        <table style={{
          width:"100%",
          borderCollapse:"collapse",
          textAlign:"center",
          minWidth:"600px",
          color:"#111"   // ✅ FIX
        }}>

          <thead>

            <tr style={{
              background:"#111",
              color:"#fff"
            }}>

              <th style={{padding:"12px",border:"1px solid #444"}}>Member</th>
              <th style={{padding:"12px",border:"1px solid #444"}}>Phone</th>
              <th style={{padding:"12px",border:"1px solid #444"}}>Month</th>
              <th style={{padding:"12px",border:"1px solid #444"}}>Amount</th>

            </tr>

          </thead>

          <tbody>

            {payments.length === 0 && (
              <tr>
                <td colSpan="4" style={{
                  padding:"20px",
                  color:"#555"
                }}>
                  No payments yet
                </td>
              </tr>
            )}

            {payments.map((p,index)=>(
              <tr
                key={p.id}
                style={{
                  background: index % 2 === 0 ? "#fff" : "#f9f9f9"
                }}
              >

                <td style={{
                  border:"1px solid #ddd",
                  padding:"10px",
                  color:"#111"
                }}>
                  {p.members?.full_name || "N/A"}
                </td>

                <td style={{
                  border:"1px solid #ddd",
                  padding:"10px",
                  color:"#111"
                }}>
                  {p.members?.phone || "N/A"}
                </td>

                <td style={{
                  border:"1px solid #ddd",
                  padding:"10px",
                  color:"#111"
                }}>
                  {p.month}
                </td>

                <td style={{
                  border:"1px solid #ddd",
                  padding:"10px",
                  fontWeight:"bold",
                  color:"#16a34a"   // ✅ green amount
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