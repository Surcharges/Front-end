import { PlaceDTO } from '@entities/place'
import { SurchargesStatusDTO } from '@entities/surcharges'
import { AddressComponentsDTO } from '@entities/place'
import { Timestamp } from 'firebase/firestore'

export async function GetPlaceDetail(id: string): Promise<GetPlaceDetailResponse> {

  const baseURL = import.meta.env.VITE_BASE_URL

  const requestURL = `${baseURL}/place?id=${id}`

  const response = await fetch(requestURL, {
    method: 'GET'
  })

  if (!response.ok) {
    throw new Error('Network response was not okay')
  }

  const data = await response.json()

  const reportedDate = ((): Timestamp | undefined => {
    if (data.reportedDate === undefined || data.reportedDate === null) {
      return undefined
    }

    return new Timestamp(data.reportedDate._seconds, data.reportedDate._nanoseconds)
  })

  const surchargeStatus = () => {
    switch (data.surchargeStatus) {
      case "UNKNOWN":
        return SurchargesStatusDTO.Unknown
      case "REPORTED":
        return SurchargesStatusDTO.Reported
      case "CONFIRMED":
        return SurchargesStatusDTO.Confirmed
      default:
        return SurchargesStatusDTO.Unknown
    }
  }

  return {
    id: data.id,
    displayName: {
      text: data.displayName.text,
      languageCode: data.displayName.languageCode
    },
    addressComponents: data.addressComponents.map((component: AddressComponentsDTO) => {
      return {
        longText: component.longText,
        shortText: component.shortText,
        types: component.types
      }
    }),
    location: {
      latitude: data.location.latitude,
      longitude: data.location.longitude
    },
    status: surchargeStatus(),
    rate: data.surchargeRate,
    reportedDate: reportedDate()
  }
}