import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { CartContext} from '../../Context/cartContext'
import Loader from "../Loader/Loader";

export default function Products() {
  const BaseUrl = "https://ecommerce.routemisr.com";
  const tok = localStorage.getItem("userToken");
  let { addToCart, getCart } = useContext(CartContext)
  const nav = useNavigate();
  async function addProducts(prop) {
    try {
      await addToCart(prop)
      toast.success("Added To Cart, Click To View", {
        theme: "colored",
        position: "bottom-right",
        onClick: () => {
          nav("/cart");
          toast.dismiss();
        }
      })
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  async function getProducts() {
    return await axios.get(`${BaseUrl}/api/v1/products`, { Headers: { tok } });
  }

  let { isLoading, isError, Error, data } = useQuery("Products", getProducts, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 120000,
    cacheTime: 120000,
  });
  console.log(data);

   useEffect(() => {
     getCart();
   }, []);
  return (
    <div >
      
    <div
      className="row mx-auto align-items-center px-5 pb-5"
      style={{ paddingTop: "50px" }}
    >
      <h2 className="pb-2">FeaturedProducts</h2>
      {data?.data.data.map((product) => {
        return (
          <div key={product.id} className="col-md-2" >
            <Link
              className="text-decoration-none text-dark "
              to={`/productpage/${product.id}`}
            >
              <img className="img-fluid" src={product.imageCover} alt="" />
              <h5 className="">{product.title}</h5>
              <div className="d-flex justify-content-between">
                <p className="fw-bolder">{product.price} EGP</p>
                <p>
                  {" "}
                  <i
                    className="fas fa-star rating"
                    style={{ color: "gold" }}
                  ></i>
                  {product.ratingsAverage}
                </p>
              </div>
            </Link>
            <button onClick={() => addProducts(product?.id)} className="btn btn-success align-center">
              Add To Cart
            </button>
            
          </div>
        );
      })}
      {isError && <p>{Error}</p>}
      
    </div>
    {isLoading && <Loader />}
    </div>
    
  );
}
