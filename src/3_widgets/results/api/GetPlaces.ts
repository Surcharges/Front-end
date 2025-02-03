import { GetPlacesResponse } from './DTO/GetPlacesResponse'
import { AddressComponentsDTO } from '@entities/place'
import { SurchargesStatusDTO } from '@entities/surcharges'
import { PlaceDTO } from '@entities/place'

export async function GetPlaces(searchText: string, nextPageToken?: string): Promise<{ places: GetPlacesResponse[], nextPageToken?: string }> {

  const baseURL = import.meta.env.VITE_BASE_URL

  const requestURL = nextPageToken && nextPageToken != ''
    ? `${baseURL}/api/places?searchText=${searchText}&nextPageToken=${nextPageToken}`
    : `${baseURL}/api/places?searchText=${searchText}`

  const response = await fetch(requestURL, {
    method: 'GET'
  })

  if (!response.ok) {
    throw new Error('Network response was not okay')
  }

  const data = await response.json()

  return {
    places: data.places.map((place: any): PlaceDTO => {

      const surchargeStatus = () => {
        switch (place.surchargeStatus) {
          case "REPORTED":
            return SurchargesStatusDTO.REPORTED
          case "CONFIRMED":
            return SurchargesStatusDTO.CONFIRMED
          case "AUTO_GENERATED":
            return SurchargesStatusDTO.AUTO_GENERATED
          case "REJECTED":
            return SurchargesStatusDTO.REJECTED
          default:
            return SurchargesStatusDTO.UNKNOWN
        }
      }

      return {
        id: place.id,
        displayName: {
          text: place.displayName.text,
          languageCode: place.displayName.languageCode
        },
        addressComponents: place.addressComponents.map((component: AddressComponentsDTO) => {
          return {
            longText: component.longText,
            shortText: component.shortText,
            types: component.types
          }
        }),
        status: surchargeStatus(),
        rate: place.surchargeRate,
        reportedDate: place.reportedDate
      }
    }),
    nextPageToken: data.nextPageToken
  }
}