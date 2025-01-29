import { Link } from "react-router-dom";

export function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-center h-screen">
      <p className="text-3xl">Surcharges Privacy Policy</p>
      <div className="text-xl mt-5">
        <p>The Surcharges service including, iOS App, does not collect any user data of any kind.</p>
        <p>If you wish to verify this for yourself, see the source code through below links</p>
      </div>
      <div className="flex flex-col items-center text-xl underline mt-5">
        <Link to="https://github.com/Surcharges/Front-end">https://github.com/Surcharges/Front-end</Link>
        <Link to="https://github.com/Surcharges/iOS">https://github.com/Surcharges/iOS</Link>
      </div>
    </div>
  )
}