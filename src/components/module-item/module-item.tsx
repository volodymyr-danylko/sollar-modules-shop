import React, { FC } from 'react'
import { Module } from '../../redux/sollar/sollarSlice'
import { useAppDispatch } from '../../redux/hooks'
import { addToCart, minusCartItem, plusCartItem } from '../../redux/sollar/sollarSlice'
import styled from 'styled-components'

type Props = {
  item: Module
  addedToCart: boolean
  availableItems: number
  totalCount: number
}

export const ModuleItem: FC<Props> = ({ item, addedToCart, totalCount, availableItems }) => {
  const dispatch = useAppDispatch()

  const onPlus = () => {
    availableItems > 0 && dispatch(plusCartItem(item.id))
  }
  const onMinus = () => {
    dispatch(minusCartItem(item.id))
  }
  const onBuy = () => {
    dispatch(addToCart({ ...item }))
  }

  return (
    <StyledModuleItem key={item.id}>
      <h3>{item.name}</h3>

      <RowWrapper>
        <div>quantity</div>
        <div>{availableItems}</div>
      </RowWrapper>
      <RowWrapper>
        <p>${item.price}</p>

        {addedToCart ? (
          <BtnWrapper>
            <Button onClick={onMinus}>-</Button>
            <p>{totalCount}</p>

            <Button onClick={onPlus}>+</Button>
          </BtnWrapper>
        ) : (
          <RedButton onClick={onBuy}>Buy</RedButton>
        )}
      </RowWrapper>
    </StyledModuleItem>
  )
}

const Button = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledModuleItem = styled.li`
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 0.5rem;
  padding: 20px;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
`
const RedButton = styled.button`
  height: 49px;
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  padding-inline: 48px;
  background-color: red;
  border-radius: 30px;
  display: flex;
  align-items: center;
  &:hover,
  &:focus {
    background-color: #cb0e0e;
  }
  &:active {
    color: red;
  }
`
const RowWrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const BtnWrapper = styled.div`
  height: 48px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(156 163 175);
  border-radius: 30px;
`
