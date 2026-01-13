import ContactForm from "@/components/page/home/contactus/ContactForm";
import { TranslucentNavBlack } from "@/components/page/TranslucentNavBlack";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contacto | Altiva Propiedades",
  description:
    "Altiva Propiedades, inmobiliaria ubicada en Mar del Plata, Buenos Aires",
};

const ContactUs = () => {
  return (
    <>
      <TranslucentNavBlack />
      <section
        className="flex flex-col items-start justify-start w-full my-auto h-fit "
        style={{ transform: "translateY(90px)" }}
      >
        <ContactForm />
      </section>
      {/* <div className="w-full mt-0 h-fit">
        <Footer />
      </div> */}
    </>
  );
};

export default ContactUs;
