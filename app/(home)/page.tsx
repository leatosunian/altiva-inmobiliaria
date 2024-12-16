"use client";
import React from "react";
import Header from "@/components/page/Header";
import AdminHeader from "@/components/page/AdminHeader";
import Footer from "@/components/page/home/Footer";
import NewProducts from "@/components/page/home/NewProducts";
import Section2 from "@/components/page/home/Section2";
import Slider from "@/components/page/home/Slider";
import { Suspense, useEffect, useState } from "react";
import { ICar } from "../models/car";
import Section3 from "@/components/page/home/Section3";
import Search from "@/components/page/home/Search";
import LoaderFullscreen from "@/components/page/LoaderFullscreen";
import ContactForm from "@/components/page/home/ContactForm";
import AboutSection from "@/components/page/home/About";
import LatestProperties from "@/components/page/home/LatestProperties";
import Budget from "@/components/page/home/Budget";
import SearchingFor from "@/components/page/home/SearchingFor";
import Counters from "@/components/page/home/Counters";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  const [latestVehicles, setLatestVehicles] = useState<ICar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getLastVehicles() {
    const latestVehicles = await fetch("/api/cars/latests/", {
      method: "GET",
      cache: "no-store",
    });
    const cars = await latestVehicles.json();
    if (cars.length !== 0) {
      setLatestVehicles(cars);
      setLoading(false);
    }
    return latestVehicles;
  }

  useEffect(() => {
    //getLastVehicles();
    //fetch 10 lastest vehicles
  }, []);

  return (
    <>
      <Suspense>
        {/* {loading && <LoaderFullscreen />} */}
        <div className="w-full">
          <Header />
          <Slider />
          <SearchingFor />
          <Separator className="w-2/3 my-16 mx-auto" />

          {/* <LatestProperties vehicles={latestVehicles} /> */}
          <AboutSection />
          <Counters/>
          <Separator className="w-2/3 mb-14 sm:mb-36 mx-auto" />

          <Budget />
          <Separator className="w-2/3 mb-36 mx-auto" />

          <Footer />
        </div>
      </Suspense>
    </>
  );
};

export default Home;
