import { createContext, useEffect, useState } from "react";
import { food_list } from '../../assets/assets';
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({})

    const[orderDetails,setOrderDetails]=useState(null)

    const addToCart = (id) => {
        !cartItem[id]
            ? setCartItem((prev) => ({ ...prev, [id]: 1 }))
            : setCartItem((prev) => ({ ...prev, [id]: prev[id] + 1 }))
    }
    const removeFromCart = (id) => {
        setCartItem((prev) => ({ ...prev, [id]: prev[id] - 1 }))
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItem[item]
            }
        }
        return totalAmount;
    }
    const contextValue = {
        food_list,
        addToCart,
        removeFromCart,
        cartItem,
        getTotalCartAmount,
        orderDetails,
        setOrderDetails,
        setCartItem
    }

   

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider