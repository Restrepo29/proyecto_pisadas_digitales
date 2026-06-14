import { useState, useEffect, useMemo, createContext } from 'react'
import {  type cartItem, type ProductProps } from '../data/db'
import type { PropsWithChildren } from 'react'


export type CartContextType = {
    addToCart: (item:ProductProps) => void
    removeFromCart: (id: number) => void
    decreaseQuantity: (id: number) => void
    increaseQuantity: (id: number) => void
  clearCart: () => void
  cart: cartItem[]
 isEmpty: boolean
  cartTotal: number
}

export const UserContext = createContext({} as CartContextType)

export const UserContextProvider = ({children}: PropsWithChildren)   => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

 
    const [cart, setCart] = useState<cartItem[]>(initialCart())

    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    
   function addToCart(item:ProductProps) {
    const itemExists = cart.findIndex(cartItem => cartItem.id_prod === item.id_prod)
    if(itemExists >= 0 ) { // existe en el carrito
        if(cart[itemExists].quantity >= MAX_ITEMS) return  // ← Mover aquí
        const updatedCart = [...cart]
        updatedCart[itemExists].quantity++
        setCart(updatedCart)
    } else {
    
            setCart([...cart, { ...item, quantity: 1 }])
    }
}

    function removeFromCart(id: number) {
        setCart(prevCart => prevCart.filter(item => item.id_prod !== id))
    }

    function decreaseQuantity(id: number) {
        const updatedCart = cart.map( item => {
            if(item.id_prod === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function increaseQuantity(id:number ) {
        const updatedCart = cart.map( item => {
            if(item.id_prod === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

   
function clearCart() {
    setCart([])
}

   
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo( () => cart.reduce( (total, item) => total + (item.quantity * item.precio_prod), 0), [cart] )

    return (
 <UserContext value={{
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    cart,
    isEmpty,
    cartTotal
 }}>
    {children}
 </UserContext>
    )
}