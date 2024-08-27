"use client";
import React from "react";
import store, { persistor } from "../store";
import MessagePage from "../components/messagePage";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function productDetails() {
  return (
    <div className="body h-[100vh]">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="">
            <MessagePage />
          </div>
        </PersistGate>
      </Provider>
    </div>
  );
}
