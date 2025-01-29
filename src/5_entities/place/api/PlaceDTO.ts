import { LocalizedTextDTO } from "./LocalizedTextDTO"
import { AddressComponentsDTO } from "./AddressComponentsDTO"
import { LatLngDTO } from "./LatLngDTO"

import { Timestamp } from "firebase/firestore"
import { SurchargesStatusDTO } from "@entities/surcharges"

export type PlaceDTO = {
  id: string
  displayName: LocalizedTextDTO
  addressComponents: AddressComponentsDTO[]
  location?: LatLngDTO
  status: SurchargesStatusDTO
  rate?: number
  reportedDate?: Timestamp
}