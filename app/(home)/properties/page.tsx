import { GlassmorphismNav } from "@/components/page/GlassmorphismNav";
import VehiclesCont from "@/components/page/home/vehicles/VehiclesCont";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehículos | Distrito Automotor",
  description:
    "Distrito Automotor, concesionaria de vehículos ubicada en Mar del Plata, Buenos Aires",
};

const Page = () => {
  return (
    <>
      <GlassmorphismNav />
      <VehiclesCont />
    </>
  );
};

export default Page;
