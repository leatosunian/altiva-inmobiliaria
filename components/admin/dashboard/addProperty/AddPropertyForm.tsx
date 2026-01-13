"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { carBrands } from "@/app/utils/carBrands";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { formSchema } from "@/app/schemas/createPropertyForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { IBranch } from "@/app/models/branch";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { IProperty } from "@/app/models/property";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const AddPropertyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Obligatorios
      name: "",
      bathrooms: "",
      dormitorios: "",
      businessType: "",
      garageCarsQuantity: "",
      address: "",
      city: "",
      neighborhood: "",
      state: "",
      price: "",
      currency: "USD",
      propertyType: "",
      metersSquare: "",
      rooms: "",
      coveredMetersSquare: "",
      expensas: "",
      antiquity: "",
      floors: "",
      description: "",
      status: "Disponible",
      show: true,

      // Opcionales
      uncoveredMetersSquare: "",
      luminocity: "",
      infrastructureStatus: "",
      disposition: "",
      hasElevator: false,
      calefaction: "",
      hasPatio: false,
      hasPool: false,
      hasQuincho: false,
      hasTerrace: false,
    }
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [createdProperty, setCreatedProperty] = useState<IProperty>();
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const [branches, setBranches] = useState<IBranch[]>();
  const [openCreated, setOpenCreated] = useState(false);
  const { toast } = useToast();

  function handleGalleryRedirect() {
    if (createdProperty) {
      //router.push(
      //  `/admin/dashboard/stock/${createdVehicle.uuid}?scrollToDiv=galleryCont`
      //);
      router.push(`/admin/dashboard/stock/${createdProperty._id}`);
      router.refresh();
    }
  }

  function transformNumbers(values: any) {
    const numberFields = [
      "bathrooms",
      "dormitorios",
      "garageCarsQuantity",
      "price",
      "metersSquare",
      "coveredMetersSquare",
      "uncoveredMetersSquare",
      "expensas",
      "antiquity",
      "floors",
      "rooms",
    ];

    const result = { ...values };

    numberFields.forEach((field) => {
      if (result[field] === "" || result[field] === undefined) {
        result[field] = null; // para opcionales
      } else {
        result[field] = Number(result[field]);
      }
    });

    return result;
  }


  // ADD NEW PRODUCT FUNCTION
  async function onSubmit(values: any) {
    setLoading(true);
    //values.uuid = uuidv4();
    values.show = true;
    values.status = 'Disponible'

    try {
      const sanitized = transformNumbers(values);

      const property = await fetch("/api/properties", {
        method: "POST",
        body: JSON.stringify(sanitized),
      }).then((response) => response.json());
      console.log(property);

      if (property.msg === "ERROR_CREATE_PROPERTY") {
        toast({
          description: "Error al crear propiedad",
          variant: "destructive",
        });
      } else {
        toast({
          description: "¡Propiedad creada!",
          variant: "default",
        });
        setOpenCreated(true);
        setCreatedProperty(property);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        description: "Error al crear propiedad",
        variant: "destructive",
      });
    }
  }

  async function getBranches() {
    try {
      const branchesFetch = await fetch("/api/branches", {
        method: "GET",
        cache: "no-cache",
      }).then((response) => response.json());
      setBranches(branchesFetch.branches);
    } catch (error) { }
  }

  useEffect(() => {
    getBranches();
  }, []);

  useEffect(() => {
    console.log(createdProperty)
  }, [createdProperty]);

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* publicacion info inputs */}
              <Card className="p-4 mt-2">
                <span className="text-lg font-semibold md:text-xl ">Publicación</span>
                <Separator className="my-2" />
                <div className="grid grid-cols-1 gap-4 mt-4 mb-2 md:gap-8 md:grid-cols-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Nombre de la publicación</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. Venta departamento 3 ambientes zona centro"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex col-span-2 gap-2 xl:col-span-1">
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem className="w-fit">
                          <FormLabel>Precio</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ARS">ARS</SelectItem>
                              <SelectItem value="USD">USD</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="opacity-0">-</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingresa un precio"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="expensas"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel>Expensas (ARS) <span className="text-sm text-gray-500">(opcional)</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. 140.000"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel>Tipo de propiedad</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
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
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel>Tipo de negocio</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Alquiler">Alquiler</SelectItem>
                            <SelectItem value="Alquiler temporal">Alquiler temporal</SelectItem>
                            <SelectItem value="Venta">Venta</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-2 pr-0 mt-4 md:mt-8 md:w-1/2 md:pr-5 ">
                      <FormLabel>
                        Descripción <span className="text-sm text-gray-500">(opcional)</span>
                      </FormLabel>
                      <Textarea
                        {...field}
                        className="min-h-[120px]"
                        placeholder="Ingresa una descripción"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
              {/* publicacion info inputs */}

              {/* location info inputs */}
              <Card className="p-4 mt-6">
                <span className="text-lg font-semibold md:text-xl">Ubicación</span>
                <Separator className="my-2" />
                <div className="grid grid-cols-1 gap-4 mt-4 mb-2 md:gap-8 md:grid-cols-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calle y número</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. Av. Colón 1234"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa una ciudad"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provincia</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa una provincia"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Barrio</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. Barrio Chauvín"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
              {/* location info inputs */}

              {/* datos del inmueble inputs */}
              <Card className="p-4 mt-6 ">
                <span className="mb-2 text-lg font-semibold md:text-xl">Datos del Inmueble <span className="text-sm text-gray-500">(opcional)</span></span>
                <Separator className="my-2" />

                <div className="grid grid-cols-1 gap-4 mt-4 mb-2 md:gap-y-4 gap-x-6 md:grid-cols-4 2xl:grid-cols-6 ">
                  {/* floors input */}
                  <FormField
                    control={form.control}
                    name="floors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>N° Piso</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. 5"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="antiquity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Antigüedad</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. 23 años"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="metersSquare"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Superficie total (m²)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. 324 m²"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coveredMetersSquare"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Superficie cubierta (m²) </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. 292 m²"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="uncoveredMetersSquare"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Superficie descubierta (m²) </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. 292 m²"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="luminocity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Luminosidad</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. Buena"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="infrastructureStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado del inmueble</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. A estrenar"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="disposition"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Disposición</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar disposición" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Frente">Frente</SelectItem>
                            <SelectItem value="Contrafrente">Contrafrente</SelectItem>
                            <SelectItem value="Interno">Interno</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
              {/* datos del inmueble inputs */}

              {/* caracteristicas info inputs */}
              <Card className="p-4 mt-6 ">
                <span className="mb-2 text-lg font-semibold">Caracteristicas <span className="text-sm text-gray-500">(opcional)</span></span>
                <div className="grid grid-cols-1 gap-4 mt-4 md:gap-y-4 gap-x-6 md:gap-8 md:grid-cols-4 2xl:grid-cols-6">
                  {/* rooms input */}
                  <FormField
                    control={form.control}
                    name="rooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ambientes</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. 3 "
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/*  dormitorios input */}
                  <FormField
                    control={form.control}
                    name="dormitorios"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dormitorios</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. 2 "
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* bathroom input */}
                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Baños</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. 2"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* floors input */}
                  <FormField
                    control={form.control}
                    name="garageCarsQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Garage</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. 3 autos"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="calefaction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calefacción</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. Loza radiante"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>

                <Separator className="mt-5 mb-4" />

                <div className="grid grid-cols-3 gap-4 mb-2 md:gap-8 md:grid-cols-8 2xl:grid-cols-10">
                  <FormField
                    name="hasElevator"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>Ascensor</FormLabel>
                        <div className="flex items-center gap-1">
                          <Checkbox
                            id="form-rhf-checkbox-responses"
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}

                          />
                          {form.getValues("hasElevator") ? <span className="text-sm">Sí</span> : <span className="text-sm">No</span>}
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="hasPatio"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>Patio</FormLabel>
                        <div className="flex items-center gap-1">
                          <Checkbox
                            id="form-rhf-checkbox-responses"
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}

                          />
                          {form.getValues("hasPatio") ? <span className="text-sm">Sí</span> : <span className="text-sm">No</span>}
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="hasPool"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>Pileta</FormLabel>
                        <div className="flex items-center gap-1">
                          <Checkbox
                            id="form-rhf-checkbox-responses"
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}

                          />
                          {form.getValues("hasPool") ? <span className="text-sm">Sí</span> : <span className="text-sm">No</span>}
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="hasQuincho"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>Quincho</FormLabel>
                        <div className="flex items-center gap-1">
                          <Checkbox
                            id="form-rhf-checkbox-responses"
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}

                          />
                          {form.getValues("hasQuincho") ? <span className="text-sm">Sí</span> : <span className="text-sm">No</span>}
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="hasTerrace"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>Terraza</FormLabel>
                        <div className="flex items-center gap-1">
                          <Checkbox
                            id="form-rhf-checkbox-responses"
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}

                          />
                          {form.getValues("hasTerrace") ? <span className="text-sm">Sí</span> : <span className="text-sm">No</span>}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
              {/* caracteristicas info inputs */}




              <Button type="submit" className="w-full mt-12 mb-5 md:w-1/3">
                Crear propiedad
              </Button>

              <div className="px-10 rounded-md">
                <AlertDialog open={openCreated}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¡Propiedad creada!</AlertDialogTitle>
                      <AlertDialogDescription>
                        Hacé click en continuar para agregar fotos a la galería
                        del inmueble.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                      <AlertDialogAction onClick={handleGalleryRedirect}>
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </form>
          </Form>
        </>
      )}
    </>
  );
};

export default AddPropertyForm;
