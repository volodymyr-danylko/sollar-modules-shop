import React, { useEffect } from 'react'
import { Header } from '../components/header'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '../redux/hooks'
import { fetchSollarModules } from '../redux/sollar/sollarApi'
import styled from 'styled-components'

function App(): JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSollarModules())
  }, [dispatch])

  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}

export default App

const Container = styled.div`
  max-width: 1170px;
  padding-inline: 10px;
  margin: 0 auto;
`
