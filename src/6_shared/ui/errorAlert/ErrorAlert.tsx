import Alert from '@mui/material/Alert'

interface ErrorAlertProps {
  isError: boolean
}

export function ErrorAlert(props: ErrorAlertProps) {

  if (!props.isError) {
    return null
  }
  return (
    <div
      className='fixed bottom-0 left-0 w-full z-50'
      style={{ transform: props.isError ? 'translateY(0)' : 'translateY(100%)' }}
    >
      <Alert severity='error'>
        Opps, something went wrong, Please try again later.
      </Alert>
    </div>
  )
}