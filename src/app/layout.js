import "./globals.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

export const metadata = {
  title: "Estifanos Mahaber",
  description: "Mahaber Management System",
}

export default function RootLayout({ children }) {

  return (

    <html lang="en">

      <body>

        <Header />

        <main className="min-h-screen p-6 bg-gray-100">

          {children}

        </main>

        <Footer />

      </body>

    </html>

  )

}