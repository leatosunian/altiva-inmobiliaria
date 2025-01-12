"use client";
import React from "react";
import Header from "@/components/page/Header";
import AdminHeader from "@/components/page/AdminHeader";
import Footer from "@/components/page/home/Footer";
import NewProducts from "@/components/page/home/NewProducts";
import Section2 from "@/components/page/home/Section2";
import Slider from "@/components/page/home/Slider";
import { Suspense, useEffect, useState } from "react";
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
import { IProperty } from '../models/property';

const Home = () => {
  const [latestProperties, setLatestProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getLastProperties() {
    const latestProperties = await fetch("/api/cars/latests/", {
      method: "GET",
      cache: "no-store",
    });
    const cars = await latestProperties.json();
    if (cars.length !== 0) {
      setLatestProperties(cars);
      setLoading(false);
    }
    return latestProperties;
  }

  useEffect(() => {
    getLastProperties();
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
          <Separator className="w-2/3 mx-auto my-16" />

          <LatestProperties properties={latestProperties} />
          <AboutSection />
          <Counters/>
          <Separator className="w-2/3 mx-auto mb-14 sm:mb-36" />

          <Budget />
          <Separator className="w-2/3 mx-auto mb-0 md:mb-36" />
          <ContactForm/>
          <Footer />
        </div>
      </Suspense>
    </>
  );
};

export default Home;
