import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext} from '../../Context/cartContext'
import { toast } from 'react-toastify'


export default function ProductPage() {
  const { id } = useParams();
  let { addToCart } = useContext(CartContext)
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
    }
  }
  async function getProductPage() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
  let { isLoading, isError, Error, data } = useQuery(
    "ProducrPage",
    getProductPage,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchInterval: 120000,
      cacheTime: 120000,
    }
  );
  //console.log(data);
  console.log(data?.data.data.id);
  return (
    <div className="row mx-auto align-items-center">
      <h1>Product Page</h1>
      <div className="col-md-3">
        <img src={data?.data.data.imageCover} className="img-fluid" />
      </div>
      <div className="col-md-4 ps-5">
        <h1>{data?.data.data.title}</h1>
        <p>{data?.data.data.description}</p>
        <div className="d-flex justify-content-between">
          <p>{data?.data.data.price} EGP</p>
          <p>
            {data?.data.data.ratingsAverage}
            <i className="fas fa-star rating" style={{ color: "gold" }}></i>
          </p>
        </div>
        <button onClick={() => addProducts(data?.data.data.id)} className="btn btn-success">Add To Cart</button>
      </div>
    </div>
  );
}
