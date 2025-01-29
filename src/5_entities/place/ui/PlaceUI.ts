import { PlaceLocationUI } from "./PlaceLocationUI"
import { SurchargesUI } from "@entities/surcharges"

export type PlaceUI = {
  id: string
  name: string
  address: string
  location: PlaceLocationUI
  surcharges: SurchargesUI
}