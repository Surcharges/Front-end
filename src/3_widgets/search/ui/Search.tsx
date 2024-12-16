/* frameworks */
import { useNavigate } from 'react-router-dom'

/* components */
import { SearchBox, Footer } from '@shared/ui'

import { useSearchStore } from '@shared/model/SearchStore/SearchStore'

/* usecases */

export function Search() {

  const navigate = useNavigate()

  const { searchText, setSearchText } = useSearchStore()

  const handleOnChange = (text: string) => {
    setSearchText(text)
  }
  const handleOnSubmit = () => {
    if (searchText) {
      navigate('/results')
    }
  }

  return (
    <div>
      <div>
        <p>Surcharges</p>
        <SearchBox
          value={searchText}
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}