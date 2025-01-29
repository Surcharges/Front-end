import { create } from 'zustand'
import { PlaceModel } from '@entities/place'

type PlaceStore = {
  placeModel: PlaceModel
}

export const usePlaceStore = (placeModel: PlaceModel) => {
  return create<PlaceStore>(() => ({
    placeModel: placeModel
  }))
}