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
import noimage from "@/public/noimage.jpg";

interface Props {
  properties: IProperty[];
}

const RelatedProperties = ({ properties }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [latestProperties, setLatestProperties] = useState<IProperty[]>([]);
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
    setLatestProperties(properties);
  }, [properties]);

  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );

  return (
    <>
      <section className="flex flex-col justify-center w-full py-20 align-middle gap-7 md:py-44 md:gap-8">
        <motion.header
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: "some", once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex flex-col items-start justify-center w-full px-6 sm:items-center"
        >
          <div className="flex flex-col ">
            <h4 className="text-2xl font-bold sm:text-3xl">
              Propiedades Relacionadas
            </h4>
            <Separator
              style={{ height: "2px", backgroundColor: "#1C4D8D" }}
              className="my-2 w-9 sm:my-3"
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
                loop: false,
              }}
              className="w-full mx-auto md:flex sm:px-10 md:px-28 2xl:px-52"
            >
              <CarouselContent className="w-full mx-auto h-fit sm:pl-0">
                {latestProperties?.map((property) => (
                  <CarouselItem
                    key={property._id}
                    className="px-5 xs:basis-1/2 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/3 2xl:basis-1/3"
                  >
                    {/* Make the item a consistent height and use full card height so all cards align */}
                    <div className="h-full p-1">
                      <Card
                        key={property._id}
                        className="flex unselectable flex-col min-h-[420px] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[560px] xl:min-h-[520px] 2xl:min-h-[480px] shadow-lg overflow-hidden"
                      >
                        {/* Image wrapper with fixed aspect height; Image uses fill to cover */}
                        <div className="relative w-full h-56 mb-4 overflow-hidden sm:h-64 md:h-72 lg:h-72 xl:h-64 2xl:h-72 rounded-t-md sm:mb-5">
                          {property?.imagePath === '' ? (<>
                            <Image
                              src={noimage}
                              alt=""
                              unoptimized
                              width={500}
                              height={500}
                              className="object-cover h-full mb-4 overflow-hidden select-none rounded-t-md "
                            />
                          </>) : (<>  <Image
                            src={property.imagePath!}
                            alt={property.name ?? "property image"}
                            unoptimized
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          /></>)}
                        </div>
                        {/* Use h-full so the footer pushes to the bottom consistently */}
                        <div className="flex flex-col justify-start w-full h-fit md:justify-between md:h-full">
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
                            <CardDescription className="flex flex-wrap items-center justify-between w-full pt-2 pb-2 h-fit gap-y-2 gap-x-2">
                              {/* {property.metersSquare && (<>
                                <div className="flex items-center gap-1">
                                  <Maximize2 size={14} />
                                  <span className="text-xs">{property.metersSquare} m² </span>
                                </div>
                              </>)}

                              {property.metersSquare && (<>
                                <div className="flex items-center gap-1">
                                  <FaBed size={16} />
                                  <span className="text-xs"> {property.dormitorios} dormitorios</span>
                                </div>
                              </>)}

                              {property.metersSquare && (<>

                                <div className="flex items-center gap-1">
                                  <DoorOpen size={17} />
                                  <span className="text-xs"> {property.rooms} ambientes</span>
                                </div>
                              </>)}

                              {property.metersSquare && (<>

                                <div className="flex items-center gap-1">
                                  <Bath size={17} />
                                  <span className="text-xs"> {property.bathrooms} baños</span>
                                </div>
                              </>)} */}

                              <div className="flex items-center gap-1">
                                <Maximize2 size={14} />
                                {property.metersSquare ?
                                  (<span className="text-xs">{property.metersSquare} m² </span>)
                                  :
                                  (<span className="text-xs">No especif.</span>)}
                              </div>

                              <div className="flex items-center gap-1">
                                <FaBed size={16} />
                                {property.dormitorios ?
                                  (<span className="text-xs"> {property.dormitorios} dormitorios</span>)
                                  :
                                  (<span className="text-xs"> No especif.</span>)}
                              </div>

                              <div className="flex items-center gap-1">
                                <DoorOpen size={17} />
                                {property.rooms ?
                                  (<span className="text-xs"> {property.rooms} ambientes</span>)
                                  :
                                  (<span className="text-xs"> No especif.</span>)}
                              </div>

                              <div className="flex items-center gap-1">
                                <Bath size={17} />
                                {property.bathrooms ?
                                  (<span className="text-xs"> {property.bathrooms} baños</span>)
                                  :
                                  (<span className="text-xs"> No especif.</span>)}
                              </div>

                            </CardDescription>

                            <Separator />

                            <div className="flex flex-col gap-2 pt-2 pb-2">

                              <p className="m-0 text-base font-semibold">
                                {property.currency} ${property.price.toLocaleString()}
                              </p>
                            </div>
                          </CardHeader>
                          <CardFooter className="w-full gap-3 px-4 pb-3 mt-1 md:mt-0">
                            <Link
                              href={`/properties/${property._id}`}
                              className="w-full h-fit"
                            >
                              <Button
                                variant={"default"}
                                style={{ backgroundColor: "#1C4D8D" }}
                                className="w-full text-xs text-white md:text-xs 2xl:text-xs"
                              >
                                Ver propiedad
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
        </div >
        {/* Custom Indicators */}
        <div className="flex justify-center space-x-2 " >
          {
            latestProperties.map((dot, index) => (
              <button
                key={dot._id}
                className={`w-2 h-2 rounded-full ${index === current ? "bg-black" : "bg-gray-300"
                  }`}
              />
            ))
          }
        </div>
        <div className="flex justify-center w-full mt-4 h-fit">
          <Link className="w-fit h-fit" href={"/properties"}>
            <Button className="text-xs text-white md:text-sm " style={{ backgroundColor: "#1C4D8D" }}>
              Ver todas las propiedades
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default RelatedProperties;
