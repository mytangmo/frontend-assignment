"use client";
import React from "react";
import { Header } from "../components/header/page";

const HomePage = () => {
  return (
    <>
      <Header
        cartItemCount={3}
        onSearch={(value) => console.log("Search:", value)}
      />
      <div className="flex min-h-screen items-center justify-center text-2xl font-semibold text-red-500">
        Show your potential to the world
      </div>
    </>
  );
};

export default HomePage;
