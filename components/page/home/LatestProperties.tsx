"use client";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import stylesSearch from "@/app/css-modules/home.search.module.css";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaBed, FaRegCalendar } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { IProperty } from "@/app/models/property";
import { FaLocationDot } from "react-icons/fa6";
import { Bath, DoorOpen, House, Maximize2, Scan } from "lucide-react";

interface Props {
  properties: IProperty[];
}

const LatestProperties = ({ properties }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [latestProperties, setLatestProperties] = useState<IProperty[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    setLatestProperties(properties);
  }, [properties]);

  useEffect(() => {
    console.log(latestProperties);
  }, [latestProperties]);

  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );

  return (
    <>
      <section className="flex flex-col justify-center w-full gap-8 my-8 align-middle h-fit xl:h-screen md:gap-8 2xl:gap-12 md:my-14 2xl:my-0">
        <motion.header
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: "some", once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex flex-col items-start justify-center px-6 overflow-visible sm:px-16 md:px-32 2xl:px-56 md:overflow-hidden md:hidden"
        >
          <div className="flex flex-col ">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Propiedades seleccionadas
            </h2>
            <Separator
              style={{ height: "2px" }}
              className="my-5 bg-red-800 w-9 sm:my-4"
            />
          </div>
        </motion.header>
        <motion.header
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: "some", once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex-row items-start justify-between hidden w-full px-6 mx-auto md:flex md:max-w-6xl "
        >
          <div className="flex flex-col ">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Propiedades seleccionadas
            </h2>
            <Separator
              style={{ height: "2px" }}
              className="my-5 bg-red-800 w-9 sm:my-4"
            />
          </div>
          {/* <div className="flex justify-center mt-4 w-fit h-fit">
            <Link href={"/properties"} className="w-fit h-fit">
              <button className={`${stylesSearch.button}`}>
                Ver todos los vehículos
              </button>{" "}
            </Link>
          </div> */}
        </motion.header>
        <div className="w-full mx-auto overflow-hidden">
          <motion.div
            className=""
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: "some", once: true }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
          >
            <Carousel
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              setApi={setApi}
              plugins={[plugin.current as any]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full mx-auto md:max-w-6xl"
            >
              <CarouselContent className="w-full mx-auto h-fit sm:pl-0">
                {latestProperties.map((property) => (
                  <CarouselItem
                    key={property._id}
                    className="px-5 xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1 md:h-full h-fit">
                      {/* <Card className="flex unselectable flex-col md:max-h-[400px] max-h-full 2xl:max-h-full  h-full shadow-lg">
                        <Image
                          src={property?.imagePath!}
                          alt="auto"
                          width={500}
                          height={500}
                          unoptimized
                          className="object-cover h-full mb-4 overflow-hidden rounded-t-md md:h-1/2 "
                        />
                        <div className="flex flex-col justify-between w-full h-full md:h-1/2">
                          <CardHeader style={{ padding: "0 16px 0px 16px" }}>
                            <CardTitle className="text-lg md:text-base 2xl:text-lg textCut ">
                              {property.name}
                            </CardTitle>
                            <CardDescription className="flex items-center justify-between w-full pt-1 pb-2 ">
                              <div className="flex items-center gap-2">
                                <FaRegCalendar /> <span>{property.year}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <IoSpeedometerOutline size={20} />
                                <span> {property.kilometers} km</span>
                              </div>
                            </CardDescription>
                            <p className="text-lg font-semibold md:text-base 2xl:text-lg">
                              {property.currency} ${property.price}
                            </p>
                          </CardHeader>
                          <CardFooter className="px-4 pb-5 mt-5 md:mt-0">
                            <Link
                              href={`/properties/${property.uuid}`}
                              className="w-full h-fit"
                            >
                              <Button
                                variant={"default"}
                                className="w-full text-lg md:text-xs 2xl:text-lg"
                              >
                                Ver más
                              </Button>
                            </Link>
                          </CardFooter>
                        </div>
                      </Card> */}
                      <Card
                        key={property._id}
                        className="flex unselectable flex-col md:max-h-[500px] max-h-fit 2xl:max-h-fit  h-fit shadow-lg"
                      >
                        <Image
                          src={property.imagePath!}
                          alt=""
                          unoptimized
                          width={500}
                          height={500}
                          className="object-cover h-full mb-4 overflow-hidden md:h-1/2 rounded-t-md "
                        />
                        <div className="flex flex-col justify-between w-full h-fit md:h-1/2">
                          <CardHeader style={{ padding: "0 16px 10px 16px" }}>
                            <CardTitle className="pb-1 text-base sm:text-base textCut">
                              {property.name}
                            </CardTitle>
                            <Separator />
                            <p
                              style={{ color: "#a1a1aa" }}
                              className="flex items-center gap-1 py-1 text-xs "
                            >
                              <FaLocationDot size={13} /> {property.neighborhood}, {property.city}
                            </p>
                            <Separator />
                            <CardDescription className="flex flex-wrap items-center justify-between w-full pt-2 pb-2 h-fit gap-y-2 ">
                              <div className="flex items-center gap-1">
                                <Maximize2 size={14} />
                                <span className="text-xs">{property.metersSquare} m² </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FaBed size={16} />
                                <span className="text-xs"> {property.dormitorios} dormitorios</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DoorOpen size={17} />
                                <span className="text-xs"> {property.rooms} ambientes</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Bath size={17} />
                                <span className="text-xs"> {property.bathrooms} baños</span>
                              </div>
                            </CardDescription>
                            <Separator />

                            <div className="flex flex-col gap-5 pt-2 pb-2">

                              <p className="text-base font-semibold">
                                {property.currency} ${property.price}
                              </p>
                            </div>
                          </CardHeader>
                          <CardFooter className="w-full gap-3 px-4 pb-5 mt-2 md:mt-0">
                            <Link
                              href={`/properties/${property._id}`}
                              className="w-full h-fit"
                            >
                              <Button
                                variant={"default"}
                                className="w-full text-xs text-white bg-red-800 hover:bg-red-900 md:text-xs 2xl:text-xs"
                              >
                                Ver más
                              </Button>
                            </Link>
                          </CardFooter>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
          {/* <div className="flex gap-3 ">
            <Button onClick={() => api?.scrollTo(current - 1)}>-</Button>
            <Button onClick={() => api?.scrollTo(current + 1)}>+</Button>
          </div> */}
        </div>
        {/* Custom Indicators */}
        <div className="flex justify-center space-x-2 ">
          {latestProperties.map((dot, index) => (
            <button
              key={dot._id}
              className={`w-2 h-2 rounded-full ${index === current ? "bg-black" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
        <div className="flex justify-center w-full mt-4 h-fit">
          <Link className="w-fit h-fit" href={"/properties"}>
            <Button className="text-xs text-white bg-red-800 md:text-sm hover:bg-red-900">
              Ver todas las propiedades
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default LatestProperties;
