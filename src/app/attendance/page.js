"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function AttendancePage(){

const [members,setMembers]=useState([])

useEffect(()=>{

loadMembers()

},[])

async function loadMembers(){

const {data}=await supabase
.from("members")
.select("*")

setMembers(data)

}

async function markAttendance(memberId,status){

await supabase
.from("attendance")
.insert({

member_id:memberId,
meeting_date:new Date(),
status:status

})

alert("Saved")

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">

Meeting Attendance

</h1>

{members.map(member=>(

<div key={member.id} className="flex gap-4 mb-3">

<span className="w-40">

{member.name}

</span>

<button
className="bg-green-500 text-white px-4 py-1 rounded"
onClick={()=>markAttendance(member.id,"present")}
>

Present

</button>

<button
className="bg-red-500 text-white px-4 py-1 rounded"
onClick={()=>markAttendance(member.id,"absent")}
>

Absent

</button>

</div>

))}

</div>

)

}