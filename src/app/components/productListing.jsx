"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { viewDetails } from "../features/dataSlice";
import Skelton from "./skeltonLoading";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Image from "next/image";

export default function Listing() {
  const dispatch = useDispatch();
  const router = useRouter();
  // const { products, status, error } = useSelector((state) => state.products);
  const products = useSelector((state) => state.globalValues.filteredProducts);
  // const products = useSelector((state) => state.globalValues.filteredProduct) || [];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //      const data = await axios.get('api/Products')
  //      console.log(data.data.plots, 'kkkkkkkkkkkkkkkkkkklllllllllll')
  //      dispatch(allPlots(data.data.plots))
  //       await dispatch(getProducts()).unwrap();
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);

  const moreDetails = async (details) => {
    NProgress.start();
    try {
      dispatch(viewDetails(details));
      router.push(`/productDetails`);
    } catch (error) {
      console.log(error, "error while loading product details");
    } finally {
      NProgress.done();
    }
  };

  if (status === "loading") {
    NProgress.start();
    return (
      <div>
        <Skelton />
      </div>
    );
  }

  if (status === "failed") {
    NProgress.done();
    return <div>Error loading products. Please try again later.</div>;
  }
  NProgress.done();
  return (
    <div className="container m-auto font-sans pt-5 flex justify-center flex-col">
      <div>
        <h1 className="text-3xl p-5 pb-10">Explore</h1>
        <div className="cardLists p-5 grid grid-cols-4 gap-[60px] m-auto">
          {products.map((details, index) => (
            <div
              key={index}
              className="max-w-[250px] overflow-hidden products"
              onClick={() => moreDetails(details)}
            >
              <div className="h-[170px]">
                <Image
                  className="h-full w-full object-cover"
                  src={details.imageUrl}
                  alt={details.title}
                  width={250} // or any appropriate width based on your layout
                  height={170} // or any appropriate height based on your layout
                />
              </div>
              <div className="p-4">
                <p className=" text-2xl">
                  {details.title.length > 12
                    ? details.title.slice(0, 15) + "..."
                    : details.title}
                </p>
                <p className="">
                  {details.location.length > 15
                    ? details.location.slice(0, 15) + "..."
                    : details.location}
                </p>
                <p className=" text-xl">{details.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
