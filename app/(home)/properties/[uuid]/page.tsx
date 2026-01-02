import React from "react";
import Footer from "@/components/page/home/Footer";
import VehicleCont from "@/components/page/home/vehicles/vehicle/VehicleCont";
import { Metadata } from "next";
import { TranslucentNavBlack } from "@/components/page/TranslucentNavBlack";

export const metadata: Metadata = {
  title: "Vehículos | Distrito Automotor",
  description:
    "Distrito Automotor, concesionaria de vehículos ubicada en Mar del Plata, Buenos Aires",
};


const Page = () => {
  return (
    <>
      <TranslucentNavBlack />
      <VehicleCont />
      <Footer />
    </>
  );
};

export default Page;
