"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { authUser } from "../features/dataSlice";
import NProgress from "nprogress";
import Image from "next/image";

export default function RegisterCard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [otpField, setOtpField] = useState(false);
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const login = () => {
    NProgress.start();
    try {
      router.push("/");
    } catch (error) {
      console.log("error while redirecting to login page", error);
    } finally {
      NProgress.done();
    }
  };

  const registerUser = async () => {
    setOtpField(!otpField);
    const regist = await axios.post("api/register", {
      action: "register",
      details,
    });

    console.log(regist);
  };
  const verify = async () => {
    const checkOtp = await axios.post("api/register", {
      action: "verify",
      details,
      enteredOtp: otp,
    });
    if (checkOtp.status === 200) {
      router.push("homePage");
    }
    console.log(checkOtp, "user added successfully");
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
        <div className="register-card flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg p-5 rounded-xl gap-[35px]">
          <h1 className="text-2xl font-bold text-white">Register</h1>

          <div className="flex flex-col gap-[30px]">
            <label
              className="text-white font-bold flex flex-col  ps-3"
              htmlFor="username"
            >
              User Name
              <input
                onChange={handleChange}
                className="rounded-xl py-1 px-7 text-black"
                type="text"
                name="username"
              />
            </label>

            <label
              className="text-white font-bold flex flex-col  ps-3"
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
              className="text-white font-bold flex flex-col  ps-3"
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

            <label
              className={`${
                otpField ? "" : "hidden"
              } text-white font-bold flex flex-col  ps-3`}
              htmlFor="otp"
            >
              Enter OTP
              <input
                onChange={(e) => setOtp(e.target.value)}
                className="rounded-xl py-1 px-7 text-black"
                type="text"
                name="otp"
                value={otp}
              />
            </label>
          </div>
          <div className="flex gap-[20px] pb-10">
            <button
              onClick={login}
              className="register bg-purple-500 py-2 px-6 rounded-xl text-white"
            >
              Login
            </button>
            <button
              onClick={registerUser}
              className={`${
                otpField ? "hidden" : ""
              } register bg-purple-500 py-2 px-6 rounded-xl text-white`}
            >
              Register
            </button>
            <button
              onClick={verify}
              className={`${
                otpField ? "" : "hidden"
              } register bg-purple-500 py-2 px-6 rounded-xl text-white`}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
