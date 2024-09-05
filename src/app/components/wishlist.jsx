"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Wishlist() {
  const router = useRouter();
  const productLists =
    useSelector((state) => state.globalValues.wishlistProducts) || null;

  const details = () => {
    router.push("/productDetails");
  };
  if (!productLists) {
    return (
      <div className="text-3xl flex justify-center">wishlist is empty</div>
    );
  }
  return (
    <div
      className="p-5 m-5 bg-white flex flex-col gap-[60px]"
      onClick={details}
    >
      <div>
        <h1 className="text-3xl font-bold">Wishlist</h1>
      </div>
      {productLists.map((element, index) => (
        <div
          className="hover:bg-gray-200 p-[20px] hover:shadow-xl flex gap-[60px]"
          key={index}
        >
          <div className="w-[250px] h-[250px]">
            <Image
              className="min-h-[250px] min-w-[250px] max-h-[250px] max-w-[250px]"
              src={element.imageUrl}
              alt=""
              width={250}
              height={250} 
            />
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold">{element.title}</h1>
            <p className="">
              {element.description.length > 500
                ? `${element.description.substring(0, 500)}...`
                : `${element.description}`}
            </p>
            <h1 className="text-2xl font-bold">{element.price}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
