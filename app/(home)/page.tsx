"use client";
import React from "react";
import Header from "@/components/page/Header";
import Footer from "@/components/page/home/Footer";
import Hero from "@/components/page/home/Hero";
import { Suspense, useEffect, useState } from "react";
import ContactForm from "@/components/page/home/ContactForm";
import AboutSection from "@/components/page/home/About";
import LatestProperties from "@/components/page/home/LatestProperties";
import Budget from "@/components/page/home/Budget";
import SearchingFor from "@/components/page/home/SearchingFor";
import Counters from "@/components/page/home/Counters";
import { Separator } from "@/components/ui/separator";
import { IProperty } from '../models/property';
import { TranslucentNav } from "@/components/page/TranslucentNav";
import LoaderFullscreen from "@/components/page/LoaderFullscreen";
import { usePageLoader } from "../utils/usePageLoader";

const Home = () => {
  const [latestProperties, setLatestProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataReady, setDataReady] = useState(false);
  const pageReady = usePageLoader();
  const isLoading = !dataReady || !pageReady;

  async function getLastProperties() {
    try {
      const res = await fetch("/api/properties/latests/", {
        method: "GET",
        cache: "no-store",
      });

      const properties = await res.json();
      setLatestProperties(properties || []);
    } catch (error) {
      console.error(error);
    } finally {
      setDataReady(true);
    }
  }

  useEffect(() => {
    getLastProperties();
    //fetch 10 lastest vehicles
  }, []);

  return (
    <>
      <LoaderFullscreen isVisible={isLoading} />

      <div
        className={`w-full transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"
          }`}
      >
        <TranslucentNav />
        <Hero />
        <AboutSection />
        {/* <Separator className="w-2/3 mx-auto my-16" /> */}
        <div className="h-0 md:h-14"></div>
        <SearchingFor />
        <Separator className="w-2/3 mx-auto my-16" />
        <LatestProperties properties={latestProperties} />
        <Separator className="w-2/3 mx-auto my-16" />
        <Budget />
        <Separator className="w-2/3 mx-auto mb-0 md:mb-36" />
        <Counters />
        <Separator className="w-2/3 mx-auto mb-14 sm:mb-36" />
        <ContactForm />
        <Footer />
      </div>

    </>
  );
};

export default Home;
