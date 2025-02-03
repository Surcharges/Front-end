import { Link } from "react-router-dom"
import { Bonsung } from "./bonsung/Bonsung"
import { Petr } from "./petr/Petr"
import appstore from "@assets/images/appstore.svg"

export function Footer() {
  return (
    <div className="mt-10 mb-10">
      <footer className="flex flex-col items-center justify-center">
        <p>Made with ❤️ in Wellington</p>
        <Bonsung />
        <Petr />
        <div className="mt-10">
          <p>v{__APP_VERSION__}({__GIT_COMMIT_HASH__})</p>
        </div>
        <div className="mt-10">
          <Link to="https://apps.apple.com/app/surcharges/id6741091962"><img src={appstore} alt="Surcharges iOS App" /></Link>
        </div>
      </footer>
    </div>
  )
}