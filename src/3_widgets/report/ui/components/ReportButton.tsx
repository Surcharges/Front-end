import { LoadingButton } from "@mui/lab"

interface ReportButtonProps {
  isCalculated: boolean
  loading: boolean
  disabled: boolean
  onClick: () => void
}

export function ReportButton(props: ReportButtonProps) {

  if (!props.isCalculated) {
    return null
  }

  return (
    <LoadingButton
      type='submit'
      variant='contained'
      loading={props.loading}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      📝Report
    </LoadingButton>
  )

}