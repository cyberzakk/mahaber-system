"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function Login(){

const router = useRouter()

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

async function handleLogin(){

const {data,error} = await supabase.auth.signInWithPassword({
email,
password
})

if(error){
alert(error.message)
return
}

router.push("/dashboard")

}

return(

<div className="flex items-center justify-center h-screen bg-gray-100">

<div className="bg-white p-10 rounded shadow w-80">

<h1 className="text-2xl font-bold mb-6 text-center">

Mahaber Login

</h1>

<input
className="border w-full p-2 mb-4"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="border w-full p-2 mb-4"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={handleLogin}
className="bg-purple-600 text-white w-full py-2 rounded"
>

Login

</button>

</div>

</div>

)

}