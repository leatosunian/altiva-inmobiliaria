"use client";

import React, { useState } from "react";
import styles from "@/app/css-modules/home.slider.module.css";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectpage";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

const Hero = () => {

  const [businessType, setBusinessType] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const handleSearch = () => {
    console.log(businessType, propertyType);
    const params = new URLSearchParams(searchParams);

    if (businessType !== "") {
      params.set("businessType", businessType);
    } else {
      params.delete("businessType");
    }

    if (propertyType !== "") {
      params.set("propertyType", propertyType);
    } else {
      params.delete("propertyType");
    }

    push(`/properties/?${params.toString()}`);
    console.log(params.toString());
  };

  return (
    <section className={styles.sectionCont}>
      {/* black overlay for background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 3, delay: 0, ease: "easeInOut" }}
        className="absolute left-0 z-10 w-full h-full bg-black"
      ></motion.div>
      {/* black overlay for background */}

      <div className="z-20 flex flex-col items-center w-full gap-10 mx-auto sm:w-4/5">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="mx-auto text-left sm:text-center"
        >
          <h3
            className="text-4xl font-extrabold text-left text-white sm:text-center xl:text-5xl 2xl:text-6xl"
            style={{ letterSpacing: ".5px" }}
          >
            Encuentra el espacio perfecto para tu vida o negocio
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          {/* <p className="text-sm md:text-base lg:text-lg">
            Unimos 6 marcas líderes del mercado en un mismo lugar. Además,
            tenemos más de 700 usados seleccionados para vos.
          </p> */}
          {/* <p className="text-base text-left sm:text-center md:text-lg">
            Tu próximo espacio está esperando. Nosotros te llevamos allí.
          </p> */}
          <p className="text-base text-left sm:text-center md:text-xl">
            Más de 15 años conectando a nuestros clientes con su propiedad
            soñada. Encontremos la tuya.
          </p>
        </motion.div>
        {/* <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.1 }}
          className="flex flex-col gap-5 sm:flex-row "
        >
          <button className={styles.button}>Comprar</button>
          <button className={styles.button}>Alquilar</button>
          <button className={styles.button}>Vender</button>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.4, ease: "easeOut" }}
          className="w-full sm:w-fit"
        >
          <Card
            style={{ border: "1px solid #ebebeb25" }}
            className="flex flex-col gap-5 p-5 shadow-lg sm:flex-row bg-white/10 backdrop-blur-md border-white/20 "
          >
            <Select onValueChange={(value: string) => setBusinessType(value)}>
              <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder="Comprar o alquilar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Venta">Venta</SelectItem>
                  <SelectItem value="Alquiler">Alquiler</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={(value: string) => setPropertyType(value)}>
              <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder="Tipo de propiedad" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Casa">Casa</SelectItem>
                  <SelectItem value="Departamento">Departamento</SelectItem>
                  <SelectItem value="Local">Local</SelectItem>
                  <SelectItem value="Ph">Ph</SelectItem>
                  <SelectItem value="Fondo de comercio">Fondo de comercio</SelectItem>
                  <SelectItem value="Terreno">Terreno</SelectItem>
                  <SelectItem value="Oficina">Oficina</SelectItem>
                  <SelectItem value="Quinta">Quinta</SelectItem>
                  <SelectItem value="Galpon">Galpón</SelectItem>
                  <SelectItem value="Chalet">Chalet</SelectItem>
                  <SelectItem value="Deposito">Depósito</SelectItem>
                  <SelectItem value="Campo">Campo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button onClick={handleSearch} className="flex gap-2 text-white " style={{ backgroundColor: "#1C4D8D" }}>
              <FaSearch /> Buscar
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
