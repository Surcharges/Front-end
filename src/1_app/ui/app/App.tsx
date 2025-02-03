import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const Main = lazy(() => import("@widgets/main").then((module) => ({ default: module.Main })))
const Results = lazy(() => import("@widgets/results").then((module) => ({ default: module.Results })))
const Detail = lazy(() => import("@widgets/detail").then((module) => ({ default: module.Detail })))
const Report = lazy(() => import("@widgets/report").then((module) => ({ default: module.Report })))
const PrivacyPolicy = lazy(() => import("@widgets/privacyPolicy").then((module) => ({ default: module.PrivacyPolicy })))
const Support = lazy(() => import("@widgets/support").then((module) => ({ default: module.Support })))
const Login = lazy(() => import("@widgets/login").then((module) => ({ default: module.Login })))
const DashBoard = lazy(() => import("@widgets/dashboard").then((module) => ({ default: module.DashBoard })))
const Protected = lazy(() => import("@features/protected").then((module) => ({ default: module.Protected })))
const AuthContextProvider = lazy(() => import("@shared/model").then((module) => ({ default: module.AuthContextProvider })))

export function App() {
  return (
    <div>
      <main>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Suspense fallback={<div></div>}>
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
              </Suspense>
            </BrowserRouter>
          </QueryClientProvider>
        </AuthContextProvider>
      </main>
    </div>
  )
}