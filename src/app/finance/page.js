"use client"

import { useEffect,useState } from "react"
import { supabase } from "../../lib/supabase"
import { Bar } from "react-chartjs-2"
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement
} from "chart.js"

ChartJS.register(CategoryScale,LinearScale,BarElement)

export default function FinanceDashboard(){

const [payments,setPayments]=useState([])

useEffect(()=>{

load()

},[])

async function load(){

const {data}=await supabase
.from("payments")
.select("*")

setPayments(data)

}

const months={}

payments.forEach(p=>{

if(!months[p.month]){
months[p.month]=0
}

months[p.month]+=p.amount

})

const chartData={

labels:Object.keys(months),

datasets:[

{
label:"Mahaber Income",
data:Object.values(months)
}

]

}

const total = payments.reduce(
(sum,p)=>sum+p.amount,0
)

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">

Financial Dashboard

</h1>

<div className="mb-6 text-xl">

Total Income: {total} Birr

</div>

<Bar data={chartData}/>

</div>

)

}