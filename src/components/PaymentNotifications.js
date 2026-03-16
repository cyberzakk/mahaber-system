"use client"

import { useEffect } from "react"
import { supabase } from "../lib/supabase"

export default function PaymentNotifications(){

useEffect(()=>{

const channel = supabase
.channel("payments-channel")
.on(
"postgres_changes",
{
event: "INSERT",
schema: "public",
table: "payments"
},
(payload)=>{

alert(
"New Payment Received: " +
payload.new.amount +
" Birr"
)

}
)
.subscribe()

return ()=>supabase.removeChannel(channel)

},[])

return null

}