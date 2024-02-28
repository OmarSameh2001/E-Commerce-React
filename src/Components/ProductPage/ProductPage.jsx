import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../Context/cartContext";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import { WishListContext } from "../../Context/wishlistContext";

export default function ProductPage() {
  const { id } = useParams();
  let idsArray = [];
  let { addToCart } = useContext(CartContext);
  let [ data , setData ] = useState(null);
  let [ isLoading, setIsLoading ] = useState(true)
  const nav = useNavigate();
  async function addProducts(prop) {
    try {
      await addToCart(prop);
      toast.success("Added To Cart, Click To View", {
        theme: "colored",
        position: "bottom-right",
        onClick: () => {
          nav("/cart");
          toast.dismiss();
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function getProductPage() {
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setIsLoading(false)
    setData(response);
  }
  let { addToWishList, getWishList, removeWishList } = useContext(WishListContext);
  let [wishList, setWishList] = useState(null);
  let [isWish, setIsWish] = useState(null);
  let [colour, setColour] = useState(false);

  
  useEffect(() => {
    getProductPage();
  }, []);
  async function addWishlist(productId) {
    try {
      let response = await addToWishList(productId);
      setIsWish(response);
      setColour(true);
      toast.success("Added To WishList, Click To View", {
        theme: "colored",
        onClick: () => {
          nav("/wishlist");
          toast.dismiss();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function getFromWishlist() {
    try {
      let response = await getWishList();
      setWishList(response);
      console.log(wishList);
    } catch (error) {
      console.log(error);
    }
  }
async function removeFromWishList(Id){
  try {
    let response = await removeWishList(Id)
    setColour(false);
    console.log(response);
    toast.success("Removed From WishList", {
      theme: "dark"
    })
  } catch (error) {
    console.log(error);
  }
}
  function handleWishList(props) {
    if (idsArray.includes(props)) {
      removeFromWishList(props)
    }
    else{
      addWishlist(props);
    }
  }

  useEffect(() => {
    getFromWishlist();
  }, [colour]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  console.log(wishList);

  return (
    <>
      {wishList?.data.data.map((item) => {
        <div key={item.id}></div>
        idsArray.push(item.id);
        console.log(idsArray);
      })}

      {!isLoading && (
        <div className="row mx-auto align-items-center" style={{ minHeight: "90vh" }}>
          <h1>Product Page</h1>
          <div className="col-md-3">
            <Slider {...settings} className="mb-5">
              {data?.data.data.images?.map((img) => (
                <img key={img} src={img} className="img-fluid" />
              ))}
            </Slider>
          </div>
          <div className="col-md-6 ps-5">
            <h1>{data?.data.data.title}</h1>
            <p>{data?.data.data.description}</p>
            <div className="d-flex justify-content-between">
              <p>{data?.data.data.price} EGP</p>
              <p>
                {data?.data.data.ratingsAverage}
                <i className="fas fa-star rating" style={{ color: "gold" }}></i>
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <button
                onClick={() => addProducts(data?.data.data.id)}
                className="btn btn-success"
              >
                Add To Cart
              </button>
              <i
                className="fas fa-heart rating mt-2"
                onClick={() => handleWishList(data?.data.data.id)}
                style={{
                  color: idsArray.includes(data?.data.data.id) || colour ? "red" : "grey",
                  cursor: "pointer",
                }}
              >
                {" "}
                Wishlist
              </i>
              
            </div>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
}
