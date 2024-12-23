import { ChangeEvent } from "react";
import { LoadingButton } from "@mui/lab"
import { styled } from '@mui/material/styles';

interface UploadButtonProps {
  loading: boolean
  onChange: (files: FileList) => void
}

export function UploadButton(props: UploadButtonProps) {

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (event.target.files) {
      props.onChange(event.target.files)
    }
  }
  
  return (
    <LoadingButton
      component='label'
      variant='contained'
      loading={props.loading}
    >
      Upload
      <VisuallyHiddenInput
        type='file'
        accept='image/*'
        onChange={handleOnChange}
      >
      </VisuallyHiddenInput>
    </LoadingButton>
  )
}

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})