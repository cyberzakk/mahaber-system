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

  const [index, setIndex] = useState(0)
  const [rotation, setRotation] = useState(null)
  const [timeLeft, setTimeLeft] = useState("Loading...")

  // IMAGE SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // PARALLAX EFFECT
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      const bg = document.getElementById("parallax")
      if (bg) {
        bg.style.transform = `translateY(${offset * 0.2}px)`
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // LOAD ROTATION (SAFE)
  useEffect(() => {
    async function getRotation() {

      const { data, error } = await supabase
        .from("rotations")
        .select("*")
        .order("meeting_date", { ascending: true })
        .limit(1)

      if (error) {
        console.log("Supabase error:", error)
        return
      }

      if (data && data.length > 0) {
        setRotation(data[0])
      }

    }

    getRotation()
  }, [])

  // TIMER
  useEffect(() => {

    if (!rotation) return

    const timer = setInterval(() => {

      const now = new Date()
      const meeting = new Date(rotation.meeting_date)
      const diff = meeting - now

      if (diff <= 0) {
        setTimeLeft("Meeting Today")
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)

      setTimeLeft(`${days}d ${hours}h ${minutes}m remaining`)

    }, 1000)

    return () => clearInterval(timer)

  }, [rotation])

  return (

    <div className="w-full text-white">

      {/* HERO SECTION */}
      <div className="relative w-full h-[90vh] overflow-hidden">

        {/* BACKGROUND */}
        <div id="parallax" className="absolute inset-0">

          {images.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ${
                index === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={img}
                alt="slide"
                className="w-full h-full object-cover"
              />
            </div>
          ))}

        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
        <div className="relative z-10 flex items-center justify-center h-full">

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="backdrop-blur-md bg-black/30 px-8 py-6 rounded-xl text-center max-w-md w-full shadow-xl hover:bg-gradient-to-r hover:from-purple-600/60 hover:to-yellow-500/60 transition-all"
          >

            {/* ICON */}
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="flex justify-center mb-4"
            >
              <Church size={50} className="text-yellow-400" />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Estifanos Mahaber
            </h1>

            <p className="text-lg mb-2">
              Next Mahaber Meeting
            </p>

            <h2 className="text-2xl text-yellow-400 font-bold mb-2">
              {timeLeft}
            </h2>

            {rotation && (
              <p className="text-lg">
                Host: {rotation.member_name}
              </p>
            )}

            <p className="text-md mt-2">
              ዘካሪ
            </p>

          </motion.div>

        </div>

      </div>

      {/* ========================= */}
      {/* 📜 HISTORY SECTION */}
      {/* ========================= */}

      <div className="bg-gray-100 text-gray-800 py-16 px-6 md:px-20">

        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          📜 የቅዱስ እስጢፋኖስ ታሪክ
        </h1>

        <div className="max-w-4xl mx-auto space-y-8 leading-relaxed text-lg">

          <p>
            ይህ የቀረበው ታሪክ መሠረታዊ ሃሳቡ ትክክል ቢሆንም፣ ለድረ-ገጽ በሚሆን መልኩ ይበልጥ ማራኪ እና በቋንቋ የተመጠነ ነው።
          </p>

          <h2 className="text-2xl font-semibold">
            ቅዱስ እስጢፋኖስ (ቀዳሜ ሰማዕት)
          </h2>

          <p>
            ቅዱስ እስጢፋኖስ በክርስትና ታሪክ ውስጥ ለእምነቱ ነፍሱን የሰጠ የመጀመሪያ ሰማዕት ነው።
          </p>

          <h2 className="text-xl font-semibold">
            እንዴት ተገደለ?
          </h2>

          <p>
            በድንጋይ ተወግሮ ነበር፤ በሐሰት ምስክሮች ተከስቶ ከከተማ ውጭ ተገደለ።
          </p>

          <h2 className="text-xl font-semibold">
            የት ተገደለ?
          </h2>

          <p>
            በኢየሩሳሌም ከተማ አካባቢ በሚገኘው የአንበሶች በር ነው።
          </p>

          <h2 className="text-xl font-semibold">
            ለምን ተገደለ?
          </h2>

          <ul className="list-disc pl-6">
            <li>እውነትን ስለተናገረ</li>
            <li>በክርስቶስ ላይ እምነቱን ስለጠነከረ</li>
            <li>በሐሰት ክስ ስለተያዘ</li>
          </ul>

          <h2 className="text-xl font-semibold">
            የመጨረሻ ቃላቱ
          </h2>

          <p>
            “ጌታ ኢየሱስ ሆይ፥ ነፍሴን ተቀበል።”  
            “ይህን ኃጢአት አትቁጠርባቸው።”
          </p>

        </div>

      </div>

    </div>
  )
}