"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { carBrands } from "@/app/utils/carBrands";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { formSchema } from "@/app/schemas/addProductForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { IBranch } from "@/app/models/branch";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { IProperty } from "@/app/models/property";

const AddProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bathrooms: "",
      businessType: '',
      garageCarsQuantity: "",
      address: '',
      city: '',
      rooms: '',
      neighborhood: '',
      state: '',
      price: "",
      propertyType: '',
      metersSquare: "",
      coveredMetersSquare: "",
      expensas: "",
      antiquity: "",
      floors: "",
      description: '',
      currency: "USD",
      dormitorios: ""
    },
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

  // ADD NEW PRODUCT FUNCTION
  async function onSubmit(values: any) {
    setLoading(true);
    //values.uuid = uuidv4();
    values.show = true;
    values.status = 'Disponible'
    
    try {
      const vehicle = await fetch("/api/cars", {
        method: "POST",
        body: JSON.stringify(values),
      }).then((response) => response.json());
      console.log(vehicle);
      toast({
        description: "¡Propiedad creada!",
        variant: "default",
      });
      setOpenCreated(true);
      setCreatedProperty(vehicle);
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
              <div className="grid grid-cols-1 gap-4 mt-6 md:gap-10 md:grid-cols-2">
                {/* product name */}
                <div className="flex flex-col gap-4 md:gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de la publicación</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. Chevrolet Cruze LTZ 1.4T"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex col-span-2 gap-2">
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

                  {/* modelname and kilometers */}
                  <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
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


                  </div>
                </div>

                {/* year and brand */}
                <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
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
                            <SelectItem value="Venta">Venta</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domicilio</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa un domicilio"
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

                  <div className="flex w-full grid-cols-1 gap-5 md:grid-cols-2">
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

                    <FormField
                      control={form.control}
                      name="floors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pisos</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ej. 2"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-full grid-cols-1 gap-5 md:grid-cols-2">

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
                      name="expensas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expensas (ARS)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ej. 640,000"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-full grid-cols-1 gap-5 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="antiquity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Antiguedad</FormLabel>
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
                      name="dormitorios"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dormitorios</FormLabel>
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
                  </div>
                </div>
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full pr-0 mt-4 md:mt-8 md:w-1/2 md:pr-5 ">
                    <FormLabel>
                      Descripción <span className="">(opcional)</span>
                    </FormLabel>
                    <Textarea
                      {...field}
                      placeholder="Ingresa una descripción"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />


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

export default AddProductForm;
