import { PlaceDTO } from '@entities/place/index'
import { AddressComponentsDTO } from '@entities/place/index'

export async function GetPlaceDetail(id: string): Promise<PlaceDTO> {

  const response = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': "id,displayName,addressComponents,location",
    }
  })

  if (!response.ok) {
    throw new Error('Network response was not okay')
  }
  
  const data = await response.json()

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
    }
  }
}