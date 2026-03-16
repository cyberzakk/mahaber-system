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
name,
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

function buildData(){

return payments.map(p=>({

Name:p.members?.name,
Phone:p.members?.phone,
Month:p.month,
Amount:p.amount

}))

}

function exportExcel(){

const data = buildData()

const worksheet = XLSX.utils.json_to_sheet(data)

const workbook = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(workbook,worksheet,"Mahaber Report")

XLSX.writeFile(workbook,"Mahaber_Report.xlsx")

}

function exportPDF(){

const doc = new jsPDF()

const rows = buildData().map(d=>[
d.Name,
d.Phone,
d.Month,
d.Amount
])

autoTable(doc,{
head:[["Name","Phone","Month","Amount"]],
body:rows
})

doc.save("Mahaber_Report.pdf")

}

const months = {}

payments.forEach(p=>{

if(!months[p.month]){
months[p.month] = 0
}

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

return(

<div style={{
padding:"40px",
fontFamily:"Arial",
background:"#f5f6fa",
minHeight:"100vh"
}}>

<h1 style={{marginBottom:"30px"}}>

Mahaber Payment Reports

</h1>

<div style={{
background:"#fff",
padding:"20px",
marginBottom:"30px",
borderRadius:"10px"
}}>

<h2 style={{marginBottom:"15px"}}>

Payment Analytics

</h2>

<Bar data={chartData}/>

</div>

<div style={{marginBottom:"20px"}}>

<button
onClick={exportExcel}
style={{
padding:"10px 15px",
marginRight:"10px",
background:"#28a745",
color:"#fff",
border:"none",
borderRadius:"5px",
cursor:"pointer"
}}
>
Export Excel
</button>

<button
onClick={exportPDF}
style={{
padding:"10px 15px",
background:"#dc3545",
color:"#fff",
border:"none",
borderRadius:"5px",
cursor:"pointer"
}}
>
Export PDF
</button>

</div>

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
<th style={{padding:"10px"}}>Month</th>
<th style={{padding:"10px"}}>Amount</th>

</tr>

</thead>

<tbody>

{payments.map(p=>(

<tr key={p.id}>

<td style={{border:"1px solid #ddd",padding:"8px"}}>
{p.members?.name}
</td>

<td style={{border:"1px solid #ddd",padding:"8px"}}>
{p.members?.phone}
</td>

<td style={{border:"1px solid #ddd",padding:"8px"}}>
{p.month}
</td>

<td style={{border:"1px solid #ddd",padding:"8px"}}>
{p.amount} ETB
</td>

</tr>

))}

</tbody>

</table>

</div>

)

}