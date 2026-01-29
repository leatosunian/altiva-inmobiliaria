"use client";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/components/page/home/properties/Breadcrumbs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import styles from "@/app/css-modules/vehicles/vehicles.module.css";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bath, DoorOpen, Maximize2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoaderFullscreen from "@/components/page/LoaderFullscreen";
import Link from "next/link";
import { FaBed } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { IProperty } from "@/app/models/property";
import { FaLocationDot } from "react-icons/fa6";
import noimage from "@/public/noimage.jpg";
import { Separator } from "@/components/ui/separator";
import { usePageLoader } from "@/app/utils/usePageLoader";

const PropertiesCont = () => {
  const [open, setOpen] = useState(false);
  const [brandFilter, setBrandFilter] = useState("");
  const [propertiesFetch, setPropertiesFetch] = useState<IProperty[]>([]);
  const [propertiesList, setPropertiesList] = useState<IProperty[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchFilter = searchParams.get("search");
  const businessTypeFilter = searchParams.get("businessType");
  const propertyTypeFilter = searchParams.get("propertyType");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentVehicles, setCurrentVehicles] = useState<IProperty[]>([]);
  const [vehiclesPerPage, setVehiclesPerPage] = useState<number>(12);
  const lastVehicleIndex = currentPage * vehiclesPerPage;
  const firstVehicleIndex = lastVehicleIndex - vehiclesPerPage;
  const [numberOfPages, setNumberOfPages] = useState<number[]>([0]);

  const [dataReady, setDataReady] = useState(false);
  const pageReady = usePageLoader();

  const isLoading = !dataReady || !pageReady;

  async function getProperties() {
    try {
      const params = new URLSearchParams();
      if (searchFilter && searchFilter !== "null") params.set("search", searchFilter);
      if (businessTypeFilter) params.set("businessType", businessTypeFilter);
      if (propertyTypeFilter) params.set("propertyType", propertyTypeFilter);

      const url = params.toString()
        ? `/api/properties/?${params.toString()}`
        : `/api/properties/`;

      const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });

      const properties = await res.json();

      setPropertiesFetch(properties || []);
      setPropertiesList(properties || []);
    } catch (error) {
      console.error(error);
    } finally {
      setDataReady(true);
    }
  }

  function sortPropertiesByPriceDesc() {
    const propertiesSorted = [...propertiesList].sort(
      (prev, next) => next.price - prev.price
    );
    setPropertiesList(propertiesSorted);
  }
  function sortPropertiesByPriceAsc() {
    const propertiesSorted = [...propertiesList].sort(
      (prev, next) => prev.price - next.price
    );
    setPropertiesList(propertiesSorted);
  }
  function sortPropertiesByDateAsc() {
    const propertiesSorted = [...propertiesList].sort((a, b) => {
      return (
        new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
      );
    });
    setPropertiesList(propertiesSorted);
  }
  function sortPropertiesByDateDesc() {
    const propertiesSorted = [...propertiesList].sort((a, b) => {
      return (
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
    });
    setPropertiesList(propertiesSorted);
  }
  function handleFilterByAmbientes(rooms: number) {
    const propertiesFiltered = propertiesFetch.filter((property) => {
      return property.rooms === Number(rooms);
    });
    setPropertiesList(propertiesFiltered);
  }
  function handleFilterByPropertyType(propertyType: string) {
    const propertiesFiltered = propertiesFetch.filter((property) => {
      return property.propertyType === propertyType;
    });
    setPropertiesList(propertiesFiltered);
  }

  function handleFilterByBathrooms(bathrooms: number) {
    const propertiesFiltered = propertiesFetch.filter((property) => {
      return property.bathrooms === bathrooms;
    });
    setPropertiesList(propertiesFiltered);
  }
  function handleFilterByBusinessType(businessType: string) {
    const propertiesFiltered = propertiesFetch.filter((property) => {
      return property.businessType === businessType;
    });
    setPropertiesList(propertiesFiltered);
  }
  function handlePrevAndNextPage(to: string) {
    if (to === "PREV") {
      if (currentPage === 1) return;
      setCurrentPage(currentPage - 1);
      return;
    }
    if (to === "NEXT") {
      if (numberOfPages.length === currentPage) return;
      setCurrentPage(currentPage + 1);
      return;
    }
  }

  function refresh() {
    router.replace("/properties");
    setTimeout(() => {
      if (pathname === "/properties" && searchFilter !== "") {
        window.location.reload();
      }
    }, 500);
  }

  useEffect(() => {
    const currentVehicles = propertiesList.slice(
      firstVehicleIndex,
      lastVehicleIndex
    );
    setCurrentVehicles(currentVehicles);

    let paginationPages: number[] = [];
    for (let i = 1; i <= Math.ceil(propertiesList.length / vehiclesPerPage); i++) {
      paginationPages.push(i);
    }
    setNumberOfPages(paginationPages);
  }, [propertiesList, currentPage]);

  useEffect(() => {
    getProperties();
    setCurrentPage(1);
    console.log('businessTypeFilter', businessTypeFilter, 'propertyTypeFilter', propertyTypeFilter);

    if (businessTypeFilter === 'venta') {
      handleFilterByBusinessType('Venta');
    }
    if (businessTypeFilter === 'alquiler') {
      handleFilterByBusinessType('Alquiler');
    }
  }, [searchFilter, businessTypeFilter, propertyTypeFilter]);




  return (
    <>
      <LoaderFullscreen isVisible={isLoading} />
      <div className={isLoading ? "opacity-0" : "opacity-100"}>
        {/* HEADER SEPARATOR */}
        <div className="w-full h-24 md:h-28"></div>

        {/* container for padding */}
        <div className="px-6 mt-2 md:mt-0 md:px-24 2xl:px-48 ">
          {/* BREADCRUMBS */}
          <div className="mb-4 w-fit h-fit">
            <Breadcrumbs />
          </div>
          {/*  title and sort by */}
          <div className="flex flex-col justify-between w-full gap-2 mt-0 md:mt-1 md:flex-row h-fit ">
            <div className="flex flex-col w-fit">
              <h4 className="text-2xl font-medium md:text-3xl">
                Todas las propiedades
              </h4>
              <span className="mb-2 text-sm text-gray-400">
                Mostrando 1-12 de {propertiesList.length} propiedades
              </span>
            </div>

            {/* sort by  */}
            <div className="hidden my-auto w-fit h-fit md:block">
              <div className="hidden ml-auto w-fit h-fit md:block">
                <Select
                  onValueChange={(type) => {
                    console.log(type);
                    if (type === "price-desc") {
                      sortPropertiesByPriceDesc();
                    }
                    if (type === "price-asc") {
                      sortPropertiesByPriceAsc();
                    }
                    if (type === "date-desc") {
                      sortPropertiesByDateDesc();
                    }
                    if (type === "date-asc") {
                      sortPropertiesByDateAsc();
                    }
                  }}
                >
                  <SelectTrigger className="py-2 w-[300px]">
                    <SelectValue className="" placeholder="Ordenar por..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="price-desc">
                        Mayor a menor precio
                      </SelectItem>
                      <SelectItem value="price-asc">
                        Menor a mayor precio
                      </SelectItem>
                      <SelectItem value="date-desc">
                        Mas recientes a mas antiguos
                      </SelectItem>
                      <SelectItem value="date-asc">
                        Mas antiguos a mas recientes
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* mobile sort by */}
            <div className="block md:hidden ">
              <Select
                onValueChange={(type) => {
                  console.log(type);
                  if (type === "price-desc") {
                    sortPropertiesByPriceDesc();
                  }
                  if (type === "price-asc") {
                    sortPropertiesByPriceAsc();
                  }
                  if (type === "date-desc") {
                    sortPropertiesByDateDesc();
                  }
                  if (type === "date-asc") {
                    sortPropertiesByDateAsc();
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ordenar por..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="price-desc">
                      Mayor a menor precio
                    </SelectItem>
                    <SelectItem value="price-asc">
                      Menor a mayor precio
                    </SelectItem>
                    <SelectItem value="date-desc">
                      Mas recientes a mas antiguos
                    </SelectItem>
                    <SelectItem value="date-asc">
                      Mas antiguos a mas recientes
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* VEHICLE LIST */}
          <div className="flex mt-4 mb-10 md:mt-7">
            {/* FILTERS SIDEBAR */}


            <div

              className="flex-col hidden w-1/4 gap-2 h-fit lg:flex"
            >
              <div className="">
                <span className="text-lg font-semibold">Filtrar propiedades</span>
              </div>
              {/* divider */}
              {/* <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#0000001c",
                margin: "8px 0 12px  0 ",
              }}
            ></div> */}

              <div className="flex flex-col gap-5 px-5 pt-3 pb-5 rounded-md shadow-lg" style={{ border: "1px solid #0000001c" }}>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Tipo de operación</span>
                  <Select
                    onValueChange={(type) => {
                      console.log(type);
                      handleFilterByBusinessType(type);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar tipo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Venta">Venta</SelectItem>
                        <SelectItem value="Alquiler">Alquiler</SelectItem>
                        <SelectItem value="Alquiler temporal">Alquiler temporal</SelectItem>

                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>


                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Tipo de propiedad</span>
                  <Select
                    onValueChange={(doors) => {
                      console.log(doors);
                      handleFilterByPropertyType(doors);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar tipo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Casa">Casa</SelectItem>
                        <SelectItem value="Departamento">Departamento</SelectItem>
                        <SelectItem value="PH">PH</SelectItem>
                        <SelectItem value="Fondo de comercio">Fondo de comercio</SelectItem>
                        <SelectItem value="Terreno">Terreno</SelectItem>
                        <SelectItem value="Lote">Lote</SelectItem>
                        <SelectItem value="Local">
                          Local
                        </SelectItem>
                        <SelectItem value="Oficina">Oficina</SelectItem>
                        <SelectItem value="Quinta">Quinta</SelectItem>
                        <SelectItem value="Galpon">
                          Galpón
                        </SelectItem>
                        <SelectItem value="Chacra">Chacra</SelectItem>
                        <SelectItem value="Depósito">Depósito</SelectItem>
                        <SelectItem value="Campo">Campo</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Ambientes</span>
                  <Select
                    onValueChange={(doors) => {
                      console.log(doors);
                      handleFilterByAmbientes(Number(doors));
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar cantidad..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4 o más</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Baños</span>
                  <Select
                    onValueChange={(bathrooms) => {
                      handleFilterByBathrooms(Number(bathrooms));
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar cantidad..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4 o más</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() => {
                    console.log(searchFilter);

                    if (searchFilter === "") {
                      setPropertiesList(propertiesFetch);
                      return;
                    }
                    if (searchFilter !== "") {
                      router.replace("/vehicles");
                      refresh();
                    }
                  }}
                  style={{ backgroundColor: "#1C4D8D" }}

                  className="text-white bg-red-800 hover:bg-red-900"
                >
                  Remover filtros
                </Button>
              </div>
            </div>

            {/* VEHICLES */}

            <div className="w-full mb-24 md:mb-32">
              {currentVehicles.length !== 0 && (
                <>
                  <div
                    className={`${styles.vehiclesCont} md:gap-4 gap-10 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 py-5 md:py-0 pl-0 lg:pl-10`}
                  >
                    {currentVehicles.length > 0 &&
                      currentVehicles.map((property) => (
                        <>
                          <div
                            key={property._id}
                            className="col-span-1 md:h-full max-h-[560px] h-fit"
                          >
                            <Card
                              key={property._id}
                              className="flex flex-col h-full shadow-lg unselectable"
                            >

                              {property.status === "Reservado" && (
                                <Badge
                                  className="absolute bg-orange-400 border-none shadow-lg mt-2 md:py-1 md:px-3 py-1.5 px-3.5 ml-2 text-white font-normal md:text-xs text-sm "
                                  variant="outline"
                                >
                                  Reservado
                                </Badge>
                              )}
                              {property.status === "Vendido" && (
                                <Badge
                                  className="absolute bg-red-500 border-none shadow-lg mt-2 md:py-1 md:px-3 py-1.5 px-3.5 ml-2 text-white font-normal md:text-xs text-sm "
                                  variant="outline"
                                >
                                  Vendido
                                </Badge>
                              )}

                              {property.imagePath === "" || !property.imagePath ? (<>        <Image
                                src={noimage}
                                alt=""
                                unoptimized
                                width={500}
                                height={500}
                                className="object-cover h-full mb-4 overflow-hidden rounded-t-md "
                              /></>) : (<>  <Image
                                src={property.imagePath!}
                                alt=""
                                unoptimized
                                width={500}
                                height={500}
                                className="object-cover h-full mb-4 overflow-hidden rounded-t-md "
                              /></>)}

                              <div className="flex flex-col justify-between w-full h-full ">
                                <CardHeader style={{ padding: "0 16px 0px 16px" }}>
                                  <CardTitle className="text-lg md:text-sm 2xl:text-base textCut">
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
                                </CardHeader>

                                <CardDescription style={{ padding: "10px 16px 10px 16px", color: "#a1a1aa" }} className="flex flex-wrap items-center justify-between w-full h-fit gap-y-2 ">
                                  <div className="flex items-center w-1/2 gap-1" >
                                    <Maximize2 size={14} />
                                    {property.metersSquare ?
                                      (<span className="text-xs">{property.metersSquare} m² </span>)
                                      :
                                      (<span className="text-xs">No especif.</span>)}
                                  </div>
                                  <div className="flex items-center w-1/2 gap-1">
                                    <FaBed size={16} />
                                    {property.dormitorios ?
                                      (<span className="text-xs"> {property.dormitorios} dormitorios</span>)
                                      :
                                      (<span className="text-xs"> No especif.</span>)}
                                  </div>
                                  <div className="flex items-center w-1/2 gap-1">
                                    <DoorOpen size={17} />
                                    {property.rooms ?
                                      (<span className="text-xs"> {property.rooms} ambientes</span>)
                                      :
                                      (<span className="text-xs"> No especif.</span>)}
                                  </div>
                                  <div className="flex items-center w-1/2 gap-1">
                                    <Bath size={17} />
                                    {property.bathrooms ?
                                      (<span className="text-xs"> {property.bathrooms} baños</span>)
                                      :
                                      (<span className="text-xs"> No especif.</span>)}
                                  </div>
                                </CardDescription>

                                <CardFooter style={{ padding: "0 16px 18px 16px" }} className="flex flex-col items-start w-full ">
                                  <Separator />
                                  <div className="flex gap-5 pt-3 ">
                                    <p className="text-lg font-semibold">
                                      {property?.currency === "USD" && property?.currency} ${property?.price.toLocaleString()}
                                    </p>
                                  </div>

                                  <Link
                                    href={`/properties/${property._id}`}
                                    className="w-full mt-4 h-fit"
                                  >
                                    <Button
                                      variant={"default"}
                                      style={{ backgroundColor: "#1C4D8D" }}
                                      className="w-full text-xs text-white "
                                    >
                                      Ver propiedad
                                    </Button>
                                  </Link>
                                </CardFooter>
                              </div>
                            </Card>
                          </div>
                        </>
                      ))}
                  </div>
                  {/* pagination */}
                  <div className="mt-10 md:mt-20">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={() => handlePrevAndNextPage("PREV")}
                          />
                        </PaginationItem>
                        {numberOfPages.map((page) => (
                          <>
                            <PaginationItem
                              onClick={() => {
                                console.log("setcurrentpage to ", page);
                                setCurrentPage(page);
                              }}
                            >
                              <PaginationLink
                                isActive={currentPage === page}
                                href="#"
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          </>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={() => handlePrevAndNextPage("NEXT")}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </>
              )}
              {propertiesList.length === 0 && (
                <>
                  <div className="flex flex-col items-center justify-center w-full gap-5 my-32 h-fit">
                    <span className="text-2xl font-semibold">
                      No se encontró ningún resultado.
                    </span>
                    <Button

                      onClick={() => {
                        if (searchFilter === "") {
                          setPropertiesList(propertiesFetch);
                          return;
                        }
                        if (searchFilter !== "") {
                          router.replace("/vehicles");
                          refresh();
                        }
                      }}
                      style={{ backgroundColor: "#1C4D8D" }}
                      className="text-white "
                    >
                      Eliminar filtros
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default PropertiesCont;
