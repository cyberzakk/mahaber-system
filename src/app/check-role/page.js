"use client"

import { useEffect } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function CheckRole(){

const router = useRouter()

useEffect(()=>{

check()

},[])

async function check(){

const {data:userData} = await supabase.auth.getUser()

const email = userData.user.email

const {data} = await supabase
.from("members")
.select("*")
.eq("email",email)
.single()

if(data.role === "admin"){
router.push("/admin")
}else{
router.push("/member")
}

}

return(

<div className="p-10">

Checking account...

</div>

)

}