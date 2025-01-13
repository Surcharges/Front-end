import { AddressComponentsModel } from "./AddressComponentsModel"
import { LatLngModel } from "./LatLngModel"
import { LocalizedTextModel } from "./LocalizedTextModel"

export type PlaceModel = {
  id: string,
  displayName: LocalizedTextModel,
  addressComponents: AddressComponentsModel[],
  location: LatLngModel
}