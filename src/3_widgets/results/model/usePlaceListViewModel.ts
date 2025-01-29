import { useMemo } from "react"

import { PlaceDTO, PlaceUI } from "@entities/place"
import { SurchargesStatusDTO } from "@entities/surcharges"
import { SurchargesStatusUI } from "@entities/surcharges"

import { useGetPlacesQuery } from "./useGetPlacesQuery"

import { MakeAddress } from "@shared/model"

export const usePlaceListViewModel = (searchText: string, nextPageToken?: string) => {
  const { data: useGetPlacesQueryData, isFetching } = useGetPlacesQuery(searchText, nextPageToken)

  const places = useMemo((): PlaceUI[] => {

    return useGetPlacesQueryData?.places.map((place: PlaceDTO): PlaceUI => {

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
        id: place.id,
        name: place.displayName.text,
        address: MakeAddress(place.addressComponents),
        location: {
          latitude: place.location?.latitude ?? 0,
          longitude: place.location?.longitude ?? 0
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