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

  const PRICE_PER_MONTH = 40  // ✅ 40 ETB per month

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

    <div style={{
      padding:"30px",
      background:"#f5f6fa",
      minHeight:"100vh",
      color:"#111"
    }}>

      {/* TITLE */}
      <h2 style={{
        fontSize:"28px",
        fontWeight:"bold",
        marginBottom:"20px",
        color:"#1e293b"
      }}>
        💰 Members Dues Overview
      </h2>

      {/* TABLE CONTAINER */}
      <div style={{
        background:"#fff",
        borderRadius:"10px",
        boxShadow:"0 4px 10px rgba(0,0,0,0.08)",
        overflowX:"auto"
      }}>

        <table style={{
          width:"100%",
          borderCollapse:"collapse",
          minWidth:"800px"
        }}>

          {/* HEADER */}
          <thead>

            <tr style={{
              background:"#0f172a",
              color:"#fff",
              fontWeight:"bold"
            }}>
              <th style={th}>Name</th>
              <th style={th}>Phone</th>
              <th style={th}>Unpaid Months</th>
              <th style={th}>Debt (ETB)</th>
            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {members.map((member,index)=>{

              const u = unpaid(member.id)

              // ✅ Calculate debt clearly
              const debt = u.length * PRICE_PER_MONTH

              return(

                <tr key={member.id} style={{
                  background: index % 2 === 0 ? "#ffffff" : "#f1f5f9"
                }}>

                  {/* NAME */}
                  <td style={{
                    ...td,
                    fontWeight:"bold",
                    color:"#0f172a"
                  }}>
                    {member.full_name}
                  </td>

                  {/* PHONE */}
                  <td style={{
                    ...td,
                    fontWeight:"bold",
                    color:"#334155"
                  }}>
                    {member.phone}
                  </td>

                  {/* UNPAID MONTHS */}
                  <td style={td}>

                    {u.length === 0 ? (
                      <span style={{
                        color:"#16a34a",
                        fontWeight:"bold"
                      }}>
                        ✔ All Paid
                      </span>
                    ) : (
                      <div style={{
                        display:"flex",
                        flexWrap:"wrap",
                        gap:"6px"
                      }}>

                        {u.map((m,i)=>(
                          <span
                            key={i}
                            style={{
                              background:"#fee2e2",
                              color:"#b91c1c",
                              padding:"4px 8px",
                              borderRadius:"5px",
                              fontSize:"12px",
                              fontWeight:"bold"
                            }}
                          >
                            {m}
                          </span>
                        ))}

                      </div>
                    )}

                  </td>

                  {/* DEBT */}
                  <td style={{
                    ...td,
                    fontWeight:"bold",
                    fontSize:"16px"
                  }}>

                    {debt === 0 ? (
                      <span style={{color:"#16a34a"}}>
                        0 ETB
                      </span>
                    ) : (
                      <span style={{color:"#dc2626"}}>
                        {debt} ETB
                      </span>
                    )}

                  </td>

                </tr>

              )

            })}

            {members.length === 0 && (
              <tr>
                <td colSpan="4" style={{
                  padding:"20px",
                  textAlign:"center",
                  color:"#555"
                }}>
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

/* STYLES */
const th = {
  padding:"12px",
  border:"1px solid #1e293b"
}

const td = {
  padding:"10px",
  border:"1px solid #e5e7eb"
}