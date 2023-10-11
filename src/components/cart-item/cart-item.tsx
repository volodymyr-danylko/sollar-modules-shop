import React, { FC } from 'react'
import styled from 'styled-components'
import { Module, minusCartItem, plusCartItem, removeCartItem } from '../../redux/sollar/sollarSlice'
import { useAppDispatch } from '../../redux/hooks'

type Props = Pick<Module, 'id' | 'name'> & {
  totalPrice: number
  totalCount: number
  available: number
}

export const CartItem: FC<Props> = ({ id, name, totalPrice, totalCount, available }) => {
  const dispatch = useAppDispatch()

  const onPlusItem = () => {
    dispatch(plusCartItem(id))
  }

  const onMinusItem = () => {
    dispatch(minusCartItem(id))
  }

  const onRemoveCartItem = () => {
    dispatch(removeCartItem(id))
  }

  return (
    <StyledCartItem>
      <p>{name}</p>
      <Button onClick={onMinusItem}>-</Button>
      <b>{totalCount}</b>
      <Button onClick={onPlusItem} disabled={available ? false : true}>
        +
      </Button>
      <b>{totalPrice} $</b>
      <div>
        <Text>Available</Text> <Text>{available}</Text>
      </div>
      <DeleteButton onClick={onRemoveCartItem}>Delete</DeleteButton>
    </StyledCartItem>
  )
}

const Button = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 18px;
  background-color: #222;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  &:disabled {
    background: #cecece;
    pointer-events: none;
  }
  &:hover {
    background-color: #646464;
  }
`
const Text = styled.p`
  text-align: center;
`

const DeleteButton = styled.button`
  height: 48px;
  border-radius: 30px;
  padding-inline: 30px;
  font-size: 18px;
  background-color: #222;
  color: #fff;
  border: 1px solid #222;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #646464;
    border-color: #646464;
  }
`
const StyledCartItem = styled.tr`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
`
