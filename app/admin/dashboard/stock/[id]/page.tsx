import { Separator } from "@/components/ui/separator";
import ImageGallery from "@/components/admin/dashboard/editProperty/ImageGallery";
import EditPropertyForm from "@/components/admin/dashboard/editProperty/EditPropertyForm";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar propiedad | Panel de administración",
  description:
    "Altiva Propiedades, inmobiliaria ubicada en Mar del Plata, Buenos Aires",
};

const EditProduct = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <h2 className="text-2xl font-medium ">Editar propiedad</h2>
      <Separator className="my-4" />
      <div>
        <div className="grid gap-0 ">
          {/* EDIT PRODUCT FORM */}
          <EditPropertyForm uuid={params.id} />

          <div className="block md:hidden">
            <Separator className="my-10 " />
z|
            {/* GALLERY CAROUSEL */}
            <ImageGallery uuid={params.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
