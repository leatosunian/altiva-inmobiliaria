import React from "react";
import styles from "@/app/css-modules/home.slider.module.css";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectpage";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";

const Slider = () => {
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

      <div className="z-20 flex flex-col items-center w-full gap-16 mx-auto sm:w-4/5">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="mx-auto text-left sm:text-center"
        >
          {/* <h3
            className="text-4xl font-semibold sm:text-5xl xl:text-7xl"
            style={{ letterSpacing: ".5px" }}
          >
            Tu próximo auto, cada vez más cerca
          </h3> */}
          <h3
            className="text-4xl font-extrabold text-left sm:text-center sm:text-6xl "
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
            className="flex flex-col shadow-lg gap-5 sm:flex-row bg-black bg-opacity-30  p-5 "
          >
            <Select>
              <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder="Comprar o alquilar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Venta</SelectItem>
                  <SelectItem value="banana">Alquiler</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder="Tipo de propiedad" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Casa</SelectItem>
                  <SelectItem value="banana">Departamento</SelectItem>
                  <SelectItem value="blueberry">Local</SelectItem>
                  <SelectItem value="grapes">Ph</SelectItem>
                  <SelectItem value="pineapple">Fondo de comercio</SelectItem>
                  <SelectItem value="pineapple">Terreno</SelectItem>
                  <SelectItem value="pineapple">Oficina</SelectItem>
                  <SelectItem value="pineapple">Quinta</SelectItem>
                  <SelectItem value="pineapple">Galpón</SelectItem>
                  <SelectItem value="pineapple">Chalet</SelectItem>
                  <SelectItem value="pineapple">Depósito</SelectItem>
                  <SelectItem value="pineapple">Campo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button className="flex text-white bg-red-800 hover:bg-red-500 gap-2">
              <FaSearch /> Buscar
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Slider;
