"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";


export default function Footer() {
  const router = useRouter();

  const logout = async () => {
    NProgress.start()
    try {
      await axios.post("api/logout");
      router.push("/login");
      console.log("logged out");
    } catch (error) {
      console.log(error);
    } finally {
      NProgress.done()
    }
  };
  return (
    <div>
      <div className="flex justify-around p-[100px]">
        <div className="flex flex-col justify-center items-center">
          <div className="  w-[100px] bg-blue-300 rounded-[50%] px-2 py-2 flex justify-center">
            <div className="bg-red-400 rounded-[50%] w-[82px] h-[80px] flex justify-center items-center">
              <i className="text-white fa-solid fa-shield  text-3xl"></i>
            </div>
          </div>
          <p className="text-2xl">0% brocer charge</p>
          <p>Connecting world faster</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className=" w-[100px] bg-blue-300 rounded-[50%] px-2 py-2 flex justify-center">
            <div className="bg-red-400 rounded-[50%] w-[82px] h-[80px] flex justify-center items-center">
              <i className="text-white fa-solid fa-handshake text-3xl"></i>
            </div>
          </div>
          <p className="text-2xl">Most trusted platform</p>
          <p>Easy to use</p>
        </div>
      </div>
      <div className="bg-red-400 flex justify-around footer-info p-12">
        <div className="space-y-[20px]">
          <h3>Support</h3>
          <ul>
            <li>RMS street new Delhi pin: 682001 India</li>
            <li>exclusive@gmail.com</li>
            <li>+91 9888 38 7777</li>
          </ul>
        </div>
        <div className="space-y-[20px]">
          <h3>Account</h3>
          <ul>
            <li>Login</li>
            <li>Register</li>
            <li>Wishlist</li>
            <li onClick={logout} className="cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
        <div className="space-y-[20px]">
          <h3>Quick Link</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of use</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="space-y-[20px]">
          <h3>Download App</h3>
          <ul>
            <li>PlayStore</li>
            <li>App Store</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
