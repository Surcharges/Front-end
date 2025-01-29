import { useMemo } from "react"

import { useGetPlaceQuery } from "./useGetPlaceQuery"
import { MakeAddress } from "@shared/model"

import { PlaceModel, PlaceUI } from "@entities/place"
import {
  SurchargesStatusDTO,
  SurchargesStatusModel,
  SurchargesStatusUI,
  SurchargesUI
} from "@entities/surcharges"

export const usePlaceViewModel = (placeId: string) => {
  const { data: useGetPlaceQueryData, isFetching } = useGetPlaceQuery(placeId)

  const placeModel = useMemo((): PlaceModel => {

    const surchargesStatus = (): SurchargesStatusModel => {
      switch (useGetPlaceQueryData?.status) {
        case SurchargesStatusDTO.CONFIRMED:
          return SurchargesStatusModel.Confirmed
        case SurchargesStatusDTO.REPORTED:
          return SurchargesStatusModel.Reported
        case SurchargesStatusDTO.UNKNOWN:
          return SurchargesStatusModel.Unknown
        default:
          return SurchargesStatusModel.Unknown
      }
    }

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
      },
      surcharges: {
        status: surchargesStatus(),
        rate: useGetPlaceQueryData?.rate ?? 0,
        reportedDate: useGetPlaceQueryData?.reportedDate?.seconds
      }
    }
  },
    [useGetPlaceQueryData, isFetching]
  )

  const placeUI = useMemo((): PlaceUI => {

    const surchargesStatus = (): SurchargesStatusUI => {
      switch (placeModel.surcharges.status) {
        case SurchargesStatusModel.Confirmed:
          return SurchargesStatusUI.Confirmed
        case SurchargesStatusModel.Reported:
          return SurchargesStatusUI.Reported
        case SurchargesStatusModel.Unknown:
          return SurchargesStatusUI.Unknown
        default:
          return SurchargesStatusUI.Unknown
      }
    }

    return {
      id: placeModel.id,
      name: placeModel.displayName.text,
      address: MakeAddress(placeModel.addressComponents),
      location: placeModel.location,
      surcharges: {
        status: surchargesStatus(),
        rate: placeModel.surcharges.rate,
        reportedDate: placeModel.surcharges.reportedDate
      }
    }
  },
    [placeModel]
  )

  const surchargesUI = useMemo((): SurchargesUI => {
    return placeUI.surcharges
  }, [placeUI, isFetching])

  return { placeModel, placeUI, surchargesUI, isFetching }
}