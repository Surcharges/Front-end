import { NavigationBar } from './components/NavigationBar'

export function DashBoard() {

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div>
        <NavigationBar />
      </div>
      <div>
        {/* Do it here what ever you want for confirming surcharge information.*/}
        <p>Do it here what ever you want for confirming surcharge information.</p>
      </div>
    </div>
  )
}