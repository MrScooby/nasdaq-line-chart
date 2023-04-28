import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import HomeScreen from './pages/Home'
import DatasetProvider from './providers/DatasetProvider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/Error'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />,
    errorElement: <ErrorPage />,
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DatasetProvider>
        <RouterProvider router={router} />
      </DatasetProvider>
    </QueryClientProvider>
  )
}

export default App
