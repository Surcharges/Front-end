import { useQuery } from "react-query"
import { GetPlaces } from "../api/GetPlaces"

export const useGetPlacesQuery = (searchText: string, nextPageToken?: string) => {
  return useQuery({
    queryKey: ['places', searchText],
    retry: false,
    queryFn: () => GetPlaces(searchText, nextPageToken),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}