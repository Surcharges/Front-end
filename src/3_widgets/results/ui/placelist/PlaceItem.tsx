import { PlaceUI } from "@entities/place"
import { SurchargesStatusUI } from "@entities/surcharges"

interface PlaceItemProps {
  place: PlaceUI
  onClick: (id: string) => void
}

export function PlaceItem({ place, onClick }: PlaceItemProps) {
  return (
    <div
      className='flex flex-col items-center justify-center rounded-md p-2 m-2 cursor-pointer hover:bg-gray-200'
      onClick={() => onClick(place.id)}
    >
      <div className='flex items-center font-bold gap-2'>
        <p>{place.name}</p>
        <SurchargesBadge
          status={place.surcharges.status}
          rate={place.surcharges.rate}
        />
      </div>
      <div className='text-center'>
        <p>{place.address}</p>
      </div>
    </div>
  )
}

function SurchargesBadge({ status, rate }: { status: SurchargesStatusUI, rate?: number }) {
  
  if (rate === undefined) {
    return null
  }

  const backgroundColor = () => {
    switch (status) {
      case SurchargesStatusUI.Confirmed:
        return 'bg-green-300'
      case SurchargesStatusUI.Reported:
        return 'bg-blue-300'
      case SurchargesStatusUI.Unknown:
        return 'bg-red-300'
    }
  }

  const textColor = () => {
    switch (status) {
      case SurchargesStatusUI.Confirmed:
        return 'text-green-800'
      case SurchargesStatusUI.Reported:
        return 'text-blue-800'
      case SurchargesStatusUI.Unknown:
        return 'text-red-800'
    }
  }

  const rateString = () => {

    if (rate === 0) {
      return 'Zero🎉'
    }

    return `${rate.toString()}%`
  }

  return (
    <div className={`rounded-lg ${backgroundColor()} ${textColor()}`}>
      <p className='pl-2 pr-2 pt-1 pb-1'>{rateString()}</p>
    </div>
  )
}