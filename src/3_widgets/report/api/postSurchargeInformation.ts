import { PostSurchargeInformationRequest } from './DTO/PostSurchargeInformationRequest'

export async function postSurchargeInformation(request: PostSurchargeInformationRequest) {

  const baseURL = `${import.meta.env.VITE_BASE_URL}/api/surcharge`

  const response = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      placeId: request.placeId,
      image: request.image,
      totalAmount: request.totalAmount,
      surchargeAmount: request.surchargeAmount
    })
  })

  if (!response.ok) {
    throw new Error('Network response was not okay')
  }
}