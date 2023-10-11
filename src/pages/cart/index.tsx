import React from 'react'
import { clearCart } from '../../redux/sollar/sollarSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getCartItems, getCartTotalCount, getCartTotalPrice } from '../../redux/sollar/selectors'
import { CartItem } from '../../components/cart-item/'
import styled from 'styled-components'

export default function Cart() {
  const cartItems = useAppSelector(getCartItems)
  const cartCount = useAppSelector(getCartTotalCount)
  const cartPrice = useAppSelector(getCartTotalPrice)
  const dispatch = useAppDispatch()

  const addedProducts = Object.keys(cartItems).map((key) => {
    return cartItems[key].items[0]
  })

  const onClearCart = () => {
    if (confirm('Are you sure you want to delete all selected items?')) {
      dispatch(clearCart())
    }
  }

  const onBuyNow = () => {
    console.log('Your order: ', cartItems)
  }

  return (
    <Section>
      {cartCount ? (
        <div>
          <CartBtn onClick={onClearCart}>Clear cart</CartBtn>

          <CartList>
            {addedProducts.map((product) => (
              <CartItem
                key={product.id}
                available={
                  cartItems[product.id]
                    ? product.quantity - cartItems[product.id].items.length
                    : product.available
                }
                id={product.id}
                name={product.name}
                totalPrice={cartItems[product.id].totalPrice}
                totalCount={cartItems[product.id].items.length}
              />
            ))}
          </CartList>
          <div>
            <CartDetails>
              <span>
                Total count: <b>{cartCount} </b>
              </span>
              <span>
                Total price: <b>{cartPrice} $</b>
              </span>
            </CartDetails>
            <CartButtons>
              <CartBtn onClick={onBuyNow}>Buy now</CartBtn>
            </CartButtons>
          </div>
        </div>
      ) : (
        <CartEmpty>
          <h2>Cart empty</h2>
          <p>
            You have not ordered anything yet.
            <br />
            To order the product, go to the main page.
          </p>
        </CartEmpty>
      )}
    </Section>
  )
}

const Section = styled.section`
  padding-top: 60px;
`
const CartEmpty = styled.div`
  width: 100%;
  text-align: center;
`
const CartDetails = styled.div`
  margin-bottom: 30px;
`
const CartButtons = styled.div`
  display: flex;
`
const CartList = styled.ul`
  margin: 20px 0;
`
const CartBtn = styled.button`
  width: 200px;
  color: #fff;
  background-color: #222;
  border-radius: 30px;
  padding: 10px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  &:hover {
    background-color: #646464;
  }
`
