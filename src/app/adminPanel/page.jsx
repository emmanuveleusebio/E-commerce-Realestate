'use client'
import React from "react";
import UserInfo from "../components/adminContent";
import Graph from "../components/salesGraph";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store";

export default function userInfo() {
  return (
  
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <div className="body pb-10">
          <UserInfo />
          <Graph />
          </div>
        </PersistGate>
      </Provider>
    
  );
}
