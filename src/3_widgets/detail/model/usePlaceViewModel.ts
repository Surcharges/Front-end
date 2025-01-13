import { useMemo } from "react"

import { useGetPlaceQuery } from "./useGetPlaceQuery"
import { MakeAddress } from "@shared/model"

import { PlaceModel, PlaceUI } from "@entities/place"
import {
  SurchargesStatusDTO,
  SurchargesStatusUI,
  SurchargesUI
} from "@entities/surcharges"

export const usePlaceViewModel = (placeId: string) => {
  const { data: useGetPlaceQueryData, isFetching } = useGetPlaceQuery(placeId)

  const placeModel = useMemo((): PlaceModel => {

    return {
      id: useGetPlaceQueryData?.id ?? '',
      displayName: {
        text: useGetPlaceQueryData?.displayName.text ?? '',
        languageCode: useGetPlaceQueryData?.displayName.languageCode ?? ''
      },
      addressComponents: useGetPlaceQueryData?.addressComponents.map((component) => {
        return {
          longText: component.longText,
          shortText: component.shortText,
          types: component.types,
          languageCode: component.languageCode
        }
      }) ?? [],
      location: {
        latitude: useGetPlaceQueryData?.location?.latitude ?? 0,
        longitude: useGetPlaceQueryData?.location?.longitude ?? 0
      }
    }
  },
    [useGetPlaceQueryData, isFetching]
  )

  const placeUI = useMemo((): PlaceUI => {
    return {
      id: placeModel.id,
      name: placeModel.displayName.text,
      address: MakeAddress(placeModel.addressComponents),
      location: placeModel.location
    }
  },
    [placeModel]
  )

  const surchargesUI = useMemo((): SurchargesUI => {

    const surchargesStatus = (): SurchargesStatusUI => {
      switch (useGetPlaceQueryData?.status) {
        case SurchargesStatusDTO.CONFIRMED:
          return SurchargesStatusUI.Confirmed
        case SurchargesStatusDTO.REPORTED:
          return SurchargesStatusUI.Reported
        case SurchargesStatusDTO.UNKNOWN:
          return SurchargesStatusUI.Unknown
        default:
          return SurchargesStatusUI.Unknown
      }
    }

    return {
      status: surchargesStatus(),
      rate: useGetPlaceQueryData?.rate,
      reportedDate: useGetPlaceQueryData?.reportedDate?.seconds
    }
  }, [useGetPlaceQueryData, isFetching])

  return { placeModel, placeUI, surchargesUI, isFetching }
}