"use client";
import { carBrands } from "@/app/utils/carBrands";
import { carYears } from "@/app/utils/carYears";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/components/page/home/vehicles/Breadcrumbs";
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
import buttonStyle from "@/app/css-modules/home.search.module.css";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Footer from "@/components/page/home/Footer";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Bath, CheckIcon, ChevronsUpDown, DoorOpen, Maximize2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoaderFullscreen from "@/components/page/LoaderFullscreen";
import Link from "next/link";
import { FaBed, FaRegCalendar } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import { IProperty } from "@/app/models/property";
import { Separator } from "@radix-ui/react-separator";
import { FaLocationDot } from "react-icons/fa6";

const VehiclesCont = () => {
  const [open, setOpen] = useState(false);
  const [brandFilter, setBrandFilter] = useState("");
  const [vehicleFetch, setVehicleFetch] = useState<IProperty[]>([]);
  const [vehicleList, setVehicleList] = useState<IProperty[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchFilter = searchParams.get("search");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentVehicles, setCurrentVehicles] = useState<IProperty[]>([]);
  const [vehiclesPerPage, setVehiclesPerPage] = useState<number>(12);
  const lastVehicleIndex = currentPage * vehiclesPerPage;
  const firstVehicleIndex = lastVehicleIndex - vehiclesPerPage;
  const [numberOfPages, setNumberOfPages] = useState<number[]>([0]);

  async function getCars() {
    try {
      const url =
        searchFilter && searchFilter !== "null"
          ? `/api/cars/?search=${searchFilter}`
          : `/api/cars/`;
      const carsFetch = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });
      const cars = await carsFetch.json();
      setVehicleList(cars);
      setVehicleFetch(cars);
      setLoading(false);
      return cars;
    } catch (error) {
      return;
    }
  }

  function sortVehiclesByPriceDesc() {
    const vehiclesSorted = [...vehicleList].sort(
      (prev, next) => next.price - prev.price
    );
    setVehicleList(vehiclesSorted);
  }
  function sortVehiclesByPriceAsc() {
    const vehiclesSorted = [...vehicleList].sort(
      (prev, next) => prev.price - next.price
    );
    setVehicleList(vehiclesSorted);
  }
  function sortVehiclesByDateAsc() {
    const vehiclesSorted = [...vehicleList].sort((a, b) => {
      return (
        new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
      );
    });
    setVehicleList(vehiclesSorted);
  }
  function sortVehiclesByDateDesc() {
    const vehiclesSorted = [...vehicleList].sort((a, b) => {
      return (
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
    });
    setVehicleList(vehiclesSorted);
  }
  function handleFilterByAmbientes(rooms: number) {
    const vehiclesFiltered = vehicleFetch.filter((vehicle) => {
      return vehicle.rooms === Number(rooms);
    });
    setVehicleList(vehiclesFiltered);
  }
  function handleFilterByPropertyType(propertyType: string) {
    const vehiclesFiltered = vehicleFetch.filter((vehicle) => {
      return vehicle.propertyType === propertyType;
    });
    setVehicleList(vehiclesFiltered);
  }

  function handleFilterByBathrooms(bathrooms: number) {
    const vehiclesFiltered = vehicleFetch.filter((vehicle) => {
      return vehicle.bathrooms === bathrooms;
    });
    setVehicleList(vehiclesFiltered);
  }
  function handleFilterByBusinessType(businessType: string) {
    const vehiclesFiltered = vehicleFetch.filter((vehicle) => {
      return vehicle.businessType === businessType;
    });
    setVehicleList(vehiclesFiltered);
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
    const currentVehicles = vehicleList.slice(
      firstVehicleIndex,
      lastVehicleIndex
    );
    setCurrentVehicles(currentVehicles);

    let paginationPages: number[] = [];
    for (let i = 1; i <= Math.ceil(vehicleList.length / vehiclesPerPage); i++) {
      paginationPages.push(i);
    }
    setNumberOfPages(paginationPages);
    console.log("vehiclelist", vehicleList);

    console.log("numberOfPages", currentPage);
    console.log("numberOfPages", numberOfPages);
  }, [vehicleList, currentPage]);

  useEffect(() => {
    getCars();
  }, []);

  return (
    <>
      {loading && <LoaderFullscreen />}
      {/* HEADER SEPARATOR */}
      <div className="w-full h-16 md:h-20"></div>

      {/* BREADCRUMBS */}
      <div className="w-full px-6 pt-5 pb-3 md:pt-2 md:px-24 2xl:px-48 h-fit">
        <Breadcrumbs />
      </div>

      {/* container for padding */}
      <div className="px-6 md:px-24 2xl:px-48 ">
        {/*  title and sort by */}
        <div className="flex flex-col justify-between w-full gap-2 mt-0 md:mt-2 md:flex-row h-fit ">
          <div className="flex flex-col w-fit">
            <h4 className="text-2xl font-medium md:text-3xl">
              Todas las propiedades
            </h4>
            <span className="mb-2 text-sm text-gray-400">
              Mostrando 1-12 de {vehicleList.length} propiedades
            </span>
          </div>

          {/* sort by  */}
          <div className="hidden my-auto w-fit h-fit md:block">
            <div className="hidden ml-auto w-fit h-fit md:block">
              <Select
                onValueChange={(type) => {
                  console.log(type);
                  if (type === "price-desc") {
                    sortVehiclesByPriceDesc();
                  }
                  if (type === "price-asc") {
                    sortVehiclesByPriceAsc();
                  }
                  if (type === "date-desc") {
                    sortVehiclesByDateDesc();
                  }
                  if (type === "date-asc") {
                    sortVehiclesByDateAsc();
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
                  sortVehiclesByPriceDesc();
                }
                if (type === "price-asc") {
                  sortVehiclesByPriceAsc();
                }
                if (type === "date-desc") {
                  sortVehiclesByDateDesc();
                }
                if (type === "date-asc") {
                  sortVehiclesByDateAsc();
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
            style={{ border: "1px solid #0000001c" }}
            className="flex-col hidden w-1/4 px-5 pt-3 pb-5 rounded-md shadow-lg h-fit lg:flex"
          >
            <div className="">
              <span className="text-lg font-semibold">Filtros</span>
            </div>

            {/* divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#0000001c",
                margin: "8px 0 12px  0 ",
              }}
            ></div>

            <div className="flex flex-col gap-5">
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
                    setVehicleList(vehicleFetch);
                    return;
                  }
                  if (searchFilter !== "") {
                    router.replace("/vehicles");
                    refresh();
                  }
                }}
                className="bg-red-800 text-white hover:bg-red-900"
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
                  className={`${styles.vehiclesCont} xl:gap-10 gap-14 2xl:gap-12 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 py-5 md:py-0 pl-0 lg:pl-10   `}
                >
                  {currentVehicles.length > 0 &&
                    currentVehicles.map((property) => (
                      <>
                        <div
                          key={property._id}
                          className="col-span-1 md:h-full h-fit"
                        >
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
                                <CardTitle className="text-base sm:text-base textCut pb-1">
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
            {vehicleList.length === 0 && (
              <>
                <div className="flex flex-col items-center justify-center w-full gap-5 my-32 h-fit">
                  <span className="text-2xl font-semibold">
                    No se encontró ningún resultado.
                  </span>
                  <Button
                  
                    onClick={() => {
                      if (searchFilter === "") {
                        setVehicleList(vehicleFetch);
                        return;
                      }
                      if (searchFilter !== "") {
                        router.replace("/vehicles");
                        refresh();
                      }
                    }}
                    className="bg-red-800 text-white hover:bg-red-900"
                  >
                    Eliminar filtros
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default VehiclesCont;
