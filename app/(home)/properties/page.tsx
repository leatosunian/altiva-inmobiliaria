import { GlassmorphismNavBlack } from "@/components/page/GlassmorphismNavBlack";
import Footer from "@/components/page/home/Footer";
import PropertiesCont from "@/components/page/home/vehicles/PropertiesCont";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehículos | Distrito Automotor",
  description:
    "Distrito Automotor, concesionaria de vehículos ubicada en Mar del Plata, Buenos Aires",
};

const Page = () => {
  return (
    <>
      <GlassmorphismNavBlack />
      <PropertiesCont />
      <Footer />
    </>
  );
};

export default Page;
