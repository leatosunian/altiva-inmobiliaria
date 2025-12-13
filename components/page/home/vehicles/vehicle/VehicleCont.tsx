"use client";

import Breadcrumbs from "@/components/page/home/vehicles/vehicle/Breadcrumbs";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/app/css-modules/vehicles/vehicle/vehicle.module.css";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { PiEngineBold, PiGasPump } from "react-icons/pi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useParams } from "next/navigation";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import RelatedVehicles from "@/components/page/home/vehicles/vehicle/RelatedVehicles";
import LoaderFullscreen from "@/components/page/LoaderFullscreen";
import { FaBed, FaLocationDot } from "react-icons/fa6";
import { IProperty } from "@/app/models/property";
import { IPropertyImage } from "@/app/models/propertyimage";
import { Bath, DoorOpen, Maximize2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const VehicleCont = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [vehicleData, setVehicleData] = useState<IProperty>();
  const [gallery, setGallery] = useState<IPropertyImage[]>([]);
  const [latestVehicles, setLatestVehicles] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { uuid } = useParams();

  useEffect(() => { }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );

  async function getLastVehicles() {
    const latestVehicles = await fetch("/api/cars/latests/", {
      method: "GET",
      cache: "no-store",
    });
    const cars = await latestVehicles.json();

    if (cars.length !== 0) {
      setLatestVehicles(cars);
      console.log(cars);
    }
    return latestVehicles;
  }

  useEffect(() => {
    getLastVehicles();
    //fetch 10 lastest vehicles
  }, []);

  useEffect(() => {
    console.log(current);
  }, [current]);

  async function getCarData(uuid: string) {
    try {
      // get vehicle data
      const carsFetch = await fetch(`/api/cars/${uuid}`, {
        method: "GET",
        cache: "no-store",
      });
      const cars = await carsFetch.json();
      setVehicleData(cars);
      // get vehicle gallery
      const galleryFetch = await fetch(`/api/gallery/${uuid}`, {
        method: "GET",
        cache: "no-store",
      });
      const gallery = await galleryFetch.json();
      setGallery(gallery);
      setLoading(false);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    if (vehicleData?.name !== "") {
      document.title = `${vehicleData?.name} | Distrito Automotor`;
    }
  }, [vehicleData]);

  useEffect(() => {
    getCarData(uuid as string);
  }, [uuid]);

  return (
    <>
      {loading && <LoaderFullscreen />}
      {/* HEADER SEPARATOR */}
      <div className="w-full h-16 md:h-28"></div>

      {/* BREADCRUMBS */}
      <div className="w-full px-6 pt-5 pb-5 md:px-24 2xl:px-64 h-fit">
        <Breadcrumbs name={vehicleData?.name} />
      </div>

      <div className="w-full px-6 py-0 md:py-2 md:px-24 2xl:px-64 h-fit">
        <div className="flex flex-col-reverse gap-6 md:flex-row md:gap-20">
          {/* vehicle details */}
          <div className="w-full md:w-2/3">
            {/* title, price and description */}
            <div className="flex flex-col gap-4 md:gap-7">
              <div className="flex flex-col gap-5">
                <h4 className="text-2xl font-semibold md:text-3xl">
                  {vehicleData?.name}
                </h4>
                <div className="flex gap-1 ">
                  <FaLocationDot style={{ color: "red" }} size={16} />
                  <span
                    //style={{ color: "#a1a1aa" }}
                    className="text-sm leading-4 font-medium text-gray-700"
                  >
                    {vehicleData?.address}, {vehicleData?.neighborhood}, {vehicleData?.city}
                  </span>
                </div>
              </div>

              
                <span className="text-2xl mt-2 font-semibold md:mb-2">
                  {vehicleData?.currency} ${vehicleData?.price}{" "}
                </span>
              {/* vehicle data */}
              <Card className="flex py-3 px-4 flex-wrap justify-between  gap-y-4 gap-x-8 ">
                <div className="flex items-center gap-2 w-fit h-fit">
                  <Maximize2 size={20} color="red" />
                  <span className="text-sm">{vehicleData?.metersSquare} m² totales</span>
                </div>
                <div className="flex items-center gap-2 w-fit h-fit">
                  <FaBed size={20} color="red" />
                  <span className="text-sm"> {vehicleData?.dormitorios} dormitorios</span>
                </div>
                <div className="flex items-center gap-2 w-fit h-fit">
                  <DoorOpen size={20} color="red" />
                  <span className="text-sm"> {vehicleData?.rooms} ambientes</span>
                </div>
                <div className="flex items-center gap-2 w-fit h-fit">
                  <Bath size={20} color="red" />
                  <span className="text-sm"> {vehicleData?.bathrooms} baños</span>
                </div>

              </Card>
              <div className="w-full mt-0 h-fit">
                <pre
                  style={{ font: "inherit", fontSize: '13px', textWrap: "wrap" }}
                  className="w-full mt-3 mb-2 text-gray-500 md:mt-0"
                >
                  {vehicleData?.description}
                </pre>
              </div>


              <Card className="gap-3 px-4 flex flex-col  py-3">
                <span className="text-lg font-semibold">Más detalles <Separator
                  style={{ height: "2px" }}
                  className=" bg-red-800 w-6 sm:my-0"
                /></span>
                <div className="grid grid-cols-3 gap-3 justify-around">
                  <div className="flex flex-col col-span-1">
                    <span className="font-semibold text-xs md:text-sm">Tipo de propiedad</span>
                    <span className="text-xs md:text-sm">{vehicleData?.propertyType}</span>
                  </div>
                  <div className="flex flex-col col-span-1">
                    <span className="font-semibold text-xs md:text-sm">Superficie total</span>
                    <span className="text-xs md:text-sm">{vehicleData?.metersSquare} m²</span>
                  </div>
                  <div className="flex flex-col col-span-1">
                    <span className="font-semibold text-xs md:text-sm">Superficie cubierta</span>
                    <span className="text-xs md:text-sm">{vehicleData?.coveredMetersSquare} m²</span>
                  </div>
                  <div className="flex flex-col col-span-1">
                    <span className="font-semibold text-xs md:text-sm">Plantas</span>
                    <span className="text-xs md:text-sm">{vehicleData?.floors} plantas</span>
                  </div>
                  <div className="flex flex-col col-span-1">
                    <span className="font-semibold text-xs md:text-sm">Garage</span>
                    <span className="text-xs md:text-sm">{vehicleData?.garageCarsQuantity} vehículos</span>
                  </div>
                  <div className="flex flex-col col-span-1">
                    <span className="font-semibold text-xs md:text-sm">Baños</span>
                    <span className="text-xs md:text-sm">{vehicleData?.bathrooms}</span>
                  </div>
                  <div className="flex flex-col col-span-1">
                    <span className="font-semibold text-xs md:text-sm">Expensas</span>
                    <span className="text-xs md:text-sm">{vehicleData?.expensas} </span>
                  </div>
                  <div className="flex flex-col col-span-1">
                    <span className="font-semibold text-xs md:text-sm">Antiguedad</span>
                    <span className="text-xs md:text-sm">{vehicleData?.antiquity} </span>
                  </div>
                </div>
              </Card>

              <Button className="bg-red-800 w-full md:w-fit mt-0 md:mt-5 text-white">
                Consultar por la propiedad
              </Button>
            </div>

          </div>

          {/* carousel */}
          <div className="relative w-full md:w-3/5 aspect-square ">
            {/* <Image src={car} alt="" className="w-full" width={500} height={500} /> */}
            <div className="relative">
              {/* Carousel */}
              <Carousel
                setApi={setApi}
                className="relative w-full h-full overflow-hidden rounded-lg aspect-square "
                onMouseEnter={plugin.current.stop}
                plugins={[plugin.current as any]}
                opts={{
                  align: "start",
                  loop: true,
                }}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="h-full">
                  {gallery.map((image) => (
                    <CarouselItem
                      key={image.uuid}
                      className="w-full h-full overflow-hidden rounded-md "
                    >
                      <Image
                        src={image.path}
                        alt={`Imagen `}
                        width={500}
                        objectFit="cover"
                        height={500}
                        unoptimized
                        className="object-cover w-full h-full my-auto rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Custom Indicators */}
              <div className="absolute left-0 right-0 flex justify-center space-x-2 bottom-4">
                {gallery.map((dot, index) => (
                  <button
                    key={dot.uuid}
                    className={`w-2 h-2 rounded-full ${index + 1 === current ? "bg-black" : "bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <RelatedVehicles vehicles={latestVehicles} />
    </>
  );
};

export default VehicleCont;
