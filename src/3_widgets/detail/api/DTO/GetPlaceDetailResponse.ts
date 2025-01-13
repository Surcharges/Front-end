import { PlaceDTO } from "@entities/place";
import { SurchargesStatusDTO } from "@entities/surcharges"
import { Timestamp } from "firebase/firestore"

export interface GetPlaceDetailResponse extends PlaceDTO {
  status: SurchargesStatusDTO
  rate?: number
  reportedDate?: Timestamp
}