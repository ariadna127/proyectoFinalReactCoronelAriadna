import React, { useState, useContext } from 'react'

const CartContext = React.createContext('');
export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addProduct = (item, quantity) => {
        if (isInCart(item.id)) {
            setCart(
                cart.map((product) => {
                    return product.id == item.id
                        ? { ...product, quantity: product.quantity + quantity }
                        : product;
                })
            );
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    }

    const updateQuantity = (itemId, newQuantity) =>{
        setCart(
            cart.map((product)=>{
                return product.id == itemId ? {...product, quantity: newQuantity} : product;
            })
        )
    }

    const totalPrice = () => {
        return cart.reduce((prev, act) => prev + act.quantity * act.price, 0);

    }

    const totalProducts = () => {
        return cart.reduce(
            (acumulador, productoActual) => acumulador + productoActual.quantity, 0
        );
    }

    const clearCart = () => setCart([]);

    const isInCart = (id) => {
        return cart.find((product) => product.id === id) ? true : false;
    }

    const removeProduct = (id) => {
        setCart(cart.filter((product) => product.id !== id));
    }

    return (
        <CartContext.Provider
            value={{
                updateQuantity,
                addProduct,
                totalPrice,
                totalProducts,
                isInCart,
                removeProduct,
                clearCart,
                cart
            }}
        >

            {children}
        </CartContext.Provider>
    );
};

export default CartProvider