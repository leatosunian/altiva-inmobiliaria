"use client";

import { FaLocationDot } from "react-icons/fa6";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Card,
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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import { FaBed } from "react-icons/fa";
import { IBranch } from "@/app/models/branch";
import { IProperty } from "@/app/models/property";
import { Bath, DoorOpen, Maximize2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const PropertyList = ({ properties }: { properties: IProperty[] }) => {
  const [loading, setLoading] = useState(true);
  const [propertyList, setPropertyList] = useState<IProperty[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState({
    uuid: "",
    propertyName: "",
  });
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    modalButtonRef.current?.click();
  };
  const { toast } = useToast();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentProperties, setCurrentProperties] = useState<IProperty[]>([]);
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [propertiesPerPage, setPropertiesPerPage] = useState<number>(12);
  const lastPropertyIndex = currentPage * propertiesPerPage;
  const firstPropertyIndex = lastPropertyIndex - propertiesPerPage;
  const [numberOfPages, setNumberOfPages] = useState<number[]>([0]);
  const [filteredProperties, setFilteredProperties] = useState<IProperty[]>([]); // lista filtrada
  const [searchTerm, setSearchTerm] = useState<string>("");

  const router = useRouter();
  useEffect(() => {
    if (properties) {
      setPropertyList(properties);
      setFilteredProperties(properties); // seteo de lista filtrada con lista completa al iniciar
      setLoading(false);
    }
  }, [properties]);

  async function handleEdit(uuid: string) {
    router.push("/admin/dashboard/stock/" + uuid);
  }

  async function handleDelete(uuid: string) {
    setLoading(true)
    try {
      const vehicle = await fetch("/api/properties/" + uuid, {
        method: "DELETE",
      }).then((response) => response.json());
      if (vehicle.msg === "PROPERTY_DELETED") {
        setPropertyList((prevCars) => {
          const updatedCars = prevCars?.filter((car) => car._id !== uuid);
          toast({ description: "¡Propiedad eliminada!", variant: "default" });
          return updatedCars;
        });
        setLoading(false)
      }
      router.refresh();
    } catch (error) {
      // error alert
      toast({ description: "Error al eliminar propiedad", variant: "destructive" });
    }
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // vuelvo siempre a la primera página cuando cambia la búsqueda
  }

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    const result =
      term === ""
        ? propertyList
        : propertyList.filter((property) => property.name.toLowerCase().includes(term));

    setFilteredProperties(result);
  }, [searchTerm, propertyList]);

  /* ------------------------- paginación ------------------------- */
  useEffect(() => {
    const lastPropertyIndex = currentPage * propertiesPerPage;
    const firstPropertyIndex = lastPropertyIndex - propertiesPerPage;

    setCurrentProperties(filteredProperties.slice(firstPropertyIndex, lastPropertyIndex));

    const pages: number[] = [];
    for (let i = 1; i <= Math.ceil(filteredProperties.length / propertiesPerPage); i++) {
      pages.push(i);
    }
    setNumberOfPages(pages);
  }, [filteredProperties, currentPage, propertiesPerPage]);

  function openDeleteModal({
    propertyName,
    uuid,
  }: {
    propertyName: string;
    uuid: string;
  }) {
    setSelectedToDelete({ propertyName, uuid });
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
    const currentProperties = propertyList.slice(firstPropertyIndex, lastPropertyIndex);
    setCurrentProperties(currentProperties);
    let paginationPages: number[] = [];
    for (let i = 1; i <= Math.ceil(propertyList.length / propertiesPerPage); i++) {
      paginationPages.push(i);
    }
    setNumberOfPages(paginationPages);
    setLoading(false);
  }, [propertyList, currentPage]);

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
          {filteredProperties.length === 0 && (
            <>
              <div className="flex flex-col items-center justify-center w-full gap-5 py-36 h-fit">
                <h4 className="text-base font-semibold md:text-2xl">
                  Todavía no tenés propiedades en tu stock.
                </h4>
                <Link href={"/admin/dashboard/stock/add"}>
                  <Button>Agregar propiedad</Button>
                </Link>
              </div>
            </>
          )}
          {/* properties */}
          {filteredProperties.length > 0 && (
            <>
              {/* filter / search bar */}
              <div className="mb-5 text-sm text-black bg-white groupSearch dark:bg-background dark:text-white">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="iconSearch">
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
                <input
                  className="text-black inputSearch dark:text-white"
                  type="search"
                  placeholder="Buscar propiedad..."
                  value={searchTerm}                      // NEW
                  onChange={handleSearchChange}            // NEW
                />
              </div>

              {/* filters */}
              {/* <div className="flex gap-4">
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
              </div> */}

              {/* property list */}
              <div className="grid grid-cols-1 gap-10 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 ">
                {filteredProperties?.map((property) => (
                  <div key={property._id} className="col-span-1 md:h-full h-fit">
                    <Card
                      key={property._id}
                      className="flex flex-col min-h-[420px] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[560px] xl:min-h-[520px] 2xl:min-h-[450px] shadow-lg overflow-hidden"
                    >
                      <div className="relative w-full h-56 mb-4 overflow-hidden sm:h-64 md:h-72 lg:h-72 xl:h-64 2xl:h-40 rounded-t-md sm:mb-5">
                        <Image
                          src={property.imagePath!}
                          alt=""
                          unoptimized
                          width={500}
                          height={500}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover" />
                      </div>
                      {/* Use h-full so the footer pushes to the bottom consistently */}
                      <div className="flex flex-col justify-start w-full h-fit md:justify-between md:h-full">
                        <CardHeader style={{ padding: "0 16px 10px 16px" }}>
                          <CardTitle className="pb-1 text-sm textCut">
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
                              {property.currency} {property.price.toLocaleString()}
                            </p>
                          </div>
                        </CardHeader>
                        <CardFooter className="grid grid-cols-2 gap-3 px-4 pb-5 mt-2 md:mt-0">
                          <Button
                            onClick={() => handleEdit(property._id!)}
                            variant={"default"}
                            className="py-2 text-sm"
                          >
                            Editar
                          </Button>
                          <Button
                            onClick={() =>
                              openDeleteModal({
                                propertyName: property.name,
                                uuid: property._id!,
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
                        ¿Querés eliminar tu propiedad {selectedToDelete.propertyName}?
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
      )
      }
    </>
  );
};

export default PropertyList;
