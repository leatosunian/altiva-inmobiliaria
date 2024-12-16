"use client";
import React from "react";
import { MdHomeWork } from "react-icons/md";
import AnimatedCounter from "./AnimatedCounter";
import { GiStarsStack } from "react-icons/gi";
import { TbHomeDollar } from "react-icons/tb";
import { PiUsersThreeFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";

const Counters = () => {
  return (
    <>
      <Separator className="w-2/3  mx-auto" />
      <div className="w-full flex-col sm:flex-row items-center gap-10 sm:gap-0 h-fit py-10 flex justify-around">
        <div className="flex flex-col items-center gap-4 justify-center w-fit h-fit">
          <GiStarsStack color="red" size={100} />
          <div className="flex items-center flex-col ">
            <span className="font-bold text-2xl">
              +<AnimatedCounter from={0} to={14} />
            </span>
            <span className="font-semibold text-xl">Años en el mercado</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 justify-center w-fit h-fit">
          <TbHomeDollar color="red" size={100} />
          <div className="flex items-center flex-col ">
            <span className="font-bold text-2xl">
              +<AnimatedCounter from={0} to={423} />
            </span>
            <span className="font-semibold text-xl">Propiedades vendidas</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 justify-center w-fit h-fit">
          <PiUsersThreeFill color="red" size={100} />
          <div className="flex items-center flex-col ">
            <span className="font-bold text-2xl">
              +<AnimatedCounter from={0} to={659} />
            </span>
            <span className="font-semibold text-xl">Clientes satisfechos</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counters;
