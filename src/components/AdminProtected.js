"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function AdminProtected({ children }) {

const router = useRouter()
const [loading,setLoading]=useState(true)

useEffect(()=>{

check()

},[])

async function check(){

const {data:userData}=await supabase.auth.getUser()

if(!userData.user){
router.push("/login")
return
}

const email=userData.user.email

const {data}=await supabase
.from("members")
.select("*")
.eq("email",email)
.single()

if(data.role !== "admin"){
router.push("/member")
return
}

setLoading(false)

}

if(loading){

return <div className="p-10">Checking permissions...</div>

}

return children

}