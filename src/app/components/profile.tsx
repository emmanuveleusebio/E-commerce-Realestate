"use client";
import React, { useRef }  from "react";
import Header from "./header";


export default function Profile() {
      // Create a ref to the input field
  const inputRef = useRef<HTMLInputElement>(null);

    // Function to handle the image click
    const handleImageClick = () => {
        if (inputRef.current) {
          inputRef.current.click(); // Focus the input field
        }
      };
  return (
   
      <div className="flex items-center space-x-[40px] justify-center py-12">
        <div className=" flex flex-col items-center ">
            
           
            <input className="hidden" type="file" name="profileImg" ref={inputRef} />
            <div className="p-1 bg-white rounded-full">
          <img
            className="w-40 h-40 rounded-full cursor-pointer"
            src="https://www.shutterstock.com/image-photo/profile-picture-smiling-young-african-260nw-1873784920.jpg"
            alt=""          
            onClick={handleImageClick}
          />
          </div>
         
          <h1 className="text-2xl">Emmanuvel Eusebio</h1>

        </div>
      </div>
  );
}
