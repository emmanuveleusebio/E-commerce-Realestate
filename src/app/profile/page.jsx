"use client";
import React from "react";
import Header from "../components/header";
import Profile from "../components/profile";
import Upload from "../components/uploads";
import AddPage from "../components/addCard";
import Footer from "../components/footer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store";

export default function ProfilePage() {
  return (
    <div className="body">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Profile />
          <Upload />
          <Footer />
        </PersistGate>
      </Provider>
    </div>
  );
}
