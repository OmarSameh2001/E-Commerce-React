import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/cartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Cart() {
  const token = localStorage.getItem("userToken");
  const [cartData, setCartData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  let { removeFromCart, deleteCart, updateCount, cartNumber, getCart} = useContext(CartContext);
  async function getCartData() {
    try {
      const response = await getCart();
      setCartData(response.data);
      setisLoading(false);
      //console.log(response.data.data.products);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  }
  async function deleteFromCart(id) {
    try {
      const response = await removeFromCart(id);
      console.log(response.data);
      setCartData(response.data);
      if (response.data.numOfCartItems === 0) {
        toast.success("Your Cart Is Emptied Because You Removed The Last Item");
      } else {
        toast.success("Removed From Cart");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function delCart(prop) {
    try {
      await deleteCart(prop);
      setCartData(null);
      console.log(cartData);
      toast.success("Your Cart Is Emptied");
    } catch (error) {
      console.log(error);
    }
  }
  async function changeCart(count, id) {
    try {
      const response = await updateCount(count, id);
      console.log(response);
      setCartData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCartData();
  }, []);
  return (
    <div
      className="row mx-auto  align-items-center"
      style={{ minHeight: "90vh" }}
    >
      {isLoading ? (
        <>
          <h1>Cart</h1>
          Loading...
        </>
      ) : !cartData || cartNumber === 0 ? (
        <h1 className="App-header mx-auto">Your Cart Is Empty!!</h1>
      ) : (
        <>
          <h1>
            Cart
            <button className="btn btn-danger mx-3" onClick={() => delCart()}>
              Remove All
            </button>
          </h1>

          {cartData.data.products.map((product) => (
            <div
              className="col-md-2 mx-3 my-3"
              key={product._id}
              style={{
                border: "3px solid green",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <h5>{product.product.title}</h5>
              <img
                src={product.product.imageCover}
                className="img-fluid"
                alt={product.product.title}
                style={{ border: "1px solid black", borderRadius: "5px" }}
              />
              <div className="d-flex row align-items-center">
                <p className="fw-bolder col-md-7">{product.price} EGP</p>
                <div className="col-md-5 d-flex align-items-center">
                  <button className="btn btn-outline-success btn-sm m-0" onClick={() => changeCart(product.count - 1, product.product._id)}>-</button>
                  <p className="mx-2 mb-0 p-0">{product.count}</p>
                  <button className="btn btn-outline-success btn-sm m-0" onClick={() => changeCart(product.count + 1, product.product._id)}>+</button></div>
              </div>
              <button
                className="btn btn-danger w-100"
                onClick={() => deleteFromCart(product.product.id)}
              >
                Remove
              </button>
            </div>
          ))
          
          }{ cartData && <Link to="/checkout" className="btn btn-success">Checkout</Link>}
        </>
      )}
    </div>
  );
}
