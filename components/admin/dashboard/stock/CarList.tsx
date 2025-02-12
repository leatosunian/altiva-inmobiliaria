"use client";

import { FaLocationDot } from "react-icons/fa6";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import carImg from "@/public/car.jpg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FaBed, FaRegCalendar } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectxs";
import { IBranch } from "@/app/models/branch";
import { IProperty } from "@/app/models/property";
import covered from '@/public/medidas.png'
import uncovered from '@/public/uncovered.png'
import rooms from '@/public/cuartos.png'
import { Bath, DoorOpen, House, Maximize2, Scan } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const CarList = ({ cars }: { cars: IProperty[] }) => {
  const [loading, setLoading] = useState(true);
  const [carList, setCarList] = useState<IProperty[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState({
    uuid: "",
    carName: "",
  });
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    modalButtonRef.current?.click();
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentVehicles, setCurrentVehicles] = useState<IProperty[]>([]);
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [vehiclesPerPage, setVehiclesPerPage] = useState<number>(12);
  const lastVehicleIndex = currentPage * vehiclesPerPage;
  const firstVehicleIndex = lastVehicleIndex - vehiclesPerPage;
  const [numberOfPages, setNumberOfPages] = useState<number[]>([0]);

  const router = useRouter();
  useEffect(() => {
    if (cars) {
      setCarList(cars);
    }
  }, [cars]);

  const { data: session, status } = useSession();

  async function handleEdit(uuid: string) {
    router.push("/admin/dashboard/stock/" + uuid);
  }

  async function handleDelete(uuid: string) {
    setLoading(true)
    try {
      const vehicle = await fetch("/api/cars/" + uuid, {
        method: "DELETE",
      }).then((response) => response.json());
      console.log("vehicle:", vehicle);
      if (vehicle.msg === "CAR_DELETED") {
        setCarList((prevCars) => {
          const updatedCars = prevCars?.filter((car) => car._id !== uuid);
          console.log("updatedCars:", updatedCars);
          return updatedCars;
        });
        setLoading(false)
      }
      router.refresh();
    } catch (error) {
      // error alert
    }
  }

  function openDeleteModal({
    carName,
    uuid,
  }: {
    carName: string;
    uuid: string;
  }) {
    setSelectedToDelete({ carName, uuid });
    handleClick();
  }

  function handleDeleteConfirmed(uuid: string) {
    handleDelete(uuid);
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

  useEffect(() => {
    const currentVehicles = carList.slice(firstVehicleIndex, lastVehicleIndex);
    setCurrentVehicles(currentVehicles);
    let paginationPages: number[] = [];
    for (let i = 1; i <= Math.ceil(carList.length / vehiclesPerPage); i++) {
      paginationPages.push(i);
    }
    setNumberOfPages(paginationPages);
    setLoading(false);
  }, [carList, currentPage]);

  async function getBranches() {
    try {
      const branchesFetch = await fetch("/api/branches", {
        method: "GET",
        cache: "no-store",
      }).then((response) => response.json());
      setBranches(branchesFetch.branches);
    } catch (error) { }
  }

  useEffect(() => {
    router.refresh();
    getBranches();
  }, []);

  return (
    <>
      {loading && (
        <>
          <div
            className="flex items-center justify-center w-full overflow-y-hidden bg-white dark:bg-background"
            style={{ zIndex: "99999999", height: "67vh" }}
          >
            <div className=" loader"></div>
          </div>
        </>
      )}
      {!loading && (
        <>
          {/* no vehicles  */}
          {currentVehicles.length === 0 && (
            <>
              <div className="flex flex-col items-center justify-center w-full gap-5 py-36 h-fit">
                <h4 className="text-base font-semibold md:text-2xl">
                  Todavía no tenés propiedadess en tu stock.
                </h4>
                <Link href={"/admin/dashboard/stock/add"}>
                  <Button>Agregar propiedad</Button>
                </Link>
              </div>
            </>
          )}
          {/* vehicles */}
          {currentVehicles.length > 0 && (
            <>
              {/* search and filter bar */}
              <div className="flex justify-between mb-7">
                {/* search bar */}
                <div className="text-sm text-black bg-white groupSearch dark:bg-background dark:text-white ">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="iconSearch"
                  >
                    <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                  </svg>
                  <input
                    className="text-black inputSearch dark:text-white"
                    type="search"
                    placeholder="Buscar propiedades"
                  />
                </div>

                {/* filters */}
                <div className="flex gap-4">
                  <Select>
                    <SelectTrigger className="w-fit">
                      <SelectValue placeholder="Sucursal" className="mr-2" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {branches &&
                          branches.map((branch) => (
                            <SelectItem
                              key={branch.branchName}
                              value={branch._id!}
                            >
                              {branch.address}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="w-fit">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Disponible</SelectItem>
                        <SelectItem value="banana">Reservado</SelectItem>
                        <SelectItem value="blueberry">Vendido</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="w-fit">
                      <SelectValue
                        className="text-xs"
                        placeholder="Uso del vehiculo"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Usado</SelectItem>
                        <SelectItem value="banana">0km</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="w-fit">
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

              {/* vehicle list */}
              <div className="grid grid-cols-1 gap-10 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {currentVehicles?.map((car) => (
                  <div key={car._id} className="col-span-1 md:h-full h-fit">
                    <Card
                      key={car._id}
                      className="flex flex-col h-fit shadow-lg"
                    >
                      <Image
                        src={car.imagePath!}
                        alt=""
                        unoptimized
                        width={500}
                        height={500}
                        className="object-cover h-full mb-4 overflow-hidden md:h-1/2 rounded-t-md "
                      />
                      <div className="flex flex-col justify-between w-full h-fit md:h-1/2">
                        <CardHeader style={{ padding: "0 16px 10px 16px" }}>
                          <CardTitle className="text-sm textCut pb-1">
                            {car.name}
                          </CardTitle>
                          <Separator />
                          <p
                            style={{ color: "#a1a1aa" }}
                            className="flex py-1 items-center gap-1 text-xs "
                          >
                            <FaLocationDot size={13} /> {car.neighborhood}, {car.city}
                          </p>
                          <Separator />
                          <CardDescription className="flex items-center h-fit flex-wrap gap-y-2 justify-between w-full pt-2 pb-2 ">
                            <div className="flex items-center gap-1">
                              <Maximize2 size={14} />
                              <span className="text-xs">{car.metersSquare} m² </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaBed size={16} />
                              <span className="text-xs"> {car.dormitorios} dormitorios</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DoorOpen size={17} />
                              <span className="text-xs"> {car.rooms} ambientes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath size={17} />
                              <span className="text-xs"> {car.bathrooms} baños</span>
                            </div>
                          </CardDescription>

                          <Separator />

                          <div className="flex flex-col gap-5 pt-2 pb-2">

                            <p className="text-base font-semibold">
                              {car.currency} ${car.price}
                            </p>
                          </div>
                        </CardHeader>
                        <CardFooter className="grid grid-cols-2 gap-3 px-4 pb-5 mt-2 md:mt-0">
                          <Button
                            onClick={() => handleEdit(car._id!)}
                            variant={"default"}
                            className="text-sm py-2"
                          >
                            Editar
                          </Button>
                          <Button
                            onClick={() =>
                              openDeleteModal({
                                carName: car.name,
                                uuid: car._id!,
                              })
                            }
                            variant={"destructive"}
                          >
                            Eliminar
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {/* delete vehicle modal */}
              <div className="px-10 rounded-md">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="sr-only"
                      ref={modalButtonRef}
                      variant="outline"
                    >
                      Show Dialog
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Eliminar propiedad</AlertDialogTitle>
                      <AlertDialogDescription>
                        ¿Querés eliminar tu propiedad {selectedToDelete.carName}?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleDeleteConfirmed(selectedToDelete.uuid)
                        }
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* pagination */}
              <div className="mt-10 mb-6 md:mt-20">
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
        </>
      )}
    </>
  );
};

export default CarList;
