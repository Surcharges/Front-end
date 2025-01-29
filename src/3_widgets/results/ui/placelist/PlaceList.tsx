import { PlaceUI } from "@entities/place"

import { PlaceItem } from "./PlaceItem"

interface PlacesListProps {
  places: PlaceUI[]
  selectedPlace: (id: string) => void
}

export default function PlacesList({ places, selectedPlace }: PlacesListProps) {

  const handleOnClick = (id: string) => {
    selectedPlace(id)
  }

  return (
    <div className='flex flex-col items-center justify-center mt-10 mb-10'>
      {
        places && places.map((place: PlaceUI) => (
          <PlaceItem
            place={place}
            key={place.id}
            onClick={(id) =>
              handleOnClick(id)
            }
          />
        ))
      }
    </div>
  )
}