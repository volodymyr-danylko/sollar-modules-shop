import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App'
import React from 'react'
import Home from './home'
import Cart from './cart'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Route>,
  ),
)
