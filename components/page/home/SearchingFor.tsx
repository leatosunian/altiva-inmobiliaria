"use client";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { CountUp } from "countup.js";
import AnimatedCounter from "./AnimatedCounter";
import Link from "next/link";

const SearchingFor = () => {
  useEffect(() => {
    const count1 = new CountUp("counter1", 590);
    const count2 = new CountUp("counter2", 590);
    const count3 = new CountUp("counter3", 590);
    if (!count1.error) count1.start();
    if (!count2.error) count2.start();
    if (!count3.error) count3.start();
  }, []);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full gap-6 px-6 overflow-hidden sm:px-16 md:px-32 2xl:px-56"
        style={{ height: "fit-content" }}
      >
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          viewport={{ amount: "some", once: true }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col w-full gap-0 sm:gap-3"
        >
          <h3 className="text-2xl font-bold sm:text-3xl sm:text-left">
            ¿Qué estás buscando?
          </h3>
          <Separator
            style={{ height: "2px" }}
            className="my-3 bg-red-800 w-9 sm:my-0"
          />
        </motion.div>

        {/* Contenedor de categorías */}
        <div className="grid w-full grid-cols-1 gap-5 mt-0 sm:grid-cols-2 sm:mt-5">
          {/* Div 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            viewport={{ amount: "some", once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-full h-64 overflow-hidden bg-center bg-cover rounded-md shadow-xl"
          >
            <Link href="/properties?search=casa">
              <motion.div
                className="relative w-full h-64 overflow-hidden bg-center bg-cover rounded-md"
                style={{
                  backgroundImage: "url('/house.jpg')",
                }}
                initial={{ opacity: 1, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.04 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="flex flex-col m-auto">
                    <span className="text-xl font-bold text-center text-white sm:text-left">
                      CASAS
                    </span>
                    <Separator
                      style={{ height: "2px" }}
                      className="w-5 my-5 bg-red-800 sm:my-0"
                    />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Div 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            viewport={{ amount: "some", once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative w-full h-64 overflow-hidden bg-center bg-cover rounded-md shadow-xl"
          >
            <Link href="/properties?search=departamento">
              <motion.div
                className="relative w-full h-64 overflow-hidden bg-center bg-cover rounded-md"
                style={{
                  backgroundImage: "url('/building.jpg')", // Reemplaza con la URL de la imagen correspondiente
                }}
                initial={{ opacity: 1, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.04 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="flex flex-col m-auto">
                    <span className="text-xl font-bold text-center text-white sm:text-left">
                      DEPARTAMENTOS
                    </span>
                    <Separator
                      style={{ height: "2px" }}
                      className="w-5 my-5 bg-red-800 sm:my-0"
                    />
                  </div>
                </div>
              </motion.div>
            </Link>

          </motion.div>

          {/* Div 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            viewport={{ amount: "some", once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="relative w-full h-64 overflow-hidden bg-center bg-cover rounded-md shadow-xl"
          >
            <Link href="/properties?search=terreno">
              <motion.div
                className="relative w-full h-64 overflow-hidden bg-center bg-cover rounded-md"
                style={{
                  backgroundImage: "url('/terreno.jpg')", // Reemplaza con la URL de la imagen correspondiente
                }}
                initial={{ opacity: 1, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.04 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="flex flex-col m-auto">
                    <span className="text-xl font-bold text-center text-white sm:text-left">
                      TERRENOS
                    </span>
                    <Separator
                      style={{ height: "2px" }}
                      className="w-5 my-5 bg-red-800 sm:my-0"
                    />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Div 4 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            viewport={{ amount: "some", once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="relative w-full h-64 overflow-hidden bg-center bg-cover rounded-md shadow-xl"
          >
            <Link href="/properties?search=oficina">

              <motion.div
                className="relative w-full h-64 overflow-hidden bg-center bg-cover rounded-md"
                style={{
                  backgroundImage: "url('/office.jpeg')", // Reemplaza con la URL de la imagen correspondiente
                }}
                initial={{ opacity: 1, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.04 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="flex flex-col m-auto">
                    <span className="text-xl font-bold text-center text-white sm:text-left">
                      OFICINAS
                      {/* <AnimatedCounter from={0} to={100} /> */}
                    </span>

                    <Separator
                      style={{ height: "2px" }}
                      className="w-5 my-5 bg-red-800 sm:my-0"
                    />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SearchingFor;
