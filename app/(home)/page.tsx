"use client";
import React from "react";
import Header from "@/components/page/Header";
import Footer from "@/components/page/home/Footer";
import Slider from "@/components/page/home/Slider";
import { Suspense, useEffect, useState } from "react";
import ContactForm from "@/components/page/home/ContactForm";
import AboutSection from "@/components/page/home/About";
import LatestProperties from "@/components/page/home/LatestProperties";
import Budget from "@/components/page/home/Budget";
import SearchingFor from "@/components/page/home/SearchingFor";
import Counters from "@/components/page/home/Counters";
import { Separator } from "@/components/ui/separator";
import { IProperty } from '../models/property';
import { GlassmorphismNavBlack } from "@/components/page/GlassmorphismNavBlack";

const Home = () => {
  const [latestProperties, setLatestProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getLastProperties() {
    const latestProperties = await fetch("/api/properties/latests/", {
      method: "GET",
      cache: "no-store",
    });
    const properties = await latestProperties.json();
    if (properties.length !== 0) {
      setLatestProperties(properties);
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
          {/* <Header /> */}
          <GlassmorphismNavBlack />
          <Slider />
          <AboutSection />
          <Separator className="w-2/3 mx-auto my-16" />
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
      </Suspense>
    </>
  );
};

export default Home;
