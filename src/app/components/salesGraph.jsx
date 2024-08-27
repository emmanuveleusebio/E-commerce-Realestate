import React from "react";
import { useSelector } from "react-redux";

export default function Graph() {
  const users = useSelector((state) => state.globalValues.users) || [];

  const getSalesData = () => {
    const today = new Date();
    const sales = Array(7).fill(0); // Initialize an array with 7 elements set to 0

    users.forEach((user) => {
      const createdAt = new Date(user.premiumMembership.startDate);
      const daysAgo = Math.floor((today - createdAt) / (1000 * 60 * 60 * 24));

      if (daysAgo >= 0 && daysAgo < 7) {
        sales[6 - daysAgo] += 1; // Increment the sales count for the corresponding day
      }
    });

    return sales;
  };

  // Total number of users
  const totalUsers = users.length;

  // Number of users who bought premium membership
  const premiumUsersCount = users.filter(
    (user) => user.premiumMembership?.purchaseDate
  ).length;

  // Calculate percentages based on total user count scaled to 10
  const totalPercentage = 500; // Total represented as 10
  const premiumUsersPercentage =
    (premiumUsersCount / totalUsers) * totalPercentage;

  const sales = getSalesData();
  const maxSales = users.length;
  const highest = Math.max(...sales);
  const graphHeight = 500;
  return (
    <div className="m-auto flex justify-center flex-col w-fit bg-white p-10 rounded-2xl">
      <div className="flex  h-full ">
        <div className="flex flex-col h-full justify-around gap-6 py-6 font-bold">
          <h1>100</h1>
          <h1>90</h1>
          <h1>80</h1>
          <h1>70</h1>
          <h1>60</h1>
          <h1>50</h1>
          <h1>40</h1>
          <h1>30</h1>
          <h1>20</h1>
          <h1>10</h1>
        </div>
        <div className=" border-s-2 border-s-black border-b-2 border-b-black h-[500px] w-[800px] flex gap-[10px] items-end">
          {sales.map((val, index) => {
            const barHeight = (val / maxSales) * graphHeight;
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center mb-[-24px]"
              >
                <div
                  className={`w-[50px] bg-gray-500`}
                  style={{ height: `${barHeight}px` }}
                ></div>
                <p>{index + 1}</p>
              </div>
            );
          })}
        </div>
        <div className="font-bold">
          <p>X-WEEK</p>
          <p>Y-Percentage</p>
          <p>Highest Revenue-{highest}.000$</p>
        </div>
      </div>
    </div>
  );
}
