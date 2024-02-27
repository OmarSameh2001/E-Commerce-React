import axios from "axios";
import React from "react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const BaseUrl = "https://ecommerce.routemisr.com/api/v1/cart";
  const token = localStorage.getItem("userToken");
  let [cartNumber, setCartNumber] = useState(0)
  let [cartId, setCartId] = useState(null)

  async function getCart() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token } }
      );
      //console.log(response.data.data._id);
      setCartNumber(response.data.numOfCartItems);
      setCartId(response.data.data._id);
      return response;
    } catch (error) {
      console.log(error);
      if(error.response.data.message === "Request failed with status code 404"){
        setCartNumber(0)
        console.log("no cart" + cartNumber);
      }
    }
  }
  async function addToCart(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        {
          headers: {
            token,
          },
        }
      );
  
      console.log(response.data); 
      setCartNumber(response.data.numOfCartItems);
    } catch (error) {
      console.log(error);
      
    }
  }
  
  async function removeFromCart(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            token,
          },
        }
      );

      setCartNumber(response.data.numOfCartItems);
      return response;

    }
    catch (error) {
      console.log(error);
    }
  }
  async function deleteCart() {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/`,
        {
          headers: {
            token,
          },
        }
      );

      console.log(response.data); 
      setCartNumber(0);

    }
    catch (error) {
      console.log(error);
    }
  }
  async function updateCount(count, productId) {
      try {
        const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {count}, {
        headers: {
          token,
        },
      });
      setCartNumber(response.data.numOfCartItems);
      return response;
      
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <CartContext.Provider value={{ getCart,addToCart, cartNumber, removeFromCart, deleteCart, updateCount, cartId }}>
      {children}
    </CartContext.Provider>
  );
}
