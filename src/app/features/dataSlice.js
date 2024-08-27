// authSlice.js
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  initialState: {
    allProducts: [],
    filteredProducts: [],
    isAuthenticated: false,
    productDetails: {},
    wishlistProducts: [],
    messageReceiver: '',
    membership: [],
    messages: [],
    chatList: [],
    users: [],
  }
}

const globalSlice = createSlice({
  name: "globalValues",
  initialState,

  reducers: {
    allPlots: (state, action) => {
      state.allProducts = action.payload;
    },
    filterProduct: (state, action) => {
      state.filteredProducts = action.payload;
    },
    loginSuccess: (state) => {
      state.isAuthenticated = !state.isAuthenticated;
    },
    viewDetails: (state, action) => {
      state.productDetails = action.payload
    },
    wishlistdata: (state, action) => {
      state.wishlistProducts = action.payload;
      console.log(state.wishlistProducts, 'hai')
    },
    messageReceiverId: (state, action) => {
      state.messageReceiver = action.payload;
    },
    membershipPlans: (state, action) => {
      state.membership = action.payload
    },
    previouMessages: (state, action) => {
      state.messages = action.payload
    },
    chatCollections: (state, action) => {
      state.chatList = action.payload
    },
    userList: (state, action) => {
      state.users = action.payload
    }

  }
})

export const { allPlots, filterProduct, loginSuccess, viewDetails, wishlistdata, messageReceiverId, authUser, membershipPlans, previouMessages, chatCollections, userList } = globalSlice.actions;
export default globalSlice.reducer;
