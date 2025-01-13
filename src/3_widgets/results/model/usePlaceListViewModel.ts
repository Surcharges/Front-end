import { useMemo } from "react"

import { SurchargesStatusDTO } from "@entities/surcharges"
import { SurchargesStatusUI } from "@entities/surcharges"
import { GetPlacesResponse } from "../api/DTO/GetPlacesResponse"

import { useGetPlacesQuery } from "./useGetPlacesQuery"

import { MakeAddress } from "@shared/model"
import { PlaceListUI } from "@entities/result"

export const usePlaceListViewModel = (searchText: string, nextPageToken?: string) => {
  const { data: useGetPlacesQueryData, isFetching } = useGetPlacesQuery(searchText, nextPageToken)

  const places = useMemo((): PlaceListUI[] => {

    return useGetPlacesQueryData?.places.map((place: GetPlacesResponse): PlaceListUI => {

      const status = () => {
        switch (place.status) {
          case SurchargesStatusDTO.CONFIRMED:
            return SurchargesStatusUI.Confirmed
          case SurchargesStatusDTO.REPORTED:
            return SurchargesStatusUI.Reported
          case SurchargesStatusDTO.UNKNOWN:
            return SurchargesStatusUI.Unknown
        }
      }

      return {
        place: {
          id: place.id,
          name: place.displayName.text,
          address: MakeAddress(place.addressComponents),
          location: {
            latitude: place.location?.latitude ?? 0,
            longitude: place.location?.longitude ?? 0
          }
        },
        surcharges: {
          status: status(),
          rate: place.rate,
          reportedDate: place.reportedDate?.seconds
        }
      }
    }) ?? []
    },
      [useGetPlacesQueryData]
    )

  return { places, isFetching }
}