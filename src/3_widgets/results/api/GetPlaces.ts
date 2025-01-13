import { GetPlacesResponse } from './DTO/GetPlacesResponse'
import { AddressComponentsDTO } from '@entities/place'
import { SurchargesStatusDTO } from '@entities/surcharges'

export async function GetPlaces(searchText: string, nextPageToken?: string): Promise<{ places: GetPlacesResponse[], nextPageToken?: string }> {

  const baseURL = import.meta.env.VITE_BASE_URL

  const requestURL = nextPageToken && nextPageToken != '' 
  ? `${baseURL}/places?searchText=${searchText}&nextPageToken=${nextPageToken}`
  : `${baseURL}/places?searchText=${searchText}`

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