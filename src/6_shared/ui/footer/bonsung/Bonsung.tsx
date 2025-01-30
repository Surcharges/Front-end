import { Link } from "react-router-dom";

export function Bonsung() {
  return (
    <div className='flex items-center justify-center mt-2'>
      <Link
          to='https://bonsung.me'
          className='mr-2 underline'
        >
          Bonsung Koo
        </Link>
      <Link to='https://www.linkedin.com/in/bonsung-koo/'>
        <img
          src='https://logo.clearbit.com/linkedin.com'
          alt='LinkedIn'
          className='size-5 mr-2'
        />
      </Link>
      <Link to='https://github.com/b0nsun9'>
        <img
          src='https://logo.clearbit.com/github.com'
          alt='GitHub'
          className='size-5 mr-2'
        />
      </Link>
    </div>
  )
}