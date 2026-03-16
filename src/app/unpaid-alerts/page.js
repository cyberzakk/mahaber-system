"use client"

import { useEffect,useState } from "react"
import { supabase } from "../../lib/supabase"

export default function UnpaidAlerts(){

const [members,setMembers]=useState([])
const [payments,setPayments]=useState([])

useEffect(()=>{

loadData()

},[])

async function loadData(){

const {data:m}=await supabase
.from("members")
.select("*")

const {data:p}=await supabase
.from("payments")
.select("*")

setMembers(m)
setPayments(p)

}

function unpaidMonths(memberId){

const paid=payments.filter(p=>p.member_id===memberId)

return 12-paid.length

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">

Unpaid Member Alerts

</h1>

{members.map(member=>{

const months=unpaidMonths(member.id)

if(months===0) return null

return(

<div
key={member.id}
className="bg-red-100 border p-4 mb-3"
>

<strong>{member.name}</strong>

<br/>

Unpaid months: {months}

<br/>

Amount Due: {months*40} Birr

</div>

)

})}

</div>

)

}