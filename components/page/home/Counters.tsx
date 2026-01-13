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
      <Separator className="w-2/3 mx-auto" />
      <div className="flex flex-col items-center justify-around w-full gap-10 py-10 sm:flex-row sm:gap-0 h-fit">
        <div className="flex flex-col items-center justify-center gap-4 w-fit h-fit">
          <GiStarsStack color="#1C4D8D" size={100} />
          <div className="flex flex-col items-center ">
            <span className="text-2xl font-bold">
              +<AnimatedCounter from={0} to={14} />
            </span>
            <span className="text-xl font-semibold">Años en el mercado</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-fit h-fit">
          <TbHomeDollar color="#1C4D8D" size={100} />
          <div className="flex flex-col items-center ">
            <span className="text-2xl font-bold">
              +<AnimatedCounter from={0} to={423} />
            </span>
            <span className="text-xl font-semibold">Propiedades vendidas</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-fit h-fit">
          <PiUsersThreeFill color="#1C4D8D" size={100} />
          <div className="flex flex-col items-center ">
            <span className="text-2xl font-bold">
              +<AnimatedCounter from={0} to={659} />
            </span>
            <span className="text-xl font-semibold">Clientes satisfechos</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counters;
