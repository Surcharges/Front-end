import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Main } from '@widgets/main'
import { Results } from '@widgets/results'
import { Detail } from '@widgets/detail'
import { Report } from '@widgets/report'
import { PrivacyPolicy } from '@widgets/privacyPolicy'

const queryClient = new QueryClient()

export function App() {
  return (
    <div>
      <main>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/search" element={<Results />} />
              <Route path="/place" element={<Detail />} />
              <Route path="/report" element={<Report />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </main>
    </div>
  )
}