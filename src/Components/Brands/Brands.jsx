import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";

export default function Brands() {
  //let [brand, setBrand] = useState(null);
  async function getBrands() {
    try {
      return await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands",
        {}
      );
    } catch (error) {
      console.log(error);
    }
  }
  let { data, isLoading } = useQuery("Brands", getBrands, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 120000,
    cacheTime: 120000,
  });
  let brand = data?.data.data;
  console.log(brand);
  // useEffect(() => {
  //   getBrands();
  // }, []);
  return (
    <>
      {isLoading && <Loader />}
      <div className="row mx-auto py-5">
        <h2 className="pb-2">Brands</h2>
        {brand &&
          brand.map((item, index) => (
            <div className="col-md-2 col-lg-4 col-xl-3" key={index}>
              <div className="card shadow-sm">
                <img src={item.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title text-center">{item.name}</h5>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
