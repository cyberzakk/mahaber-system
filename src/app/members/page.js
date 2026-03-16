"use client"

import { useEffect,useState } from "react"
import { supabase } from "../../lib/supabase"

export default function MemberPortal(){

const [payments,setPayments]=useState([])

useEffect(()=>{

loadPayments()

},[])

async function loadPayments(){

const {data:user} = await supabase.auth.getUser()

const {data} = await supabase
.from("payments")
.select("*")
.eq("member_id",user.user.id)

setPayments(data)

}

return(

<div className="p-8">

<h1 className="text-2xl font-bold mb-6">

My Payments

</h1>

<table className="w-full border">

<thead>

<tr className="bg-gray-200">

<th className="p-3">Month</th>
<th className="p-3">Amount</th>
<th className="p-3">Date</th>

</tr>

</thead>

<tbody>

{payments.map(p=>(

<tr key={p.id}>

<td className="p-3">{p.month}</td>
<td className="p-3">{p.amount}</td>
<td className="p-3">{p.paid_at}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}