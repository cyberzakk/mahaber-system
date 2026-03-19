"use client"

import Link from "next/link"

export default function Header(){

  return(

    <header className="bg-purple-900 text-white p-4">

      <div className="flex justify-between items-center max-w-6xl mx-auto">

        <h1 className="text-xl font-bold">
          Estifanos Mahaber
        </h1>

        <nav className="flex gap-6">

          <Link href="/">Home</Link>

          <Link href="/members">Members</Link>

          <Link href="/payments">Payments</Link>

         

          <Link href="/history">History</Link>

          <Link href="/reports">Reports</Link>

        </nav>

      </div>

    </header>

  )

}