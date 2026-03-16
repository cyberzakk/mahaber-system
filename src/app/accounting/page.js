"use client"

import { useEffect,useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Accounting(){

const [payments,setPayments]=useState([])
const [members,setMembers]=useState([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:p}=await supabase
.from("payments")
.select("*")

const {data:m}=await supabase
.from("members")
.select("*")

setPayments(p)
setMembers(m)

}

const totalIncome = payments.reduce(
(sum,p)=>sum+p.amount,0
)

const expectedIncome = members.length*40*12

const unpaid = expectedIncome-totalIncome

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-8">
Financial Accounting
</h1>

<div className="grid grid-cols-3 gap-6">

<div className="bg-green-100 p-6 rounded">
<h2>Total Collected</h2>
<p className="text-2xl font-bold">
{totalIncome} ETB
</p>
</div>

<div className="bg-blue-100 p-6 rounded">
<h2>Expected Income</h2>
<p className="text-2xl font-bold">
{expectedIncome} ETB
</p>
</div>

<div className="bg-red-100 p-6 rounded">
<h2>Outstanding</h2>
<p className="text-2xl font-bold">
{unpaid} ETB
</p>
</div>

</div>

</div>

)

}