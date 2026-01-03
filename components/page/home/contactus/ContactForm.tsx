"use client";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import contactImg from "@/public/contact.png";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { IBranch } from "@/app/models/branch";
import {
  FaFacebook,
  FaInstagram,
  FaLocationDot,
  FaTwitter,
} from "react-icons/fa6";
import { SiMercadopago } from "react-icons/si";
import { formSchema } from "@/app/schemas/contactForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import correct from "@/public/correct.png";
import Breadcrumbs from "./Breadcrumbs";
import Link from "next/link";
import { FaClock, FaFacebookSquare, FaPhone, FaWhatsapp, FaYoutube } from "react-icons/fa";
import LoaderFullscreen from "@/components/admin/LoaderFullscreen";
import Footer from "../Footer";
import styles from '@/app/css-modules/home.contact.module.css'
import { motion } from "framer-motion";


const ContactForm = () => {
  const [branches, setBranches] = useState<IBranch[]>();
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [openCreatedLead, setOpenCreatedLead] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      details: "",
    },
  });

  async function getBranches() {
    try {
      const branchesFetch = await fetch("/api/branches", {
        method: "GET",
        cache: "no-store",
      }).then((response) => response.json());
      setLoadingPage(false);
      setBranches(branchesFetch.branches);
    } catch (error) { }
  }

  async function saveLead(values: any) {
    setLoading(true);
    try {
      const saveLeadFetch = await fetch("/api/leads/page", {
        method: "POST",
        body: JSON.stringify(values),
      }).then((response) => response.json());
      setLoading(false);
      setOpenCreatedLead(true);
      form.setValue("details", "");
      form.setValue("email", "");
      form.setValue("name", "");
      form.setValue("surname", "");
      form.setValue("phone", "");
    } catch (error) {
      toast({
        description: "No se pudo enviar tu consulta",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    getBranches();
  }, []);

  return (
    <>
      {loadingPage && <LoaderFullscreen />}
      <div className="w-full gap-8 px-6 pt-5 mx-auto h-fit md:px-4 lg:px-24 2xl:px-64">
        <Breadcrumbs />
        <div className="flex flex-col items-center justify-center w-full gap-8 mx-auto mt-6 mb-32 h-fit md:gap-24 md:flex-row py-auto ">
          <div style={{ borderRadius: '13px' }} className={`${styles.sectionCont} flex md:flex-row flex-col mx-5 md:mx-0  h-full w-full  `}>
            {/* black overlay for background */}
            <motion.div
              style={{ borderRadius: '13px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 3, delay: 0, ease: "easeInOut" }}
              className="absolute left-0 z-10 w-full h-full bg-black"
            ></motion.div>
            {/* black overlay for background */}

            <div className="flex flex-col items-center w-full px-8 pb-20 pt-14 gap-14 md:gap-0 md:flex-row ">
              <div className="flex justify-center w-full md:w-1/2 ">
                <div style={{ borderRadius: '13px' }} className="z-20 flex flex-col w-full gap-10 px-0 mx-0 my-auto md:w-2/6 md:min-w-96 ">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <FaLocationDot color="red" />
                      <div className="flex flex-col">
                        <span className="text-xl font-semibold md:text-2xl">Visitanos en</span>
                        <Separator
                          style={{ height: "2px" }}
                          className="w-4 bg-red-800 "
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 pl-7">
                      <span className="text-sm font-light"> Av. Colón 2035 5A, Mar del Plata, Buenos Aires</span>

                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <FaPhone color="red" />
                      <div className="flex flex-col">
                        <span className="text-xl font-semibold md:text-2xl">Pongámonos en contacto</span>
                        <Separator
                          style={{ height: "2px" }}
                          className="w-4 bg-red-800 "
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 pl-7">
                      <span className="text-sm font-light">+54 9 223 542-2030</span>
                      <span className="text-sm font-light">+54 9 223 442-5537</span>
                      <span className="text-sm font-light">info@altivapropiedades.com.ar</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <FaClock color="red" />
                      <div className="flex flex-col">
                        <span className="text-xl font-semibold md:text-2xl">Nuestros horarios</span>
                        <Separator
                          style={{ height: "2px" }}
                          className="w-4 bg-red-800 "
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 pl-7">
                      <span className="text-sm font-light">Lunes a Viernes de 09:00 hs a 17:00 hs</span>
                      <span className="text-sm font-light">Sábados de 10:00 hs a 13:00 hs</span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="flex justify-center w-full md:w-1/2">
                <Card className="container z-20 w-full px-5 pt-5 pb-6 mx-0 my-auto bg-white rounded-lg shadow-lg h-fit md:w-2/6 md:min-w-96 md:px-6">
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold md:text-xl ">
                      Envianos tu consulta
                    </h2>                    <Separator
                      style={{ height: "2px" }}
                      className="w-4 bg-red-800 "
                    />
                  </div>

                  <Separator className="mt-3 mb-5" />
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(saveLead)}>
                      <div className="flex flex-col gap-5 mb-4 md:flex-row">
                        <div className="w-full md:w-1/2">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="block text-xs font-semibold xs:text-sm">
                                  Nombre
                                </FormLabel>
                                <FormControl>
                                  <input
                                    {...field}
                                    className="w-full px-4 py-2 text-xs font-normal transition duration-300 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                                    placeholder="Ingrese su nombre"
                                    id="name"
                                    type="text"
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full md:w-1/2">
                          <FormField
                            control={form.control}
                            name="surname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="block text-xs font-semibold xs:text-sm">
                                  Apellido
                                </FormLabel>
                                <FormControl>
                                  <input
                                    {...field}
                                    className="w-full px-4 py-2 text-xs font-normal transition duration-300 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                                    placeholder="Ingrese su apellido"
                                    id="surname"
                                    type="text"
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-xs font-semibold xs:text-sm">
                                Teléfono
                              </FormLabel>
                              <FormControl>
                                <input
                                  {...field}
                                  className="w-full px-4 py-2 text-xs font-normal transition duration-300 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                                  placeholder="Ingrese su número de teléfono"
                                  id="phone"
                                  type="number"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mb-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-xs font-semibold xs:text-sm">
                                Email
                              </FormLabel>
                              <FormControl>
                                <input
                                  {...field}
                                  className="w-full px-4 py-2 text-xs font-normal transition duration-300 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                                  placeholder="Ingrese su correo"
                                  id="email"
                                  type="text"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full mb-4">
                        <FormField
                          control={form.control}
                          name="details"
                          render={({ field }) => (
                            <FormItem className="w-full ">
                              <FormLabel className="block mb-0 text-xs font-semibold xs:text-sm">
                                Escribinos tu consulta
                              </FormLabel>
                              <textarea
                                {...field}
                                className="w-full px-4 py-2 text-xs font-normal transition duration-300 bg-gray-100 border border-gray-200 rounded-lg h-28 md:h-24 focus:outline-none focus:ring-2 focus:ring-red-400"
                                rows={4}
                                placeholder="Ingrese su consulta"
                                name="message"
                                id="message"
                              ></textarea>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {!loading && (
                        <button
                          className="w-full px-4 py-3 mt-1 text-xs font-semibold text-white transition duration-300 bg-red-800 rounded-md hover:bg-red-900"
                          type="submit"
                        >
                          Enviar consulta
                        </button>
                      )}

                      {loading && (
                        <>
                          <div
                            className="flex items-center justify-center w-full mt-1 overflow-y-hidden bg-white dark:bg-background"
                            style={{ zIndex: "99999999", height: "40px" }}
                          >
                            <div className=" loaderSmall"></div>
                          </div>
                        </>
                      )}
                    </form>
                  </Form>
                </Card>
              </div>

              <div className="absolute bottom-0 z-20 flex pb-8 gap-7 md:gap-5 ">
                <Link href={''}  >
                  <FaInstagram size={20} />
                </Link>
                <Link href={''}  >
                  <FaFacebookSquare size={20} />

                </Link>
                <Link href={''}  >
                  <FaYoutube size={20} />
                </Link>
              </div>

            </div>
          </div>


          {/* <Separator className="block mt-2 md:hidden" />

        <div className="flex w-full h-fit md:hidden">
          <div className="flex flex-col w-full gap-5 h-fit">
            <span className="text-xl font-semibold">Visitanos en</span>
            <div className="flex flex-col gap-3">
              {branches &&
                branches.map((branch) => (
                  <>
                    <div className="flex items-center gap-2 ">
                      <FaLocationDot size={17} />
                      <span className="text-sm">
                        {branch.address}, {branch.city}, {branch.state}.{" "}
                      </span>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div> */}

          <Dialog open={openCreatedLead} onOpenChange={setOpenCreatedLead}>
            <DialogContent className="py-10 sm:max-w-[625px]">
              <div className="flex flex-col items-center justify-center gap-4">
                <Image alt="" className="w-20" src={correct} />
                <div className="flex flex-col items-center gap-2 my-5">
                  <span className="text-xl font-semibold">
                    ¡Tu consulta fue enviada!
                  </span>
                  <span className="text-sm font-normal ">
                    Lo mas pronto posible nos pondremos en contacto para contestar
                    tu consulta
                  </span>
                </div>
              </div>
              <DialogFooter className="mx-auto ">
                <Button onClick={() => setOpenCreatedLead(false)} type="submit">
                  Entendido
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full mt-0 h-fit">
        <Footer />
      </div>

    </>
  );
};

export default ContactForm;
