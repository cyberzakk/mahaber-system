"use client"

import { useEffect,useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Dashboard(){

const [user,setUser]=useState(null)

useEffect(()=>{

loadUser()

},[])

async function loadUser(){

const {data} = await supabase.auth.getUser()

setUser(data.user)

}

return(

<div className="p-6">

<h1 className="text-3xl font-bold mb-6">

Mahaber Dashboard

</h1>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="bg-purple-600 text-white p-6 rounded">

<h2 className="text-xl">

Members

</h2>

<p className="text-3xl">

42

</p>

</div>

<div className="bg-green-600 text-white p-6 rounded">

<h2 className="text-xl">

Payments

</h2>

<p className="text-3xl">

12000 Birr

</p>

</div>

<div className="bg-yellow-500 text-white p-6 rounded">

<h2 className="text-xl">

Next Meeting

</h2>

<p>

July 20

</p>

</div>

</div>

</div>

)

}