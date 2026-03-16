"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { motion } from "framer-motion"
import { Church } from "lucide-react"

export default function HomePage() {

const images = [
"/images/church-s.jpg",
"/images/s-stephen.jpg"
]

const [index,setIndex]=useState(0)
const [rotation,setRotation]=useState(null)
const [timeLeft,setTimeLeft]=useState("")

// IMAGE SLIDE
useEffect(()=>{

const interval=setInterval(()=>{
setIndex(prev => (prev+1)%images.length)
},5000)

return ()=>clearInterval(interval)

},[])


// PARALLAX EFFECT
useEffect(()=>{

const handleScroll=()=>{

const offset=window.scrollY
const bg=document.getElementById("parallax")

if(bg){
bg.style.transform=`translateY(${offset*0.3}px)`
}

}

window.addEventListener("scroll",handleScroll)

return ()=>window.removeEventListener("scroll",handleScroll)

},[])


// LOAD ROTATION FROM DATABASE
useEffect(()=>{

async function getRotation(){

const {data}=await supabase
.from("rotations")
.select("*")
.order("meeting_date",{ascending:true})
.limit(1)
.single()

setRotation(data)

}

getRotation()

},[])


// COUNTDOWN TIMER
useEffect(()=>{

if(!rotation) return

const timer=setInterval(()=>{

const now=new Date()
const meeting=new Date(rotation.meeting_date)

const diff=meeting-now

if(diff<=0){
setTimeLeft("Meeting Today")
return
}

const days=Math.floor(diff/(1000*60*60*24))
const hours=Math.floor((diff/(1000*60*60))%24)
const minutes=Math.floor((diff/(1000*60))%60)

setTimeLeft(`${days} days ${hours} hours ${minutes} minutes remaining`)

},1000)

return ()=>clearInterval(timer)

},[rotation])



return (

<div className="relative w-full h-screen overflow-hidden text-white">

{/* PARALLAX BACKGROUND */}

<div id="parallax" className="absolute inset-0">

{images.map((img,i)=>(

<div
key={i}
className={`absolute inset-0 transition-opacity duration-[2000ms] ${index===i?"opacity-100":"opacity-0"}`}
>

<img
src={img}
className="w-full h-full object-contain"
/>

</div>

))}

</div>


{/* DARK OVERLAY */}

<div className="absolute inset-0 bg-black/40"/>



{/* CONTENT */}

<div className="relative z-10 flex items-center justify-center h-full">

<motion.div
initial={{scale:0.9,opacity:0}}
animate={{scale:1,opacity:1}}
transition={{duration:1}}
className="backdrop-blur-md bg-black/40 p-12 rounded-2xl text-center hover:bg-gradient-to-r hover:from-purple-600/70 hover:to-yellow-500/70 transition-all"
>


{/* 3D CHURCH ICON */}

<motion.div
animate={{rotateY:360}}
transition={{repeat:Infinity,duration:6,ease:"linear"}}
className="flex justify-center mb-6"
>

<Church size={80} className="text-yellow-400"/>

</motion.div>


<h1 className="text-6xl font-bold mb-6">

Estifanos Mahaber

</h1>

<p className="text-2xl mb-4">

Next Mahaber Meeting

</p>

<h2 className="text-4xl text-yellow-400 font-bold mb-4">

{timeLeft}

</h2>

{rotation && (

<p className="text-2xl">

Host: {rotation.member_name}

</p>

)}

<p className="text-xl mt-3">

ዘካሪ

</p>

</motion.div>

</div>

</div>

)

}