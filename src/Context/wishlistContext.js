import React, { useState } from "react";
import axios from "axios";


export const WishListContext = React.createContext();
export default function WishListContextProvider({ children }) {
  const token = localStorage.getItem("userToken");
  let [cartNumber, setCartNumber] = useState(0);
  async function addToWishList(productId) {
    console.log(token);
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId : productId },
        {
          headers: { token },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async function getWishList() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",{
          headers: { token },
        }
      );
      return response;
    }
    catch (error) {
      console.log(error);
    }
  }

  async function removeWishList(Id) {
      try {
        const response = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${Id}`,{
              headers: { token },
            });
        return response;
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <WishListContext.Provider value={{ addToWishList, getWishList, removeWishList }}>
      {children}
    </WishListContext.Provider>
  );
}
