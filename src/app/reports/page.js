"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js"

import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

export default function ReportsPage(){

  const [payments,setPayments] = useState([])
  const [search,setSearch] = useState("")
  const [filterMonth,setFilterMonth] = useState("All")

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

  const filtered = payments.filter(p=>{
    const matchName = p.members?.full_name?.toLowerCase().includes(search.toLowerCase())
    const matchMonth = filterMonth === "All" || p.month === filterMonth
    return matchName && matchMonth
  })

  function buildData(){
    return filtered.map(p=>({
      Name:p.members?.full_name,
      Phone:p.members?.phone,
      Month:p.month,
      Amount:p.amount
    }))
  }

  function exportExcel(){
    const worksheet = XLSX.utils.json_to_sheet(buildData())
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook,worksheet,"Report")
    XLSX.writeFile(workbook,"Mahaber_Report.xlsx")
  }

  function exportPDF(){
    const doc = new jsPDF()

    autoTable(doc,{
      head:[["Name","Phone","Month","Amount"]],
      body:buildData().map(d=>[
        d.Name,
        d.Phone,
        d.Month,
        d.Amount
      ])
    })

    doc.save("Mahaber_Report.pdf")
  }

  const total = filtered.reduce((sum,p)=>sum + p.amount,0)
  const count = filtered.length
  const avg = count ? Math.round(total / count) : 0

  const months = {}
  filtered.forEach(p=>{
    if(!months[p.month]) months[p.month] = 0
    months[p.month] += p.amount
  })

  const chartData = {
    labels:Object.keys(months),
    datasets:[{
      label:"Monthly Payments",
      data:Object.values(months),
      backgroundColor:"rgba(54,162,235,0.6)"
    }]
  }

  /* ✅ FIX: styles INSIDE component */
  const card = {
    flex:1,
    background:"#fff",
    padding:"15px",
    borderRadius:"8px",
    boxShadow:"0 2px 6px rgba(0,0,0,0.1)"
  }

  const box = {
    background:"#fff",
    padding:"20px",
    borderRadius:"8px",
    marginBottom:"20px"
  }

  const input = {
    padding:"10px",
    marginRight:"10px",
    border:"1px solid #ccc",
    borderRadius:"5px"
  }

  const btnGreen = {
    padding:"10px 15px",
    marginRight:"10px",
    background:"#28a745",
    color:"#fff",
    border:"none",
    borderRadius:"5px",
    cursor:"pointer"
  }

  const btnRed = {
    padding:"10px 15px",
    background:"#dc3545",
    color:"#fff",
    border:"none",
    borderRadius:"5px",
    cursor:"pointer"
  }

  const th = {
    padding:"10px",
    border:"1px solid #444"
  }

  const td = {
    padding:"10px",
    border:"1px solid #ddd"
  }

  return(

    <div style={{
      padding:"30px",
      background:"#f5f6fa",
      minHeight:"100vh",
      color:"#111"
    }}>

      <h1 style={{marginBottom:"20px"}}>
        Mahaber Payment Reports
      </h1>

      {/* SUMMARY */}
      <div style={{display:"flex",gap:"15px",marginBottom:"20px"}}>
        <div style={card}><h3>Total</h3><p>{total} ETB</p></div>
        <div style={card}><h3>Payments</h3><p>{count}</p></div>
        <div style={card}><h3>Average</h3><p>{avg} ETB</p></div>
      </div>

      {/* FILTERS */}
      <div style={{marginBottom:"20px"}}>
        <input
          placeholder="Search member..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          style={input}
        />

        <select
          value={filterMonth}
          onChange={(e)=>setFilterMonth(e.target.value)}
          style={input}
        >
          <option>All</option>
          {[...new Set(payments.map(p=>p.month))].map(m=>(
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* CHART */}
      <div style={box}>
        <h2>Payment Analytics</h2>
        <Bar data={chartData}/>
      </div>

      {/* BUTTONS */}
      <div style={{marginBottom:"20px"}}>
        <button onClick={exportExcel} style={btnGreen}>Export Excel</button>
        <button onClick={exportPDF} style={btnRed}>Export PDF</button>
      </div>

      {/* TABLE */}
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",background:"#fff"}}>
          <thead>
            <tr style={{background:"#111",color:"#fff"}}>
              <th style={th}>Name</th>
              <th style={th}>Phone</th>
              <th style={th}>Month</th>
              <th style={th}>Amount</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p,i)=>(
              <tr key={p.id} style={{background:i%2===0?"#fff":"#f9f9f9"}}>
                <td style={td}>{p.members?.full_name}</td>
                <td style={td}>{p.members?.phone}</td>
                <td style={td}>{p.month}</td>
                <td style={{...td,fontWeight:"bold",color:"#16a34a"}}>
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