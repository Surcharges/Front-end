import { Link, useLocation, useNavigate } from 'react-router-dom'

import { SearchBox } from '@features/searchBox'
import { Footer, StatusHelp } from '@shared/ui'
import { WrongAccess } from '@shared/ui'
import { Confirmed, Reported } from '@shared/ui'

import { usePlaceListViewModel } from '../model/usePlaceListViewModel'
import PlacesList from './placelist/PlaceList'

export function Results() {

  const location = useLocation().state

  if (!location) {
    return (
      <WrongAccess />
    )
  }

  const { searchText } = location as { searchText: string }

  const navigate = useNavigate()

  // const handleLoadMore = () => {
  // refetch()
  // }

  const handleSelectedPlace = (id: string) => {
    navigate('/place', { state: { id: id } })
  }

  const viewModel = usePlaceListViewModel(searchText)

  return (
    <div>
      <div className='flex lg:flex-row flex-col items-center justify-center mt-10 w-full'>
        <Link to='/' className='lg:mr-10 font-bold text-black text-5xl cursor-pointer'>Surcharges</Link>
        <div className='lg:w-1/4 w-4/5 lg:mt-0 mt-10'>
          <SearchBox text={searchText} replace={true} />
        </div>
      </div>
      <div className='flex justify-center gap-2 mt-5'>
        <Confirmed />
        <Reported />
        <StatusHelp includingUnknown={false} />
      </div>
      <div>
        {
          (viewModel.isFetching && viewModel.places?.length === 0)
            ? <p>Loading</p>
            : <PlacesList
              places={viewModel.places ?? []}
              selectedPlace={handleSelectedPlace}
            />
        }
      </div>
      <div>
        {
          // data && data.nextPageToken
          //   ? <button
          //     onClick={() =>
          //       handleLoadMore()
          //     }
          //   >Load more
          //   </button>
          //   : null
        }
      </div>
      <Footer />
    </div>
  )
}
