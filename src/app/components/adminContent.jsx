import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function UserInfo() {
  const users = useSelector((state) => state.globalValues.users) || [];

  const [customerFilter, setCustomerFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [membershipFilter, setMembershipFilter] = useState("");

  const filteredUsers = users.filter((user) => {
    const membership = user.premiumMembership ? user.premiumMembership.type : "none";
    
    return (
      (customerFilter === "" || user.username.toLowerCase().includes(customerFilter.toLowerCase())) &&
      (typeFilter === "" || user.role.toLowerCase().includes(typeFilter.toLowerCase())) &&
      (membershipFilter === "" || membership.toLowerCase().includes(membershipFilter.toLowerCase()))
    );
  });

  let price = []
  {users.map((user, index) => {
  const getPrice = (membershipType) => {
  
    switch (membershipType) {
      case "weekly":
        return 199;
      case 'monthly':
        return 399;

      case "yearly":
        return 799;

      default:
        return 0;
    }
  };
  const membership = user.premiumMembership ? user.premiumMembership.type : null;
  price.push(getPrice(membership));

  })}
console.log(price)
  return (
    <div className="h-full object-cover ">
      <div className="flex flex-col gap-[20px] bg-gray-500 p-5">
        {/* <div className="admin bg-white w-[400px] py-2 px-5 rounded-2xl">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" />
        </div> */}
        <h1 className="text-2xl font-bold text-white">Sales information</h1>
        <div className="flex justify-between">
          <label className="flex flex-col font-bold text-white" htmlFor="name">
            Customer
            <input
              className="admin py-1 px-5 text-black"
              type="text"
              name="name"
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
            />
          </label>

          <label className="flex flex-col font-bold text-white" htmlFor="type">
            Type
            <input
              className="admin py-1 px-5 text-black"
              type="text"
              name="type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
             
            />
          </label>
          <label
            className="flex flex-col font-bold text-white"
            htmlFor="membership"
          >
            Membership
            <input
              className="admin py-1 px-5 text-black"
              type="text"
              name="membership"
              value={membershipFilter}
              onChange={(e) => setMembershipFilter(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="bg-white m-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="border p-2">SL</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Plan</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  {user.premiumMembership
                    ? user.premiumMembership.type
                    : "none"}
                </td>
                <td className="border p-2">{price[index]}</td>
                <td className="border p-2"> {new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
