import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";

export default function Categories() {
  //let [category, setCategory] = useState(null);
  async function getCategories() {
    try {
      return await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories",
        {}
      );
      
    } catch (error) {
      console.log(error);
    }
  }
  let { data, isLoading } = useQuery("Categories", getCategories, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 120000,
    cacheTime: 120000,
  });
  let category = data?.data.data
  console.log(category);
  // useEffect(() => {
  //   getCategories();
  // }, []);
  return (
    <>{isLoading && <Loader />}
    <div className="row mx-auto py-5" >
      <h2 className="pb-2">Categories</h2>
      {category &&
        category.map((item, index) => (
          <div className="col-md-2 col-lg-4 col-xl-3" key={index}>
            <div className="card shadow-sm">
              <img src={item.image} className="card-img-top" alt="..." style={{height:"400px", borderBottom:"1px solid black"}}/>
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
