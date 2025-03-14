import { useState } from "react"
import { useMediaQuery } from "@mui/material"
import { Tooltip } from "@mui/material"
import { Confirmed } from "../Confirmed"
import { Reported } from "../Reported"
import { AutoGenerated } from "../AutoGenerated"
import { Unknown } from "../Unknown"
import HelpIcon from '@mui/icons-material/Help'

interface StatusHelpProps {
  includingUnknown: boolean
}

export function StatusHelp(props: StatusHelpProps) {

  const isMobile = useMediaQuery('(max-width: 600px)')

  const [openTooltip, setOpenTooltip] = useState(false)

  const handleClick = () => {
    if (isMobile) {
      setOpenTooltip((prev) => !prev)
    }
  }

  const handleClose = () => {
    if (isMobile) {
      setOpenTooltip(false)
    }
  }

  return (
    <Tooltip
      title={
        <div className='mt-2 mb-2'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <Confirmed />
              <p>The surcharge status is confirmed by us. It's highly likely to be accurate.\nBut still, it may be inaccurate. Please check the updated date in place detail.</p>
            </div>
            <div className='flex items-center gap-2'>
              <Reported />
              <p>The surcharge status is reported from someone who has passion to help others.\nHowever, it's not yet confirmed which means it may not be accurate.</p>
            </div>
            <div className='flex items-center gap-2'>
              <AutoGenerated />
              <p>Big franchises are unlikely to charge a surcharge, so we automatically set it to zero. However, this may not be accurate.</p>
            </div>
            {
              props.includingUnknown && (
                <div className='flex items-center gap-2'>
                  <Unknown />
                  <p>the surcharge status is not yet known. We welcome your report.</p>
                </div>
              )
            }
          </div>
        </div>
      }
      open={isMobile ? openTooltip : undefined}
      onClose={handleClose}
      arrow
      disableInteractive
      disableFocusListener={isMobile}
      disableHoverListener={isMobile}
      disableTouchListener//={!isMobile}
    >
      <div
        className='cursor-pointer'
        onClick={handleClick}
      >
        <HelpIcon fontSize='small' />
      </div>
    </Tooltip>
  )
}

