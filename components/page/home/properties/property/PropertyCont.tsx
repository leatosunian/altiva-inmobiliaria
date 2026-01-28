"use client";

import noimage from "@/public/noimage.jpg";
import Breadcrumbs from "@/components/page/home/properties/property/Breadcrumbs";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useParams } from "next/navigation";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import RelatedProperties from "@/components/page/home/properties/property/RelatedProperties";
import LoaderFullscreen from "@/components/page/LoaderFullscreen";
import { FaBed, FaLocationDot } from "react-icons/fa6";
import { IProperty } from "@/app/models/property";
import { IPropertyImage } from "@/app/models/propertyimage";
import { Bath, DoorOpen, Maximize2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { usePageLoader } from "@/app/utils/usePageLoader";

const PropertyCont = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [apiMobile, setApiMobile] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [propertyData, setPropertyData] = useState<IProperty>();
  const [gallery, setGallery] = useState<IPropertyImage[]>([]);
  const [latestProperties, setLatestVehicles] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { uuid } = useParams();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // contact form states
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [dataReady, setDataReady] = useState(false);
  const pageReady = usePageLoader();

  const isLoading = !dataReady || !pageReady;

  // inicializar mensaje de formulario cuando cargue la propiedad
  useEffect(() => {
    if (!propertyData) return;

    setMessage(
      `Estoy interesado en la propiedad "${propertyData.name} ubicado en ${propertyData.address}" y me gustaría obtener más información.`
    );
  }, [propertyData]);

  function sendWhatsAppMessage() {
    if (!fullname || !phone || !message) {
      toast({
        description: "Por favor, completá todos los campos del formulario.",
        variant: "destructive",
      });
      return;
    }

    const text = encodeURIComponent(
      `Buenas!, mi nombre es ${fullname}. ${message}`
    );

    const url = `https://wa.me/${phone}?text=${text}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );

  async function getLastProperties() {
    const latestProperties = await fetch("/api/properties/latests/", {
      method: "GET",
      cache: "no-store",
    });
    const property = await latestProperties.json();

    if (property.length !== 0) {
      setLatestVehicles(property);
    }
    return latestProperties;
  }

  async function getPropertyData(uuid: string) {
    try {
      // get property data
      const propertyFetch = await fetch(`/api/properties/${uuid}`, {
        method: "GET",
        cache: "no-store",
      });
      const property = await propertyFetch.json();
      setPropertyData(property);
      // get property gallery
      const galleryFetch = await fetch(`/api/gallery/${uuid}`, {
        method: "GET",
        cache: "no-store",
      });
      const gallery = await galleryFetch.json();
      console.log("gallery", gallery);
      setGallery(gallery);
      setDataReady(true);
    } catch (error) {
      return;
    }
  }

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

    useEffect(() => {
    if (!apiMobile) {
      return;
    }

    setCount(apiMobile.scrollSnapList().length);
    setCurrent(apiMobile.selectedScrollSnap() + 1);

    apiMobile.on("select", () => {
      setCurrent(apiMobile.selectedScrollSnap() + 1);
    });
  }, [apiMobile]);

  // fetch 10 lastest properties
  useEffect(() => {
    getLastProperties();
  }, []);

  // change tab title
  useEffect(() => {
    if (propertyData?.name !== "") {
      document.title = `${propertyData?.name} | Altiva Propiedades `;
    }
  }, [propertyData]);

  // fetch property data
  useEffect(() => {
    getPropertyData(uuid as string);
  }, [uuid]);

  return (
    <>
      <LoaderFullscreen isVisible={isLoading} />

      <div className={isLoading ? "opacity-0" : "opacity-100"}>

        {/* HEADER SEPARATOR */}
        <div className="w-full h-16 md:h-28"></div>

        {/* BREADCRUMBS */}
        <div className="w-full px-6 pb-0 md:pb-5 md:pt-0 pt-9 md:px-24 2xl:px-64 h-fit">
          <Breadcrumbs name={propertyData?.name} />
        </div>

        {/* DESKTOP */}
        <div className="hidden w-full px-6 py-0 md:py-2 md:px-24 2xl:px-64 h-fit md:block">
          <Card className="flex flex-col-reverse gap-6 p-6 shadow-lg md:flex-row md:gap-10 2xl:gap-14">

            {/* property details */}
            <div className="w-full md:w-1/2">
              {/* title, price and description */}
              <div className="flex flex-col gap-4 md:gap-7">
                <div className="flex flex-col gap-5">
                  <h4 className="text-2xl font-semibold md:text-3xl">
                    {propertyData?.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <FaLocationDot style={{ color: "#1C4D8D" }} size={18} />
                    <span
                      //style={{ color: "#a1a1aa" }}
                      className="text-sm font-medium leading-4 text-gray-700 md:text-lg"
                    >
                      {propertyData?.address}, {propertyData?.neighborhood}, {propertyData?.city}
                    </span>
                  </div>
                </div>


                <div>
                  <span className="text-2xl font-semibold ">
                    {propertyData?.currency === "USD" && propertyData?.currency} ${propertyData?.price.toLocaleString()}
                  </span>
                  {propertyData?.expensas !== null && propertyData?.expensas !== undefined && propertyData?.expensas !== 0 && (
                    <span className="ml-2 text-sm font-medium text-gray-500">
                      (Expensas: ${propertyData?.expensas.toLocaleString()})
                    </span>)}
                </div>


                {/* property data */}
                <Card className="flex flex-wrap justify-between px-4 py-3 shadow-md gap-y-4 gap-x-8" style={{ backgroundColor: "#1C4D8D" }}>
                  <div className="flex items-center gap-2 w-fit h-fit">
                    <Maximize2 size={20} color="white" />
                    <span className="text-sm text-white">{propertyData?.metersSquare ? `${propertyData.metersSquare} m² totales` : "No especif."}</span>
                  </div>
                  <div className="flex items-center gap-2 w-fit h-fit">
                    <FaBed size={20} color="white" />
                    <span className="text-sm text-white">{propertyData?.dormitorios ? `${propertyData.dormitorios} ${propertyData.dormitorios === 1 ? "dormitorio" : "dormitorios"}` : "No especif."}</span>
                  </div>
                  <div className="flex items-center gap-2 w-fit h-fit">
                    <DoorOpen size={20} color="white" />
                    <span className="text-sm text-white">{propertyData?.rooms ? `${propertyData.rooms} ${propertyData.rooms === 1 ? "ambiente" : "ambientes"}` : "No especif."}</span>
                  </div>
                  <div className="flex items-center gap-2 w-fit h-fit">
                    <Bath size={20} color="white" />
                    <span className="text-sm text-white">{propertyData?.bathrooms ? `${propertyData.bathrooms} ${propertyData.bathrooms === 1 ? "baño" : "baños"}` : "No especif."}</span>
                  </div>
                </Card>

                {/* description */}
                <div className="w-full mt-0 h-fit">
                  <pre
                    style={{ font: "inherit", fontSize: '13px', textWrap: "wrap" }}
                    className="w-full mt-3 mb-2 text-gray-500 md:mt-0"
                  >
                    {propertyData?.description}
                  </pre>
                </div>

                {/* all property details */}
                <Card className="flex flex-col gap-5 px-5 pt-4 pb-5 shadow-md">

                  {/* INFORMACIÓN GENERAL */}
                  <div className="flex flex-col gap-3">
                    <span className="text-lg font-semibold">
                      Información general
                      <Separator
                        style={{ height: "2px", backgroundColor: "#1C4D8D" }}
                        className="w-6 sm:my-0"
                      />
                    </span>

                    <div className="grid justify-around grid-cols-3 gap-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Tipo de propiedad</span>
                        <span className="text-xs md:text-sm">{propertyData?.propertyType}</span>
                      </div>

                      {propertyData?.propertyType === "Departamento" && (
                        <>
                          {propertyData?.floors !== null && propertyData?.floors !== undefined && (
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold md:text-sm">N° de Piso</span>
                              <span className="text-xs md:text-sm">Piso {propertyData?.floors}</span>
                            </div>
                          )}
                          {propertyData?.expensas !== null && propertyData?.expensas !== undefined && (
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold md:text-sm">Expensas</span>
                              <span className="text-xs md:text-sm">${propertyData?.expensas.toLocaleString()}</span>
                            </div>
                          )}
                          {propertyData.disposition !== "" && (
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold md:text-sm">Disposición</span>
                              <span className="text-xs md:text-sm">{propertyData?.disposition}</span>
                            </div>
                          )}
                        </>
                      )}

                      {propertyData?.antiquity && (
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold md:text-sm">Antigüedad</span>
                          <span className="text-xs md:text-sm">{propertyData?.antiquity} años</span>
                        </div>
                      )}

                      {propertyData?.infrastructureStatus != "" && (
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold md:text-sm">Estado del inmueble</span>
                          <span className="text-xs md:text-sm">{propertyData?.infrastructureStatus}</span>
                        </div>
                      )}

                      {propertyData?.luminocity != "" && (
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold md:text-sm">Luminosidad</span>
                          <span className="text-xs md:text-sm">{propertyData?.luminocity}</span>
                        </div>
                      )}


                    </div>
                  </div>

                  <Separator />

                  {/* SUPERFICIES */}
                  <div className="flex flex-col gap-3">
                    <span className="text-lg font-semibold">
                      Superficies
                      <Separator
                        style={{ height: "2px", backgroundColor: "#1C4D8D" }}
                        className="w-6 sm:my-0"
                      />
                    </span>

                    <div className="grid justify-around grid-cols-3 gap-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Superficie total</span>
                        <span className="text-xs md:text-sm">
                          {propertyData?.metersSquare ? `${propertyData?.metersSquare} m²` : "No especif."}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Superficie cubierta</span>
                        <span className="text-xs md:text-sm">
                          {propertyData?.uncoveredMetersSquare ? `${propertyData?.coveredMetersSquare} m²` : "No especif."}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Superficie descubierta</span>
                        <span className="text-xs md:text-sm">
                          {propertyData?.uncoveredMetersSquare ? `${propertyData?.uncoveredMetersSquare} m²` : "No especif."}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* AMBIENTES Y DISTRIBUCIÓN */}
                  <div className="flex flex-col gap-3">
                    <span className="text-lg font-semibold">
                      Ambientes y distribución
                      <Separator
                        style={{ height: "2px", backgroundColor: "#1C4D8D" }}

                        className="w-6 sm:my-0"
                      />
                    </span>

                    <div className="grid justify-around grid-cols-3 gap-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Ambientes</span>
                        <span className="text-xs md:text-sm">{propertyData?.rooms ? `${propertyData?.rooms}` : "No especif."}</span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Dormitorios</span>
                        <span className="text-xs md:text-sm">{propertyData?.dormitorios ? `${propertyData?.dormitorios}` : "No especif."}</span>

                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Baños</span>
                        <span className="text-xs md:text-sm">
                          {propertyData?.bathrooms ? `${propertyData?.bathrooms}` : "No especif."}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Garage</span>
                        <span className="text-sm">{propertyData?.garageCarsQuantity ? `${propertyData.garageCarsQuantity} ${propertyData.garageCarsQuantity === 1 ? "vehículo" : "vehículos"}` : "No especif."}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* COMODIDADES */}
                  <div className="flex flex-col gap-3">
                    <span className="text-lg font-semibold">Comodidades
                      <Separator
                        style={{ height: "2px", backgroundColor: "#1C4D8D" }}
                        className="w-6 sm:my-0"
                      />
                    </span>
                    <div className="grid justify-around grid-cols-4 gap-3">
                      {propertyData?.hasElevator !== undefined && (
                        <div className="flex flex-col col-span-1">
                          <span className="text-xs font-semibold md:text-sm">Ascensor</span>
                          <span className="text-xs md:text-sm">{propertyData?.hasElevator ? "Sí" : "No"}</span>
                        </div>
                      )}
                      {propertyData?.calefaction && (
                        <div className="flex flex-col col-span-1">
                          <span className="text-xs font-semibold md:text-sm">Calefacción</span>
                          <span className="text-xs md:text-sm">{propertyData?.calefaction}</span>
                        </div>
                      )}
                      {propertyData?.hasPatio !== undefined && (
                        <div className="flex flex-col col-span-1">
                          <span className="text-xs font-semibold md:text-sm">Patio</span>
                          <span className="text-xs md:text-sm">{propertyData?.hasPatio ? "Sí" : "No"}</span>
                        </div>
                      )}
                      {propertyData?.hasPool !== undefined && (
                        <div className="flex flex-col col-span-1">
                          <span className="text-xs font-semibold md:text-sm">Pileta</span>
                          <span className="text-xs md:text-sm">{propertyData?.hasPool ? "Sí" : "No"}</span>
                        </div>
                      )}
                      {propertyData?.hasQuincho !== undefined && (
                        <div className="flex flex-col col-span-1">
                          <span className="text-xs font-semibold md:text-sm">Quincho</span>
                          <span className="text-xs md:text-sm">{propertyData?.hasQuincho ? "Sí" : "No"}</span>
                        </div>
                      )}
                      {propertyData?.hasTerrace !== undefined && (
                        <div className="flex flex-col col-span-1">
                          <span className="text-xs font-semibold md:text-sm">Terraza</span>
                          <span className="text-xs md:text-sm">{propertyData?.hasTerrace ? "Sí" : "No"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>


              </div>
            </div>

            {/* carousel desktop */}
            <div className="relative w-full md:w-1/2 aspect-square asd">
              {/* <Image src={car} alt="" className="w-full" width={500} height={500} /> */}
              <div className="relative">
                {/* Carousel */}
                {gallery.length > 0 ? (
                  <>
                    <Carousel
                      setApi={setApi}
                      className="relative w-full h-full overflow-hidden rounded-lg aspect-square "
                      //onMouseEnter={plugin.current.stop}
                      //plugins={[plugin.current as any]}
                      opts={{
                        align: "start",
                        loop: true,
                        startIndex: galleryIndex
                      }}
                    //onMouseLeave={plugin.current.reset}
                    >
                      <CarouselContent className="h-full">
                        <CarouselItem
                          className="w-full h-full overflow-hidden rounded-md "
                        >

                          <Image
                            src={propertyData?.imagePath!}
                            alt={`Imagen `}
                            width={500}
                            objectFit="cover"
                            onClick={() => {
                              setGalleryIndex(0);
                              setIsOpen(true);
                              console.log("clicked image");
                            }}
                            height={500}
                            unoptimized
                            className="object-cover w-full h-full my-auto rounded-lg"
                          />
                        </CarouselItem>
                        {gallery.map((image, index) => (
                          <CarouselItem
                            key={image.uuid}
                            className="w-full h-full overflow-hidden rounded-md "
                          >
                            {/* <Zoom> */}
                            <Image
                              src={image.path}
                              alt={`Imagen `}
                              width={500}
                              objectFit="cover"
                              height={500}
                              unoptimized
                              onClick={() => { setGalleryIndex(index + 1); setIsOpen(true) }}
                              className="object-cover w-full h-full my-auto rounded-lg"
                            />
                            {/* </Zoom> */}
                          </CarouselItem>
                        ))}
                      </CarouselContent>

                    </Carousel></>) : (<Image
                      src={noimage}
                      alt=""
                      unoptimized
                      width={500}
                      height={500}
                      className="object-cover w-full h-full my-auto rounded-lg "
                    />)}



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

              <Card className="hidden w-full mt-10 md:block">
                <CardHeader>
                  <CardTitle>Consultar por la propiedad</CardTitle>
                  <CardDescription>
                    Completá tus datos y comentanos tu consulta
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullname">Nombre completo</Label>
                        <Input
                          id="fullname"
                          type="text"
                          placeholder="Agustín Pérez"
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="5491112345678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={sendWhatsAppMessage}
                    type="button"
                    style={{ backgroundColor: "#1C4D8D" }}
                    className="w-full text-white "
                  >
                    Enviar consulta
                  </Button>
                </CardFooter>
              </Card>

            </div>
            {/* carousel desktop */}

          </Card>


        </div>

        {/* MOBILE */}
        <div className="block w-full px-0 py-0 md:hidden md:py-2 md:px-24 2xl:px-64 h-fit">
          <div className="flex flex-col-reverse gap-6 p-6 shadow-lg md:flex-row md:gap-10 2xl:gap-14">

            {/* property details */}
            <div className="w-full md:w-1/2">
              {/* title, price and description */}
              <div className="flex flex-col gap-4 md:gap-7">
                <div className="flex flex-col gap-5">
                  <h4 className="text-2xl font-semibold md:text-3xl">
                    {propertyData?.name}
                  </h4>
                  <div className="flex gap-1 ">
                    <FaLocationDot style={{ color: "#1C4D8D" }} size={16} />
                    <span
                      //style={{ color: "#a1a1aa" }}
                      className="text-sm font-medium leading-4 text-gray-700"
                    >
                      {propertyData?.address}, {propertyData?.neighborhood}, {propertyData?.city}
                    </span>
                  </div>
                </div>


                <span className="text-2xl font-semibold ">
                  {propertyData?.currency === "USD" && propertyData?.currency} ${propertyData?.price.toLocaleString()}
                </span>


                {/* property data */}
                <Card className="flex flex-wrap justify-between px-4 py-3 shadow-md gap-y-4 gap-x-8" style={{ backgroundColor: "#1C4D8D" }}>
                  <div className="flex items-center gap-2 w-fit h-fit">
                    <Maximize2 size={20} color="white" />
                    <span className="text-sm text-white">{propertyData?.metersSquare} m² totales</span>
                  </div>
                  <div className="flex items-center gap-2 w-fit h-fit">
                    <FaBed size={20} color="white" />
                    <span className="text-sm text-white"> {propertyData?.dormitorios} dormitorios</span>
                  </div>
                  <div className="flex items-center gap-2 w-fit h-fit">
                    <DoorOpen size={20} color="white" />
                    <span className="text-sm text-white"> {propertyData?.rooms} ambientes</span>
                  </div>
                  <div className="flex items-center gap-2 w-fit h-fit">
                    <Bath size={20} color="white" />
                    <span className="text-sm text-white"> {propertyData?.bathrooms} baños</span>
                  </div>
                </Card>
                <div className="w-full mt-0 h-fit">
                  <pre
                    style={{ font: "inherit", fontSize: '13px', textWrap: "wrap" }}
                    className="w-full mt-3 mb-2 text-gray-500 md:mt-0"
                  >
                    {propertyData?.description}
                  </pre>
                </div>


                <Card className="flex flex-col gap-3 px-4 py-3 shadow-md">

                  {/* INFORMACIÓN GENERAL */}
                  <div className="flex flex-col gap-3">
                    <span className="text-lg font-semibold">
                      Información general
                      <Separator
                        style={{ height: "2px", backgroundColor: "#1C4D8D" }}
                        className="w-6"
                      />
                    </span>

                    <div className="grid justify-around grid-cols-3 gap-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Tipo de propiedad</span>
                        <span className="text-xs md:text-sm">{propertyData?.propertyType}</span>
                      </div>

                      {propertyData?.propertyType === "Departamento" && (
                        <>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold md:text-sm">N° de Piso</span>
                            <span className="text-xs md:text-sm">Piso {propertyData?.floors}</span>
                          </div>
                          <div className="flex flex-col">
                            {propertyData?.expensas !== null && propertyData?.expensas !== undefined && (
                              <>
                                <span className="text-xs font-semibold md:text-sm">Expensas</span>
                                <span className="text-xs md:text-sm">${propertyData?.expensas.toLocaleString()}</span>
                              </>
                            )}
                          </div>
                          {propertyData.disposition !== "" && (
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold md:text-sm">Disposición</span>
                              <span className="text-xs md:text-sm">{propertyData?.disposition}</span>
                            </div>
                          )}
                        </>
                      )}

                      {propertyData?.antiquity && (
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold md:text-sm">Antigüedad</span>
                          <span className="text-xs md:text-sm">{propertyData?.antiquity} años</span>
                        </div>
                      )}

                      {propertyData?.infrastructureStatus != "" && (
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold md:text-sm">Estado del inmueble</span>
                          <span className="text-xs md:text-sm">{propertyData?.infrastructureStatus}</span>
                        </div>
                      )}

                      {propertyData?.luminocity != "" && (
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold md:text-sm">Luminosidad</span>
                          <span className="text-xs md:text-sm">{propertyData?.luminocity}</span>
                        </div>
                      )}


                    </div>
                  </div>

                  <Separator />

                  {/* SUPERFICIES */}
                  <div className="flex flex-col gap-3">
                    <span className="text-lg font-semibold">
                      Superficies
                      <Separator
                        style={{ height: "2px", backgroundColor: "#1C4D8D" }}
                        className="w-6 sm:my-0"
                      />
                    </span>

                    <div className="grid justify-around grid-cols-3 gap-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Superficie total</span>
                        <span className="text-xs md:text-sm">
                          {propertyData?.metersSquare ? `${propertyData?.metersSquare} m²` : "No especif."}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Superficie cubierta</span>
                        <span className="text-xs md:text-sm">
                          {propertyData?.uncoveredMetersSquare ? `${propertyData?.coveredMetersSquare} m²` : "No especif."}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Superficie descubierta</span>
                        <span className="text-xs md:text-sm">
                          {propertyData?.uncoveredMetersSquare ? `${propertyData?.uncoveredMetersSquare} m²` : "No especif."}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* AMBIENTES Y DISTRIBUCIÓN */}
                  <div className="flex flex-col gap-3">
                    <span className="text-lg font-semibold">
                      Ambientes y distribución
                      <Separator
                        style={{ height: "2px", backgroundColor: "#1C4D8D" }}
                        className="w-6 sm:my-0"
                      />
                    </span>

                    <div className="grid justify-around grid-cols-3 gap-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Ambientes</span>
                        <span className="text-xs md:text-sm">{propertyData?.rooms ? `${propertyData?.rooms}` : "No especif."}</span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Dormitorios</span>
                        <span className="text-xs md:text-sm">{propertyData?.dormitorios ? `${propertyData?.dormitorios}` : "No especif."}</span>

                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Baños</span>
                        <span className="text-xs md:text-sm">
                          {propertyData?.bathrooms ? `${propertyData?.bathrooms}` : "No especif."}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-semibold md:text-sm">Garage</span>
                        <span className="text-sm">{propertyData?.garageCarsQuantity ? `${propertyData.garageCarsQuantity} ${propertyData.garageCarsQuantity === 1 ? "vehículo" : "vehículos"}` : "No especif."}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* COMODIDADES */}
                  <div className="flex flex-col gap-3">
                    <span className="text-lg font-semibold">Comodidades
                      <Separator
                        style={{ height: "2px", backgroundColor: "#1C4D8D" }}
                        className="w-6"
                      />
                    </span>
                    <div className="grid justify-around grid-cols-4 gap-3">
                      {propertyData?.hasElevator !== undefined && (
                        <div className="flex flex-col col-span-1">
                          <span className="text-xs font-semibold md:text-sm">Ascensor</span>
                          <span className="text-xs md:text-sm">{propertyData?.hasElevator ? "Sí" : "No"}</span>
                        </div>
                      )}
                      {propertyData?.calefaction && (
                        <div className="flex flex-col col-span-1">
                          <span className="text-xs font-semibold md:text-sm">Calefacción</span>
                          <span className="text-xs md:text-sm">{propertyData?.calefaction}</span>
                        </div>
                      )}
                      {propertyData?.hasPatio !== undefined && (
                        <div className="flex flex-col col-span-1">
                          <span className="text-xs font-semibold md:text-sm">Patio</span>
                          <span className="text-xs md:text-sm">{propertyData?.hasPatio ? "Sí" : "No"}</span>
                        </div>
                      )}
                      {propertyData?.hasPool !== undefined && (
                        <div className="flex flex-col col-span-1">
                          <span className="text-xs font-semibold md:text-sm">Pileta</span>
                          <span className="text-xs md:text-sm">{propertyData?.hasPool ? "Sí" : "No"}</span>
                        </div>
                      )}
                      {propertyData?.hasQuincho !== undefined && (
                        <div className="flex flex-col col-span-1">
                          <span className="text-xs font-semibold md:text-sm">Quincho</span>
                          <span className="text-xs md:text-sm">{propertyData?.hasQuincho ? "Sí" : "No"}</span>
                        </div>
                      )}
                      {propertyData?.hasTerrace !== undefined && (
                        <div className="flex flex-col col-span-1">
                          <span className="text-xs font-semibold md:text-sm">Terraza</span>
                          <span className="text-xs md:text-sm">{propertyData?.hasTerrace ? "Sí" : "No"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                {/* FORMULARIO DE CONSULTA ---- MOBILE ---- */}
                <Card className="block w-full mt-10 md:hidden">
                  <CardHeader>
                    <CardTitle>Consultar por la propiedad</CardTitle>
                    <CardDescription>
                      Completá tus datos y comentanos tu consulta
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullname">Nombre completo</Label>
                          <Input
                            id="fullname"
                            type="text"
                            placeholder="Agustín Pérez"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="5491112345678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea
                          id="message"
                          value={message}
                          className="min-h-[200px] "
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      onClick={sendWhatsAppMessage}
                      type="button"
                      style={{ backgroundColor: "#1C4D8D" }}

                      className="w-full text-white "
                    >
                      Enviar consulta
                    </Button>
                  </CardFooter>
                </Card>
              </div>

            </div>

            {/* carousel mobile */}
            <div className="relative w-full md:w-1/2 aspect-square DDD ">
              {/* <Image src={car} alt="" className="w-full" width={500} height={500} /> */}
              <div className="relative">
                {/* Carousel  mobile*/}
                {gallery.length > 0 ? (<>
                  <Carousel
                    setApi={setApiMobile}
                    className="relative w-full h-full overflow-hidden rounded-lg aspect-square "
                    //onMouseEnter={plugin.current.stop}
                    //plugins={[plugin.current as any]}
                    opts={{
                      align: "start",
                      loop: true,
                      startIndex: galleryIndex
                    }}
                  //onMouseLeave={plugin.current.reset}
                  >
                    <CarouselContent className="h-full">
                      <CarouselItem
                        className="w-full h-full overflow-hidden rounded-md "
                      >

                        <Image
                          src={propertyData?.imagePath!}
                          alt={`Imagen `}
                          width={500}
                          objectFit="cover"
                          onClick={() => {
                            setGalleryIndex(0);
                            setIsOpen(true);
                            console.log("clicked image")
                          }}
                          height={500}
                          unoptimized
                          className="object-cover w-full h-full my-auto rounded-lg"
                        />
                      </CarouselItem>
                      {gallery.map((image, index) => (
                        <CarouselItem
                          key={image.uuid}
                          className="w-full h-full overflow-hidden rounded-md "
                        >
                          {/* <Zoom> */}
                          <Image
                            src={image.path}
                            alt={`Imagen `}
                            width={500}
                            objectFit="cover"
                            height={500}
                            unoptimized
                            onClick={() => { setGalleryIndex(index + 1); setIsOpen(true) }}
                            className="object-cover w-full h-full my-auto rounded-lg"
                          />
                          {/* </Zoom> */}
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                  </Carousel></>) : (
                  <Image
                    src={noimage}
                    alt=""
                    unoptimized
                    width={500}
                    height={500}
                    className="object-cover w-full h-full my-auto rounded-lg "
                  />)}



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

              <Card className="hidden w-full mt-10 md:block">
                <CardHeader>
                  <CardTitle>Consultar por la propiedad</CardTitle>
                  <CardDescription>
                    Completá tus datos y comentanos tu consulta
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullname">Nombre completo</Label>
                        <Input
                          id="fullname"
                          type="text"
                          placeholder="Agustín Pérez"
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="5491112345678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={sendWhatsAppMessage}
                    type="button"
                    className="w-full text-white bg-red-600"
                  >
                    Enviar consulta
                  </Button>
                </CardFooter>
              </Card>

            </div>

          </div>
        </div>

        {/* carousel dialog - active when image is clicked */}
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
          <DialogTitle className="sr-only">Imagen de la propiedad</DialogTitle>

          <DialogContent className="w-full min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-[600px] 2xl:min-w-[830px] p-0 text-transparent bg-transparent border-none shadow-none h-fit">

            {/* carousel */}
            {/* <Image src={car} alt="" className="w-full" width={500} height={500} /> */}
            {/* Carousel */}

            <Carousel
              setApi={setApi}
              className="relative w-full h-full max-w-full rounded-lg aspect-square"
              //onMouseEnter={plugin.current.stop}
              //plugins={[plugin.current as any]}
              opts={{
                align: "start",
                loop: true,
                startIndex: galleryIndex
              }}
            //onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="h-full">
                <CarouselItem
                  className="w-full h-full overflow-hidden rounded-md "
                >
                  <Image
                    src={propertyData?.imagePath!}
                    alt={`Imagen `}
                    width={500}
                    objectFit="cover"
                    //onClick={() => { setGalleryIndex(0); setIsOpen(true) }}
                    height={500}
                    unoptimized
                    className="object-cover w-full h-full my-auto rounded-lg"
                  />
                </CarouselItem>
                {gallery.map((image, index) => (
                  <CarouselItem
                    key={image.uuid}
                    onChange={() => setGalleryIndex(index)}
                    className="w-full h-full overflow-hidden rounded-md "
                  >
                    {/* <Zoom> */}
                    <Image
                      src={image.path}
                      alt={`Imagen `}
                      width={500}
                      objectFit="cover"
                      height={500}
                      unoptimized
                      //onClick={() => { setGalleryIndex(index); setIsOpen(true) }}
                      className="object-cover w-full h-full my-auto rounded-lg"
                    />
                    {/* </Zoom> */}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Custom Indicators */}
            <div className="absolute left-0 right-0 flex justify-center space-x-2 -bottom-4">
              {gallery.map((dot, index) => (
                <button
                  key={dot.uuid}
                  className={`w-2 h-2 rounded-full ${index + 1 === current ? "bg-black" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
        {/* carousel dialog */}

        <RelatedProperties properties={latestProperties} />
      </div>

    </>
  );
};

export default PropertyCont;
