"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/dataSlice";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { userList } from "../features/dataSlice";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.globalValues.loginSuccess
  );
  const [logDetails, setLogDetails] = useState({
    password: "",
    email: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = () => {
    NProgress.start();
    try {
      router.push("/register");
    } catch (error) {
      console.log("error while redirecting to register page", error);
    } finally {
      NProgress.done();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    NProgress.start();
    try {
      const submitLog = await axios.post("/api/login", logDetails);
      if (submitLog.status === 200) {
        try {
          const checkAuth = await axios.get("/api/isAuth");
          if (checkAuth.status === 200) {
            if (submitLog.data.role === "admin") {
              router.push("/adminPanel");
              const response = await axios.get("api/adminData");
              dispatch(userList(response.data.data));
            } else {
              dispatch(loginSuccess());

              router.push("/homePage");
            }
          } else {
            setErrorMessage(checkAuth.data.message || "Authentication failed");
            setShowPopup(true);
          }
        } catch (error) {
          setErrorMessage(error.response?.data.message || error.message);
          setShowPopup(true);
        }
      } else {
        setErrorMessage(submitLog.data.message || "Login failed");
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data.message || error.message);
      setShowPopup(true);
    } finally {
      NProgress.done(); // Stop the loading bar
    }
  };

  return (
    <div className="bg-blue-300">
      <div className="relative">
        <Image
          className="h-screen w-screen object-cover opacity-75"
          src="https://e0.pxfuel.com/wallpapers/436/360/desktop-wallpaper-black-and-white-skyscraper-drawing-building-drawing.jpg"
          alt="Skyscraper Drawing"
          width={1920} // Example width, adjust as needed
          height={1080} // Example height, adjust as needed
        />
        <div className="register-card flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg  p-5 rounded-xl gap-[35px]">
          <h1 className="text-3xl font-bold text-white">Login</h1>

          <div className="flex flex-col gap-[30px]">
            <label
              className="text-white font-bold flex flex-col ps-3"
              htmlFor="email"
            >
              Email
              <input
                onChange={handleChange}
                className="rounded-xl py-1 px-7 text-black"
                type="text"
                name="email"
              />
            </label>
            <label
              className="text-white font-bold flex flex-col ps-3"
              htmlFor="password"
            >
              Password
              <input
                onChange={handleChange}
                className="rounded-xl py-1 px-7 text-black"
                type="text"
                name="password"
              />
            </label>
          </div>
          <div className="flex gap-[20px] pb-10">
            <button
              onClick={register}
              className="register bg-purple-500 py-2 px-6 rounded-xl text-white"
            >
              Register
            </button>
            <button
              onClick={handleSubmit}
              className="register bg-purple-500 py-2 px-6 rounded-xl text-white"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Popup for login failure */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Login Failed</h2>
            <p>{errorMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
