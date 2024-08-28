import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");
import Connect from "@/config/dbConfig";
import user from "@/models/user";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "letmefineshmyfood@gmail.com",
    pass: "rwmb tsin trdk njpz",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const otpCache = {};

export async function POST(NextRequest) {
  try {

    await Connect();
    const { action, details, enteredOtp } = await NextRequest.json();
    if (action === 'register') {
      const otp = generateOTP();
      otpCache[details.email] = otp;
      console.log(details.email, 'this is the email')
      // setTimeout(() => {
      //     delete otpCache[otp]
      // }, 2 * 60 * 1000);

      const mailOption = {
        from: "letmefineshmyfood@gmail.com",
        to: details.email,
        subject: `your otp for register`,
        text: `your otp is ${otp}`,
      };
      await transporter.sendMail(mailOption);
      return NextResponse.json({ message: "OTP sent successfully" }, { status: 201 });

    } else if (action === 'verify') {
      let member;
      if (enteredOtp == otpCache[details.email]) {

        const hashedPassword = await bcrypt.hash(details.password, 10)
        member = await user.create({
          email: details.email,
          username: details.username,
          password: hashedPassword,
        })
      }
      const secretKey = process.env.SECRET_KEY-r
      const response = NextResponse.json({ Name: 'success' }, { status: 200 })
      const token = jwt.sign({ id: member._id }, secretKey, { expiresIn: '1h' })
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV-r === 'production',
        maxAge: 3600,
        path: '/'
      })
      return response;
    }

  } catch (error) {
    console.log("backend error", error);
  }
}
