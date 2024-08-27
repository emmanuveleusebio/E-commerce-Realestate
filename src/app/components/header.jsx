"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { allPlots } from "../features/dataSlice";
import { filterProduct } from "../features/dataSlice";
import {
  chatCollections,
  wishlistdata,
  membershipPlans,
} from "../features/dataSlice";
import NProgress from "nprogress";
import "nprogress/nprogress.css";


export default function Header() {
  const router = useRouter();
  const products = useSelector((state) => state.globalValues.allProducts);
  const [searchTerm, setSearchTerm] = useState("");
   const dispatch = useDispatch();

   useEffect(() => {
    const fetchData = async () => {
      try {
       const data = await axios.get('api/Products')
       dispatch(allPlots(data.data.plots))
       dispatch(filterProduct(data.data.plots))
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);


  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  
    // If the search input is empty, dispatch all products (reset to original data)
    if (searchTerm === "") {
       dispatch(filterProduct(products)); // Fetch and dispatch the full product list from the API
    } else {
      // Otherwise, filter the products based on the search term
      const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.location.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
      dispatch(filterProduct(filteredProducts)); // Dispatch action to set filtered products
    }
  };
  




  const profile = async () => {
    NProgress.start();
    try {
      router.push("/profile");
    } 
    catch{
      console.log('error while navigating to profile')
    } finally {
      NProgress.done();
    }
  };
  const wishlist = async () => {
    NProgress.start();
    try {
      const list = await axios.get("api/wishlist");
      dispatch(wishlistdata(list.data.productsWithImages));
      router.push("/wishlist");
    } catch (error) {
      console.log(error);
    } finally {
      NProgress.done();
    }
  };

  const premium = async () => {
    NProgress.start();
    try {
      router.push("/subscriptions");
      const result = await axios.get("api/membership");
      dispatch(membershipPlans(result.data.cards));
    } catch (error) {
      console.log(error);
    } finally {
      NProgress.done();
    }
  };
  const home = async () => {
    NProgress.start();
    try {
      router.push("/homePage");
    } catch (error) {
      console.log("error while switching page", error);
    }
    NProgress.done();
  };
  const message = async () => {
    NProgress.start();
    try {
      const result = await axios.get("api/chat", {
        params: {
          method: "involvedChats",
        },
      });
      router.push("/messages");
      console.log(result.data.name, '')
      dispatch(chatCollections(result.data.name));
    } catch (error) {
      console.log("error while getting involved chats", error);
    } finally {
      NProgress.done();
    }
  };

  return (
    <div className="sticky z-10 w-full bg-[white]  top-0 border-b-2 py-3">
      <div className="flex p-3 justify-around w-full items-center  border-b-black">
        <div>
          <h1 className="text-3xl font-bold">EDMODE</h1>
        </div>
        <div className="search bg-gray-200 rounded-xl p-1 ps-3">
          {" "}
          <i className="text-gray-500 fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="ps-1 bg-gray-200 "
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <ul className="flex space-x-[60px] navbar font-bold">
          <li onClick={home}>Home</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
        <div>
          <button
            onClick={premium}
            className="buttons bg-blue-500 rounded-xl text-white p-2"
          >
            Premium
          </button>
        </div>
        <i
          onClick={wishlist}
          className="text-red-400 text-2xl fa-solid fa-heart"
        ></i>
        <i
          onClick={profile}
          className="text-green-500 text-2xl fa-solid fa-user"
        ></i>

      </div>
    </div>
  );
}
