import React from "react";
import Footer from "@/components/page/home/Footer";
import PropertyCont from "@/components/page/home/properties/property/PropertyCont";
import { Metadata } from "next";
import { TranslucentNavBlack } from "@/components/page/TranslucentNavBlack";

export const metadata: Metadata = {
  title: "Propiedades | Altiva Propiedades",
  description:
    "Altiva Propiedades, inmobiliaria ubicada en Mar del Plata, Buenos Aires",
};


const Page = () => {
  return (
    <>
      <TranslucentNavBlack />
      <PropertyCont />
      <Footer />
    </>
  );
};

export default Page;
