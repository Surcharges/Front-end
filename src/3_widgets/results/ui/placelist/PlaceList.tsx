import { PlaceListUI } from "@entities/result"

import { PlaceItem } from "./PlaceItem"

interface PlacesListProps {
  places: PlaceListUI[]
  selectedPlace: (id: string) => void
}

export default function PlacesList({ places, selectedPlace }: PlacesListProps) {

  const handleOnClick = (id: string) => {
    selectedPlace(id)
  }

  return (
    <div className='flex flex-col items-center justify-center mt-10 mb-10'>
      {
        places && places.map((place: PlaceListUI) => (
          <PlaceItem
            item={place}
            key={place.place.id}
            onClick={(id) =>
              handleOnClick(id)
            }
          />
        ))
      }
    </div>
  )
}