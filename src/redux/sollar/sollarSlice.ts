/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchSollarModules } from './sollarApi'

export interface SollarState {
  items: Module[]
  cartItems: any
  totalPrice: number
  totalCount: number
  status: 'idle' | 'loading' | 'failed'
}

const initialState: SollarState = {
  items: [],
  cartItems: {},
  totalPrice: 0,
  totalCount: 0,
  status: 'idle',
}

export type Module = {
  id: string
  name: string
  price: number
  quantity: number
}

const getTotalPrice = (arr: Module[]) => arr.reduce((sum, obj) => sum + obj.price, 0)

export const sollarModulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Module>) => {
      const currenProductItems = !state.cartItems[action.payload.id]
        ? [action.payload]
        : [...state.cartItems[action.payload.id].items, action.payload]

      const newItems = {
        ...state.cartItems,
        [action.payload.id]: {
          items: currenProductItems,
          totalPrice: getTotalPrice(currenProductItems),
        },
      }

      const totalPrice = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].totalPrice + sum,
        0,
      )
      const totalCount = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].items.length + sum,
        0,
      )
      state.cartItems = newItems
      state.totalPrice = totalPrice
      state.totalCount = totalCount
    },
    clearCart: (state) => {
      state.cartItems = []
      state.totalPrice = 0
      state.totalCount = 0
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      const newItems = {
        ...state.cartItems,
      }
      const currentTotalPrice = newItems[action.payload].totalPrice
      const currentTotalCount = newItems[action.payload].items.length
      delete newItems[action.payload]

      state.cartItems = newItems
      state.totalPrice -= currentTotalPrice
      state.totalCount -= currentTotalCount
    },
    plusCartItem: (state, action: PayloadAction<string>) => {
      const newItems = [
        ...state.cartItems[action.payload].items,
        state.cartItems[action.payload].items[0],
      ]
      const currentItemPrice = state.cartItems[action.payload].items[0].price

      state.cartItems[action.payload].items = newItems
      state.cartItems[action.payload].totalPrice += currentItemPrice
      state.totalPrice += currentItemPrice
      state.totalCount += 1
    },
    minusCartItem: (state, action: PayloadAction<string>) => {
      const oldItemPrice = state.cartItems[action.payload].items[0].price

      if (state.cartItems[action.payload].items.length > 1) {
        state.cartItems[action.payload].items.pop()
        state.cartItems[action.payload].totalPrice -= oldItemPrice
      } else {
        delete state.cartItems[action.payload]
      }

      state.totalCount -= 1
      state.totalPrice -= oldItemPrice
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSollarModules.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSollarModules.fulfilled, (state, action) => {
        state.status = 'idle'
        state.items = action.payload
      })
      .addCase(fetchSollarModules.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { addToCart, plusCartItem, minusCartItem, clearCart, removeCartItem } =
  sollarModulesSlice.actions

export default sollarModulesSlice.reducer
