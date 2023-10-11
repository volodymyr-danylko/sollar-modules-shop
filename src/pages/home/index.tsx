import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { getCartItems, getModules, getStatus } from '../../redux/sollar/selectors'
import { ModuleItem } from '../../components/module-item'
import styled from 'styled-components'

export default function Home() {
  const modules = useAppSelector(getModules)
  const cartItems = useAppSelector(getCartItems)
  const status = useAppSelector(getStatus)

  if (status === 'failed') {
    return (
      <div>
        <h1>Ooops... Thomething went wrong!</h1>
      </div>
    )
  }

  return (
    <Section>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <ModuleList>
          {modules?.map((item) => {
            const addedToCart = Object.hasOwn(cartItems, item.id)
            const totalCount = cartItems[item.id]?.items.length
            const availableItems = addedToCart ? item.quantity - totalCount : item.quantity

            return (
              <ModuleItem key={item.id} {...{ item, addedToCart, availableItems, totalCount }} />
            )
          })}
        </ModuleList>
      )}
    </Section>
  )
}

const Section = styled.section`
  padding-top: 60px;
`
const ModuleList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
`
