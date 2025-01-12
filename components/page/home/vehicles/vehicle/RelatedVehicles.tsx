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
import EmblaCarousel, { EmblaPluginType } from "embla-carousel";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBed, FaRegCalendar } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { FaLocationDot } from "react-icons/fa6";
import { Bath, DoorOpen, Maximize2 } from "lucide-react";
import { IProperty } from "@/app/models/property";

interface Props {
  vehicles: IProperty[];
}

const RelatedVehicles = ({ vehicles }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [latestVehicles, setLatestVehicles] = useState<IProperty[]>([]);
  const [current, setCurrent] = useState(0);
  const router = useRouter();

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
    setLatestVehicles(vehicles);
  }, [vehicles]);

  useEffect(() => {
    console.log(latestVehicles);
  }, [latestVehicles]);

  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );

  return (
    <>
      <section className="flex flex-col justify-center w-full gap-7 py-20 md:py-44 align-middle md:gap-8">
        <motion.header
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: "some", once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex flex-col items-start justify-center w-full px-6 sm:items-center"
        >
          <div className="flex flex-col ">
            <h4 className="text-xl font-bold sm:text-2xl">
              Propiedades que podrían interesarte
            </h4>
            <Separator
              style={{ height: "2px" }}
              className="my-1 bg-red-800 w-6 sm:my-0"
            />
          </div>
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
                {latestVehicles.map((property) => (
                  <CarouselItem
                    key={property._id}
                    className="px-5 xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1 md:h-full h-fit">
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
                            <CardTitle className="text-base sm:text-sm textCut pb-1">
                              {property.name}
                            </CardTitle>
                            <Separator />
                            <p
                              style={{ color: "#a1a1aa" }}
                              className="flex py-1 items-center gap-1 text-xs "
                            >
                              <FaLocationDot size={13} /> {property.neighborhood}, {property.city}
                            </p>
                            <Separator />
                            <CardDescription className="flex items-center h-fit flex-wrap gap-y-2 justify-between w-full pt-2 pb-2 ">
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

                              <p className="text-lg font-semibold">
                                {property.currency} ${property.price}
                              </p>
                            </div>
                          </CardHeader>
                          <CardFooter className=" gap-3 w-full px-4 pb-5 mt-2 md:mt-0">
                            <Link
                              href={`/properties/${property._id}`}
                              className="w-full h-fit"
                            >
                              <Button
                                variant={"default"}
                                className="w-full text-xs md:text-xs 2xl:text-xs hover:bg-red-900 bg-red-800 text-white"
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
          {/* Custom Indicators */}
          <div className="flex justify-center mt-6 space-x-2 md:mt-10">
            {latestVehicles.map((dot, index) => (
              <button
                key={dot._id}
                className={`w-2 h-2 rounded-full ${index === current ? "bg-black" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center w-full mt-4 h-fit">
          <Button
            onClick={() => router.push("/vehicles")}
            className="bg-red-800 text-sm px-7 text-white hover:bg-red-900"
          >
            Volver a vehículos
          </Button>{" "}
        </div>
      </section>
    </>
  );
};

export default RelatedVehicles;
