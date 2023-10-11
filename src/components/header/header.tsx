import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { getCartTotalCount, getCartTotalPrice } from '../../redux/sollar/selectors'
import styled from 'styled-components'

export const Header: FC = () => {
  const totalCount = useAppSelector(getCartTotalCount)
  const totalPrice = useAppSelector(getCartTotalPrice)

  return (
    <StyledHeader>
      <HeadWrapper>
        <NavbarLink to="/">
          <Logo>Home</Logo>
        </NavbarLink>
        <OrderWrapper>
          <Count>{totalCount}</Count>
          {!!totalPrice && <Price>${totalPrice}</Price>}
          <NavbarLink to="/cart">Order</NavbarLink>
        </OrderWrapper>
      </HeadWrapper>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  background-color: #222;
`

const NavbarLink = styled(Link)`
  height: 49px;
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
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

const Logo = styled.p`
  margin: 0;
`
const HeadWrapper = styled.div`
  height: 90px;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`
const OrderWrapper = styled.div`
  height: 53px;
  border: 2px solid rgb(186, 186, 186);
  border-radius: 32px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`
const Count = styled.div`
  height: 49px;
  width: 49px;
  color: black;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Price = styled.div`
  padding-inline: 20px;
  color: white;
`
