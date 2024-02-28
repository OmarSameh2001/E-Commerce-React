import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import Products from "../Products/Products";

export default function Home() {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  var settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  function getCat() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let {data} = useQuery('cateogry',getCat)
  console.log(data?.data?.data);
  return (
    <>
      <div className="mx-auto row my-5 justify-content-center">
        <div className="col-md-7 ">
          <h3>MainSlider</h3>
          <Slider {...settings}>
            <img
              src={require("../../Assets/slider-image-1.jpeg")}
              className="img-fluid"
              style={{ height: "40%", width: "40%" }}
            ></img>
            <img
              src={require("../../Assets/slider-image-2.jpeg")}
              className="img-fluid"
              style={{ height: "40%", width: "40%" }}
            ></img>
            <img
              src={require("../../Assets/slider-image-3.jpeg")}
              className="img-fluid"
              style={{ height: "40%", width: "40%" }}
            ></img>
          </Slider>
        </div>
        <div className="col-md-3 mt-5" >
          <img
            src={require("../../Assets/grocery-banner.png")}
            className="img-fluid mx-3"
            style={{ height: "49%", width: "90%" }}
          ></img>
          <img
            src={require("../../Assets/grocery-banner-2.jpeg")}
            className="img-fluid mx-3"
            style={{ height: "49%", width: "90%" }}
          ></img>
        </div>
      </div>
      <h3 className="mx-5 row mb-4">CategoriesSlider</h3>
      <div className="mx-5 row mb-5 text-center">
        <Slider {...settings2}>
          {data?.data?.data.map((slide) => (
            <><img
              key={slide._id}
              className="w-100"
              height={150}
              src={slide.image}
            ></img>
            <p>{slide.name}</p></>
            
          ))}
        </Slider>
      </div>
      
      <Products />
    </>
  );
}
