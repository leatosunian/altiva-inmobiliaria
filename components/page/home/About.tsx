import React, { useState } from "react";
import Image from "next/image";
import image from "@/public/aboutusimage.png";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import pattern from "@/public/pattern.png";

const AboutSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.02);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <section
      ref={ref}
      className="relative z-10 w-full px-6 py-24 mb-10 md:py-36 sm:px-16 lg:px-32 2xl:px-56 "
    >
      {/* Background overlay: placed behind content so opacity affects only background */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        transition={{ duration: 3 }}
        whileInView={{ opacity: backgroundOpacity }}
        className="absolute inset-0 bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: `url(/pattern_bg.svg)`, backgroundSize: 'cover' }}
      />
      {/* Background overlay: placed behind content so opacity affects only background */}

      <motion.div
        className="container z-30 flex flex-col items-center w-full gap-5 p-0 sm:gap-24 lg:flex-row-reverse"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >

        {/* Image Section */}
        <motion.div
          className="w-full mb-6 md:w-1/2 md:mb-0"
          variants={imageVariants}
        >
          <div className="overflow-hidden rounded-lg shadow-lg">
            <Image src={image} alt="Worker" className="object-cover w-full" />
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="w-full text-left lg:w-1/2"
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-800 md:text-4xl 2xl:text-5xl"
          >
            Conocé acerca de nosotros
          </motion.h2>

          <motion.div variants={itemVariants}>
            <Separator
              style={{ height: "2px", backgroundColor: "#1C4D8D" }}
              className="mt-2 mb-5 w-9 sm:mb-9"
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mb-5 text-base text-left text-gray-600 sm:text-base"
          >
            En Altiva Propiedades acompañamos a nuestros clientes en cada etapa del proceso inmobiliario, ofreciendo un servicio profesional, transparente y personalizado. Entendemos que cada operación es una decisión importante, por eso trabajamos para que la compra, venta o alquiler de tu propiedad sea simple y segura.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base text-left text-gray-600 mb-9 sm:text-base"
          >
            Con más de 14 años de experiencia en el sector, nos especializamos en la selección de propiedades de calidad y en el asesoramiento integral, adaptado a las necesidades de cada cliente. Nuestro compromiso es brindar una experiencia confiable, eficiente y orientada a la satisfacción.
          </motion.p>

          <motion.ul
            className="grid grid-cols-1 text-gray-800 sm:grid-cols-2 gap-y-2 gap-x-5"
            variants={containerVariants}
          >
            {[
              "+14 años en el sector",
              "Compra, venta y alquiler",
              "Asesoramiento personalizado",
              "Propiedades seleccionadas",
              "Variedad y exclusividad",
              "Satisfacción garantizada",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-center col-span-1 space-x-2"
              >
                <span className="text-lg font-bold md:text-xl" style={{ color: "#4988C4" }}>✓</span>
                <span className="text-lg font-medium">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
