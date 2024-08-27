"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Upload() {
  const router = useRouter();
  const [ data, setData ] = useState([])
 

 useEffect(() => {
   const fetchProducts = async() => {
    try {
      const result = await axios.get('/api/profile')
      setData(result.data.message)
      console.log(data)
    } catch (error) {
      console.log(error, 'error while getting uploaded products')
    }
   }
   fetchProducts()
  },[])

  const addPage = () => {
    router.push("/uploadPage");
  }; 
  return (
    <div className="container m-auto font-sans pt-10 flex justify-center flex-col">
      <div className="m-auto">
        <div className="flex items-center pb-7 gap-[15px]">
          <h1 className="text-3xl ">Uploads</h1>
          <div className="buttons bg-purple-500 px-2 py-1 rounded-full">
            <i
              className="text-white fa-solid fa-folder-plus"
              onClick={addPage}
            ></i>
          </div>
        </div>
        <div className=" cardLists p-5 grid grid-cols-3 gap-[60px] m-auto  border-t-[1px] border-t-black">
          {data.map((product, index) => (
             <div key={index} className="max-w-[250px] overflow-hidden products">
             <div className="h-[170px]">
               <img
                 className="h-full"
                 src={product.imageUrl}
                 alt=""
               />
             </div>
             <div className="p-4">
               <p className=" text-2xl">{product.title.length > 12 ? product.title.slice(0,12) : product.title}...</p>
               <p className="">{product.location.length > 20 ? product.location.slice(0,20) : product.location}...</p>
               <p className=" text-xl">{product.price}$</p>
             </div>
           </div>
          ))}
         


        </div>
      </div>
    </div>
  );
}
