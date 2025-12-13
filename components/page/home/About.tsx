import React from "react";
import Image from "next/image";
import image from "@/public/aboutusimage.png";
import { Separator } from "@/components/ui/separator";

const AboutSection = () => {
  return (
    <section className="w-full py-0 mb-10 bg-gray-100 md:py-28">
      <div className="container flex flex-col items-center gap-5 px-6 mx-auto sm:gap-24 md:px-10 lg:flex-row">
        {/* Image Section */}
        <div className="w-full mb-6 md:w-1/2 md:mb-0">
          <div
            style={{
              borderBottomLeftRadius: "20%",
              borderTopRightRadius: "15%",
            }}
            className="overflow-hidden shadow-lg"
          >
            <Image src={image} alt="Worker" className="object-cover w-full" />
          </div>
        </div>
        {/* Content Section */}
        <div className="w-full text-left sm:text-center md:w-1/2 md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Conocé acerca de nosotros
          </h2>
          <Separator
            style={{ height: "2px" }}
            className="my-5 bg-red-800 w-9 sm:my-4"
          />
          <p className="mb-6 text-sm text-left text-gray-600 sm:text-base">
            En Altiva Propiedades, nuestra pasión es ayudarte a encontrar un
            espacio que no solo sea un inmueble, sino un lugar donde construirás
            tus sueños y recuerdos. Con más de 14 años de experiencia en el
            sector inmobiliario, hemos perfeccionado nuestro proceso para
            garantizar una experiencia impecable desde la primera consulta hasta
            el cierre del trato. Creemos que cada cliente tiene necesidades
            únicas, por eso nos esforzamos por personalizar nuestras soluciones,
            ya sea que estés buscando comprar, vender o alquilar.
          </p>
          <ul className="grid grid-cols-1 text-gray-800 sm:grid-cols-2 gap-y-2 gap-x-5 ">
            {[
              "+14 años en el sector",
              "Compra, venta y alquiler",
              "Asesoramiento personalizado",
              "Propiedades seleccionadas",
              "Variedad y exclusividad",
              "Satisfacción garantizada",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center col-span-1 space-x-2"
              >
                <span className="font-bold text-red-600">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
