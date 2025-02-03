import { Footer } from "@shared/ui"
import { Link } from "react-router-dom"

export function Support() {
  return (
    <div className="flex flex-col items-center h-screen m-10">
      <p className="text-3xl font-bold">Surcharges</p>
      <div className="flex flex-col">
        <p className="mt-10 text-xl font-bold">We are here for hearing from you.</p>
        <div className="flex">
          <p className="mr-1 text-lg">For any suggestions or questions, click  <Link to="mailto:surcharges@bonsung.me" className="underline">here</Link> to mail us!</p>
          <p className="ml-1"></p>
        </div>
      </div>
      <Footer />
    </div>
  )
}