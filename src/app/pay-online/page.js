"use client"

import { useState } from "react"

export default function PayOnline(){

const [amount,setAmount]=useState(40)

async function pay(){

const res = await fetch("/api/chapa",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
amount:amount,
email:"member@email.com",
name:"Mahaber Member"
})
})

const data = await res.json()

window.location = data.data.checkout_url

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Pay Mahaber Online
</h1>

<button
onClick={pay}
className="bg-green-600 text-white px-6 py-3 rounded"
>

Pay {amount} ETB

</button>

</div>

)

}