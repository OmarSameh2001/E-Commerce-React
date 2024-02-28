import React, { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../Context/wishlistContext";
import { toast } from "react-toastify";
import { CartContext } from "../../Context/cartContext";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";

export default function Wishlist() {
  let { getWishList, removeWishList } = useContext(WishListContext);
  let [wishList, setWishList] = useState(null);
  let [isRemove, setIsRemove] = useState(null);
  let { addToCart } = useContext(CartContext);
  let [isLoading, setIsLoading] = useState(true);
  let nav = useNavigate();

  async function getAllWishList() {
    try {
      let response = await getWishList();
      setWishList(response.data.data);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishList(Id) {
    try {
      let response = await removeWishList(Id);
      toast.success("Removed From WishList", {
        theme: "dark",
      });
      setIsRemove(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSend(id) {
    addToCart(id);
    removeFromWishList(id);
    toast.success("Added To Cart And")
    
  }
  let [toaster, setToaster] = useState({
    theme: "colored",
    autoClose: 10000,
    hideProgressBar: true,
    closeOnClick: true,
    onClick: () => nav("/wishlist"),
  });
  useEffect(() => {
    getAllWishList();
  }, [isRemove]);

  return (
    <>{isLoading &&  <Loader />}
      {wishList?.length ? <h1 className="mx-5 mt-3">WishList</h1> : null}
      <div className="row text-center mx-auto" style={{ minHeight: "100vh" }}>
      {wishList?.length ?
        wishList?.map((wish) => {
          return (
            <div
              className="col-md-2 mx-3 my-3 p-0"
              style={{ border: "2px solid black", height: "100%" }}
              key={wish.id}
            >
              <Link
                  className="text-decoration-none text-dark "
                  to={`/productpage/${wish.id}`}
                  onClick={() =>
                    toast.success("Click To Go Back To WishList", toaster)
                  }
                ><h4
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1, // Limit to 3 lines
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {wish.title}
              </h4>
              </Link>
              
              <Link
                  to={`/productpage/${wish.id}`}
                  onClick={() =>
                    toast.success("Click To Go Back To Cart", toaster)
                  }
                ><img className="img-fluid" src={wish.imageCover} alt="" />
                </Link>
              
              <i
                className="fas fa-heart rating mt-2"
                onClick={() => removeFromWishList(wish.id)}
                style={{
                  color: "red",
                  cursor: "pointer",
                }}
              >
                {" "}
                Remove from Wishlist
              </i>
              <button className="btn btn-success my-2" onClick={() => handleSend(wish.id)}>Send To Cart</button>
            </div>
          );
        }): <h1 className="App-header mb-0">WishList Is Empty</h1>}
    </div>
    
    </>
    
  );
}
