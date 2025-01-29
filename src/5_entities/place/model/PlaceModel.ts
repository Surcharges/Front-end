import { AddressComponentsModel } from "./AddressComponentsModel"
import { LatLngModel } from "./LatLngModel"
import { LocalizedTextModel } from "./LocalizedTextModel"
import { SurchargesModel } from "@entities/surcharges"

export type PlaceModel = {
  id: string,
  displayName: LocalizedTextModel,
  addressComponents: AddressComponentsModel[],
  location: LatLngModel
  surcharges: SurchargesModel
}