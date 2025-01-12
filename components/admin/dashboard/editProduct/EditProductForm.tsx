"use client";

import { Camera, Check, ChevronsUpDown } from "lucide-react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { carBrands } from "@/app/utils/carBrands";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { formSchema } from "@/app/schemas/editProductForm";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import ImageGallery from "./ImageGallery";
import { CardContent } from "@/components/ui/card";
import React from "react";
import { IBranch } from "@/app/models/branch";
import { IProperty } from "@/app/models/property";

const EditProductForm = ({ uuid }: { uuid: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bathrooms: "",
      businessType: '',
      garageCarsQuantity: "",
      address: '',
      city: '',
      neighborhood: '',
      state: '',
      price: "",
      propertyType: '',
      metersSquare: "",
      coveredMetersSquare: "",
      uncoveredMetersSquare: "",
      expensas: "",
      antiquity: "",
      floors: "",
      description: '',
      currency: "USD",
      status: '',
      show: true,
      imagePath: '',
      rooms: ''
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [propertyData, setPropertyData] = useState<IProperty>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollToDiv = searchParams.get("scrollToDiv");
  const [fileToUpload, setFileToUpload] = useState<File>();
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState<IBranch[]>();
  const [buttonLoading, setButtonLoading] = useState(false);

  async function getVehicleData() {
    try {
      const vehicle = await fetch("/api/cars/" + uuid, {
        method: "GET",
      }).then((response) => response.json());
      console.log(vehicle);

      if (vehicle) {
        setPropertyData(vehicle);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) { }
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
    getVehicleData();
    getBranches();
  }, []);

  useEffect(() => {
    if (scrollToDiv) {
      const element = document.getElementById(scrollToDiv);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {

      }
    }
  }, [scrollToDiv]);

  async function handleEdit() {
    setButtonLoading(true);
    try {
      const vehicle = await fetch("/api/cars/" + uuid, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.getValues()),
      }).then((response) => response.json());
      if (vehicle) {
        setPropertyData(vehicle);
        toast({ description: "¡Vehículo editado!", variant: "default" });
        setButtonLoading(false);
        router.refresh();
      }
    } catch (error) {
      setButtonLoading(false);
      toast({
        description: "Error al editar vehículo",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (propertyData) {
      form.setValue("name", propertyData!.name);
      form.setValue("bathrooms", propertyData!.bathrooms.toString());
      form.setValue("businessType", propertyData!.businessType.toString());
      form.setValue("garageCarsQuantity", propertyData!.garageCarsQuantity.toString());
      form.setValue("address", propertyData!.address.toString());
      form.setValue("city", propertyData!.city);
      form.setValue("neighborhood", propertyData!.neighborhood);
      form.setValue("currency", propertyData!.currency);
      form.setValue("price", propertyData!.price.toString());
      form.setValue("status", propertyData!.status);
      form.setValue("show", propertyData!.show);
      form.setValue("state", propertyData!.state);
      form.setValue("propertyType", propertyData!.propertyType);
      form.setValue("metersSquare", propertyData!.metersSquare.toString());
      form.setValue("description", propertyData!.description);
      form.setValue("coveredMetersSquare", propertyData!.coveredMetersSquare.toString());
      form.setValue("expensas", propertyData!.expensas.toString());
      form.setValue("antiquity", propertyData!.antiquity.toString());
      form.setValue("floors", propertyData!.floors.toString());
      form.setValue("imagePath", propertyData!.imagePath);
      form.setValue("rooms", propertyData!.rooms.toString());
      form.setValue("dormitorios", propertyData!.rooms.toString());

    }
    console.log(form.getValues());
  }, [propertyData]);

  const handleClick = () => {
    const fileInput = document.querySelector(".inputField") as HTMLElement;
    if (fileInput != null) {
      fileInput.click();
    }
  };

  const handleFileInputRefClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let image;

    if (e.target.files?.length != undefined) {
      image = e.target.files[0];
      if (
        image.type == "image/jpeg" ||
        image.type == "image/png" ||
        image.type == "image/webp" ||
        image.type == "image/jpg"
      ) {
        console.log(image);
        //updateProfileImage(image);
      } else {
      }
    }
  };

  async function uploadImage(file: File) {
    if (!file) return;
    try {
      let formData = new FormData();
      formData.append("gallery_images", file);
      formData.append("carID", uuid as string);
      console.log(formData)
      const uploadResponse = await fetch("/api/gallery/thumbnail", {
        method: "POST",
        body: formData,
      }).then((response) => response.json());
      if (uploadResponse.msg === "THUMBNAIL_UPLOADED") {
        toast({ description: "¡Imagen cambiada!", variant: "default" });
        getVehicleData();
      }
    } catch (error) {
      toast({
        description: "Error al cambiar imagen",
        variant: "destructive",
      });
    }
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEdit)} className="">
            <div className="flex flex-col w-full gap-10 md:flex-row">
              <div className="flex flex-col w-full gap-4 md:w-1/2">
                <span className="text-xl font-semibold">
                  Información de la publicación
                </span>
                {/* thumbnail */}
                <div
                  onClick={handleClick}
                  className="w-3/4 mx-auto my-5 rounded-full md:w-3/5 inputFileFormProfile"
                  title="Cambiar logo de empresa"
                >
                  {propertyData?.imagePath === "" && (
                    <>
                      <CardContent className="py-6">
                        <Button
                          variant="outline"
                          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50"
                          onClick={handleFileInputRefClick}
                          type="button"
                        >
                          <Camera className="w-12 h-12 mb-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Seleccionar miniatura
                          </span>
                        </Button>
                        <Input
                          type="file"
                          className="sr-only"
                          ref={fileInputRef}
                          name="image_file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files![0];
                            console.log(file);
                            uploadImage(file);
                          }}
                        />
                      </CardContent>
                    </>
                  )}
                  {propertyData?.imagePath !== "" && (
                    <>
                      <Image
                        width={500}
                        height={500}
                        className="w-full rounded-lg "
                        src={propertyData?.imagePath!}
                        alt=""
                        unoptimized
                      />
                      <input
                        onChange={(e) => {
                          const file = e.target.files![0];
                          console.log(file);
                          uploadImage(file);
                        }}
                        type="file"
                        className="inputField"
                        accept="image/*"
                        hidden
                      />
                    </>
                  )}
                </div>
                {/* product name */}
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
                  {/* currency */}
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem className="w-fit">
                        <FormLabel>Precio</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
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

                  {/* price */}
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
                {/* description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full h-fit">
                      <FormLabel>
                        Descripción <span className="">(opcional)</span>
                      </FormLabel>
                      <Textarea
                        {...field}
                        className=" min-h-[400px]"
                        placeholder="Ingresa una descripción"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <div className="grid grid-cols-1 gap-4 mt-2 md:gap-10 md:grid-cols-2">
                  {/* product name */}
                  <div className="flex flex-col gap-4 md:gap-8">


                    {/* modelname and kilometers */}
                    <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-1">
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
                                <SelectItem value="Casa">Automóvil</SelectItem>
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
                              <SelectItem value="Alquiler temporal">Alquiler temporal</SelectItem>
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



                    </div>
                  </div>

                  {/* year and brand */}
                  <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-1">

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
                    </div>

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


              </div>
              <div className="hidden w-1/2 md:block">
                <span className="hidden text-xl font-semibold md:block">
                  Galería de imágenes
                </span>

                <ImageGallery />
              </div>
            </div>




            <div className="grid grid-cols-1 gap-4 my-7 md:gap-8 md:grid-cols-2">
              {/* show product */}
              <FormField
                control={form.control}
                name="show"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <FormLabel className="text-base">
                        Mostar producto
                      </FormLabel>
                      <FormDescription>
                        Podés ocultar tu producto hasta que lo desees sin
                        eliminarlo.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:gap-8 md:grid-cols-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Estado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Disponible">Disponible</SelectItem>
                        <SelectItem value="Reservado">Reservado</SelectItem>
                        <SelectItem value="Vendido">Vendido</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            {buttonLoading && (
              <>
                <div
                  className="flex items-center justify-center w-full mt-10 overflow-y-hidden bg-white md:w-1/4 dark:bg-background"
                  style={{ zIndex: "99999999", height: "40px" }}
                >
                  <div className=" loaderSmall"></div>
                </div>
              </>
            )}

            {!buttonLoading && (
              <Button type="submit" className="w-full mt-10 md:w-1/4">
                Guardar cambios
              </Button>
            )}
          </form>
        </Form>
      )}
    </>
  );
};

export default EditProductForm;
