import React from "react";
import HomePage from "./home";
import Sacreddestinations from "./Sacreddestinations";
import BadyaYantra from "./Instrumant";
import Laptop from "./Laptop";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function HomePage1() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <Sacreddestinations />
      <BadyaYantra />
      <Laptop />
      <Footer />
    </div>
  );
}
