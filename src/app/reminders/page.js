"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Reminders(){

const [members,setMembers]=useState([])

useEffect(()=>{

loadMembers()

},[])

async function loadMembers(){

const {data} = await supabase
.from("members")
.select("*")

setMembers(data)

}

async function sendReminder(phone){

await fetch("/api/sendReminder",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

phone:phone,
message:"Mahaber monthly payment reminder. Please pay your dues."

})

})

alert("SMS Sent")

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">

Send Payment Reminder

</h1>

{members.map(member=>(

<div key={member.id} className="flex gap-6 mb-3">

<span className="w-40">

{member.name}

</span>

<button
onClick={()=>sendReminder(member.phone)}
className="bg-purple-600 text-white px-4 py-1 rounded"
>

Send Reminder

</button>

</div>

))}

</div>

)

}