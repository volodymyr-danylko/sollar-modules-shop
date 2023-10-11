import { createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { Module } from './sollarSlice'

const fetchModules = async (): Promise<Response> => {
  const response = await fetch('https://testtask.twnty.de/')
  return response.json()
}

const formatObjToArray = (obj: object) => {
  const keys = Object.keys(obj)
  const values = Object.values(obj)
  const merged = keys.reduce((result, key, index) => {
    return [...result, { id: uuidv4(), name: key.replace('pri', ''), ...values[index] }]
  }, [] as Module[])

  return merged
}

export const fetchSollarModules = createAsyncThunk('sollar/fetchModules', async (_, thunkAPI) => {
  try {
    const response = await fetchModules()

    return formatObjToArray(response)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
