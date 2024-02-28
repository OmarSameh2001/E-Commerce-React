import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Orders() {
  const token = localStorage.getItem("userToken");
  const { id } = jwtDecode(token);
  let [orders, setOrders] = useState(0);
  let [isLoading, setIsLoading] = useState(true);
  let [toaster] = useState({
    theme: "colored",
    autoClose: 10000,
    hideProgressBar: true,
    closeOnClick: true,
    onClick: () => nav("/allorders"),
  });
  let nav = useNavigate();

  async function getOrders() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      console.log(response);
      setOrders(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      <div className="mx-auto">
        {orders &&
          orders.map((order, index) => {
            return (
              <div className="order mx-5 my-3" key={order._id}>
                <h3 className="mb-0">
                  Order {index + 1}, Total Price: {order.totalOrderPrice}
                </h3>
                <p className="text-muted mt-0">Order ID: {order.id}</p>
                <div className="products row">
                  {order.cartItems.map((item) => (
                    <div
                      className="col-md-2 mx-2 "
                      key={item._id}
                      style={{
                        border: "3px solid rgb(44, 62, 80)",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <h5>Category: {item.product.category.name}</h5>

                      <h6>
                        Product: {item.product.brand.name} {item.product.title}
                      </h6>
                      <h6>Price: {item.price}</h6>
                      <img
                        className="img-fluid"
                        src={item.product.imageCover}
                        alt=""
                      />
                      <Link
                        className="text-dark"
                        to={`/productpage/${item.product.id}`}
                        onClick={() =>
                          toast.success("Click To Go Back To Orders", toaster)
                        }
                      >
                        <p className="text-center mb-0">View Product Page</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
