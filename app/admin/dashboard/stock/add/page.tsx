import { Separator } from "@/components/ui/separator";
import AddPropertyForm from "@/components/admin/dashboard/addProperty/AddPropertyForm";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agregar propiedad | Panel de administración",
  description:
    "Altiva Propiedades, inmobiliaria ubicada en Mar del Plata, Buenos Aires",
};

const AddProduct = () => {
  return (
    <>
      <h2 className="text-2xl font-medium ">Agregar propiedad</h2>
      <Separator className="my-4" />
      <div>
        <div className="grid gap-0 ">
          {/* ADD PROPERTY FORM */}
          <AddPropertyForm />
        </div>
      </div>
    </>
  );
};

export default AddProduct;
