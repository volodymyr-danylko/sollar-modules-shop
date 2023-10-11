import React from 'react'
import './index.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { router } from './pages/router'

const container = document.getElementById('root')

if (!container) throw new Error("Could not find root element with id 'root'")

const root = createRoot(container)

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
