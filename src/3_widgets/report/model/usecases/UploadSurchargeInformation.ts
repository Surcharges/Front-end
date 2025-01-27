import { postSurchargeInformation } from '../../api/postSurchargeInformation'
import { makeImageToBase64 } from './MakeImageToBase64'

export type UploadSurchargeInformationRequest = {
  placeId: string,
  image: File | undefined,
  totalAmount: number,
  surchargeAmount: number
}

export async function UploadSurchargeInformation(request: UploadSurchargeInformationRequest) {

  const encodedImage = await makeImageToBase64(request.image)

  await postSurchargeInformation({
    placeId: request.placeId,
    image: encodedImage,
    totalAmount: request.totalAmount,
    surchargeAmount: request.surchargeAmount
  })

}