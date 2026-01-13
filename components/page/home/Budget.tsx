"use client";
import React from "react";
import styles from "@/app/css-modules/home.budget.module.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const Budget = () => {
  return (
    <>
      <div className={`${styles.container} `}>
        <motion.div
          initial={{ opacity: 0 }}
          viewport={{ amount: "all", once: true }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="flex items-center justify-center w-full h-full px-5 overflow-hidden bg-gradient-to-br from- to-transparent"
        >

          <Card
            style={{ border: "1px solid #ebebeb10" }}
            className="flex flex-col justify-between w-full gap-10 py-10 m-auto bg-black bg-opacity-60 sm:w-4/6 sm:items-left px-7 md:px-14"
          >
            {/* black overlay for background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 4, delay: 0, ease: "easeInOut" }}
              className="absolute left-0 z-10 w-full bg-black h-fit"
            ></motion.div>
            {/* black overlay for background */}
            <div className="z-20 flex flex-col gap-5 text-white  sm:gap-8">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                viewport={{ amount: "some", once: true }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col gap-1 sm:gap-3"
              >
                <h3 className="text-4xl font-bold">Tasamos tu propiedad</h3>
                <Separator
                  style={{ height: "2px", backgroundColor: "#1C4D8D" }}
                  className="my-5 bg-red-800 w-9 sm:my-0"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                viewport={{ amount: "all", once: true }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <span className="mt-5">
                  Valoramos tu hogar como si fuera nuestro, porque sabemos que
                  cada propiedad tiene una historia única que merece ser
                  reconocida y apreciada. Solicita la tasación de tu propiedad
                  hoy mismo y da el primer paso para vender o alquilar tu
                  inmueble
                </span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: "all", once: true }}
              transition={{ duration: 0.7, delay: 1 }}
              className="w-full"
            >
              <Button className="flex w-full gap-2 px-6 text-white py-7" style={{ backgroundColor: "#1C4D8D" }}>
                Solicitar cotización
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Budget;
