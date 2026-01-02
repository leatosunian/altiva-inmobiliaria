import Header from "@/components/page/Header";
import React from "react";
import Footer from "@/components/page/home/Footer";
import VehicleCont from "@/components/page/home/vehicles/vehicle/VehicleCont";
import { Metadata } from "next";
import { GlassmorphismNavBlack } from "@/components/page/TranslucentNav";

export const metadata: Metadata = {
  title: "Vehículos | Distrito Automotor",
  description:
    "Distrito Automotor, concesionaria de vehículos ubicada en Mar del Plata, Buenos Aires",
};


const Page = () => {
  return (
    <>
      <GlassmorphismNavBlack />
      <VehicleCont />
      <Footer />
    </>
  );
};

export default Page;
