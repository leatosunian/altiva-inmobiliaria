import { TranslucentNavBlack } from "@/components/page/TranslucentNavBlack";
import Footer from "@/components/page/home/Footer";
import PropertiesCont from "@/components/page/home/properties/PropertiesCont";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Propiedades | Altiva Propiedades",
  description:
    "Altiva Propiedades, inmobiliaria ubicada en Mar del Plata, Buenos Aires",
};

const Page = () => {
  return (
    <>
      <TranslucentNavBlack />
      <PropertiesCont />
      <Footer />
    </>
  );
};

export default Page;
