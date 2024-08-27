"use client";
import React from "react";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { filterProduct } from "../features/dataSlice";

export default function HeaderCatagories() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.globalValues.allProducts);

  const showCategories = (category) => {
    const filteredProducts = products.filter((product) =>
      product.category === category
    );
    dispatch(filterProduct(filteredProducts));
  };

  const allCategories = () => {
    dispatch(filterProduct(products));
  };

  return (
    <div className="sticky top-0  z-10 ">
      <Header />
      <div className="  w-full catorery-header">
        <div className=" flex w-full z-10">
          <div className="bg-red-500 flex-1 text-white all-catogries">
            <p
              onClick={() => allCategories()}
              className="allCatogries all-catogries"
            >
              All catagories
            </p>
          </div>
          <div
            onClick={() => showCategories("house")}
            className=" flex-1 text-white catogries"
          >
            House
          </div>
          <div
            onClick={() => showCategories("hotel")}
            className="flex-1 text-white catogries"
          >
            Hotel
          </div>
          <div
            onClick={() => showCategories("camp house")}
            className="flex-1 text-white catogries"
          >
            Camp House
          </div>
          <div
            onClick={() => showCategories("villa")}
            className="flex-1 text-white catogries"
          >
            Villa
          </div>
          <div className="flex-1 text-white catogries">Appartment</div>
        </div>
      </div>
    </div>
  );
}
