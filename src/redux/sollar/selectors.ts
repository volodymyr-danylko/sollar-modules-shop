import { RootState } from '../store'
import { Module } from './sollarSlice'

export const getModules = ({ modules }: RootState): Module[] => {
  return modules.items
}
export const getStatus = ({ modules }: RootState): 'idle' | 'loading' | 'failed' => {
  return modules.status
}
export const getCartItems = ({ modules }: RootState) => {
  return modules.cartItems
}
export const getCartTotalPrice = ({ modules }: RootState): number => {
  return modules.totalPrice
}
export const getCartTotalCount = ({ modules }: RootState): number => {
  return modules.totalCount
}
