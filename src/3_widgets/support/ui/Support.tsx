import { Footer } from "@shared/ui"
import { Link } from "react-router-dom"

export function Support() {
  return (
    <div className="flex flex-col items-center h-screen m-10">
      <p className="text-3xl font-bold">Surcharges</p>
      <p className="mt-10">We are here for hearing from you.</p>
      <div className="flex">
        <p className="mr-1">Any kind of suggestion or inquery, click</p>
        <Link to="mailto:surcharges@bonsung.me" className="underline">Here</Link>
        <p className="ml-1">to mail us!</p>
      </div>
      <Footer />
    </div>
  )
}