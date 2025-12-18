import PropertyList from "@/components/admin/dashboard/stock/PropertyList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Propiedades | Panel de administración",
  description:
    "Altiva Propiedades, inmobiliaria ubicada en Mar del Plata, Buenos Aires",
};

async function getProperties() {
  try {
    const propertiesFetch = await fetch(`${process.env.NEXTAUTH_URL}/api/properties`, {
      method: "GET",
      cache: "no-store",
    });
    const properties = await propertiesFetch.json();
    return properties;
  } catch (error) {
    return;
  }
}

const StockList = async () => {
  const properties = await getProperties();
  return (
    <>
      <div className="flex items-center justify-between ">
        <h2 className="text-xl font-medium md:text-2xl ">Mis propiedades</h2>
        <Link href={"/admin/dashboard/stock/add"}>
          <Button variant="outline" className="flex gap-2 p-2 w-fit h-fit">
            <IoMdAdd size={20} className="w-fit h-fit" />
            <span>Crear propiedad</span>
          </Button>
        </Link>
      </div>
      <Separator className="mt-4 mb-5"></Separator>
      <PropertyList properties={properties} />
    </>
  );
};

export default StockList;
