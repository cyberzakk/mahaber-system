"use client"

import { useState } from "react"
import Link from "next/link"

export default function Sidebar(){

const [open,setOpen]=useState(false)

return(

<>

<button
className="md:hidden p-3 bg-purple-600 text-white"
onClick={()=>setOpen(!open)}
>

Menu

</button>

<div className={`
bg-gray-900 text-white w-64 p-6 space-y-4
fixed md:static h-full
${open ? "block":"hidden"} md:block
`}>

<h2 className="text-xl font-bold mb-6">

Mahaber

</h2>

<Link href="/admin">Dashboard</Link>
<br/>

<Link href="/members">Members</Link>
<br/>

<Link href="/payments">Payments</Link>
<br/>

<Link href="/attendance">Attendance</Link>
<br/>

<Link href="/reports">Reports</Link>

</div>

</>

)

}