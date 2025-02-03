import { Link } from "react-router-dom";

export function Petr() {
  return (
    <div className='flex items-center justify-center mt-2'>
      <Link
        to='mailto:petr.utkin2022@gmail.com'
        className='mr-2'
      >
        Petr Utkin
      </Link>
      <Link to='https://www.linkedin.com/in/petr-utkin/'>
        <img
          src='https://logo.clearbit.com/linkedin.com'
          alt='LinkedIn'
          className='size-5 mr-2'
        />
      </Link>
      <Link to='https://github.com/PetruccioU'>
        <img
          src='https://logo.clearbit.com/github.com'
          alt='GitHub'
          className='size-5 mr-2'
        />
      </Link>
    </div>
  )
}