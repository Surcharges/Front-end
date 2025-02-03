import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Main } from '@widgets/main'
import { Results } from '@widgets/results'
import { Detail } from '@widgets/detail'
import { Report } from '@widgets/report'
import { Login } from '@widgets/login'
import { DashBoard } from '@widgets/dashboard'
import { Protected } from '@features/protected'
import { AuthContextProvider } from '@shared/model'
import { PrivacyPolicy } from '@widgets/privacyPolicy'
import { Support } from '@widgets/support'

const queryClient = new QueryClient()

export function App() {
  return (
    <div>
      <main>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/search" element={<Results />} />
                <Route path="/place" element={<Detail />} />
                <Route path="/report" element={<Report />} />
                <Route path="/login" element={<Login />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/support" element={<Support />} />
                <Route path='/admin' element={
                  <Protected>
                    <DashBoard />
                  </Protected>
                } />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </AuthContextProvider>
      </main>
    </div>
  )
}