import React from 'react'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import router from './Router'

export default function App() {
  return (
    <>
    <RouterProvider router={router}/>

    <Toaster toastOptions={{
    className: "",}}/>
      
    </>
  )
}
