"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddPage() {
  const [display, setDisplay] = useState(true);

  const router = useRouter();
  const inputRef = useRef(null);
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null); // To store the image preview URL

  const addImg = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    if (file) {
      setDisplay(false);
      setImgPreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const [about, setAbout] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAbout((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postProduct = async () => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("title", about.title);
    formData.append("description", about.description);
    formData.append("location", about.location);
    formData.append("price", about.price);
    formData.append("category", about.category);

    try {
      console.log(about, "ksjdlfjdsljf");
      const posting = await axios.post("api/Products", formData);
      console.log("hellow world...");
      router.push("/profile");
    } catch (error) {
      console.log(error, "error while posting data");
    }
  };

  return (
    <div className="addForm bg-blue-100 container m-auto p-[30px] rounded-2xl my-[60px]">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold p-3">Add Product</h1>
      </div>

      <div>
        <div
          className="addImg relative h-[250px] overflow-hidden bg-white"
          onClick={addImg}
        >
          {imgPreview && (
            <Image
              className="w-full h-full"
              id="img-preview"
              src={imgPreview}
              alt="Preview"
              layout="fill"
              objectFit="cover"
            />
          )}
          <input
            className={`hidden`}
            type="file"
            ref={inputRef}
            onChange={handleImgChange}
          />
          <div
            className={`${
              display ? "block" : "hidden"
            } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
          >
            <i className="ps-5 text-blue-200 text-[50px] fa-solid fa-cloud-arrow-up"></i>
            <h1 className="text-blue-300 bold">Upload Image</h1>
          </div>
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className="flex gap-[20px] p-5">
            <label htmlFor="title" className="w-full font-bold">
              Title
              <input
                onChange={handleChange}
                type="text"
                className="w-full p-2 rounded-xl mt-3"
                name="title"
              />
            </label>

            <label htmlFor="price" className="w-full font-bold">
              Price
              <input
                onChange={handleChange}
                type="text"
                className="w-full p-2 rounded-xl mt-3"
                name="price"
              />
            </label>
          </div>
          <div className="flex gap-[20px]  pb-5 px-5">
            <label htmlFor="location" className="w-full font-bold">
              Location
              <input
                onChange={handleChange}
                type="text"
                className="w-full p-2 rounded-xl  mt-3"
                name="location"
              />
            </label>

            <label htmlFor="category" className="w-full font-bold">
              Category
              <select
                onChange={handleChange}
                type="text"
                className="w-full p-2 rounded-xl  mt-3"
                name="category"
                value={about.category}
              >
                <option value="">Select a category</option>
                <option value="house">House</option>
                <option value="hotel">Hotel</option>
                <option value="camp house">Camp House</option>
                <option value="villa">Villa</option>
              </select>
            </label>
          </div>
          <div className="flex gap-[20px]  pb-5 px-5">
            <label htmlFor="Description" className="w-full font-bold">
              Description
              <textarea
                onChange={handleChange}
                className="w-full p-2 rounded-xl h-[150px] mt-3"
                name="description"
              />
            </label>
          </div>
          <div className="flex justify-end px-5 gap-[20px]">
            <button className="bg-white py-2 px-4 rounded-[10px]">
              Cancel
            </button>
            <button
              onClick={postProduct}
              className="buttons text-white bg-blue-400 py-2 px-4 rounded-[10px]"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
