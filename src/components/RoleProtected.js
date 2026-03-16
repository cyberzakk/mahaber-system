"use client"

import { useEffect,useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function RoleProtected({children,allowed}){

const router = useRouter()
const [loading,setLoading]=useState(true)

useEffect(()=>{
checkRole()
},[])

async function checkRole(){

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

if(!allowed.includes(data.role)){
router.push("/")
return
}

setLoading(false)

}

if(loading){
return <div className="p-10">Checking access...</div>
}

return children

}