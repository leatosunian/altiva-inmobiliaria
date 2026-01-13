import React from "react";
import Image from "next/image";
import logo from "@/public/logo2-1.png";
import { FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { IoLocationSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <>
      <footer
        style={{ borderTop: "1px solid #ff00001a", backgroundColor: "#0F2854" }}
        className="relative pt-8 pb-6 "
      >
        <div className="container px-4 mx-auto md:px-20 2xl:px-0">
          <div className="flex flex-wrap text-left text-white lg:text-left">
            <div className="flex flex-col justify-center w-full gap-4 px-4 lg:w-5/12">
              <Image
                src={logo}
                alt=""
                width={280}
                height={100}
                className="block md:hidden "
              />
              <Image
                src={logo}
                alt=""
                width={250}
                height={200}
                className="hidden md:block "
              />
              {/* <h5 className="mt-3 mb-1 text-black text-md md:text-lg">
                Somos <b className="text-red-700">Altiva Propiedades</b>.
              </h5> */}
              <h5 className="mb-2 text-base font-medium text-white ">
                Hacemos realidad tu lugar en el mundo.
              </h5>
              <div className="flex items-center text-white ">
                <IoLocationSharp />
                <span className="ml-2 text-sm font-medium text-white ">
                  Av. Colón 1234, Mar del Plata, Argentina.
                </span>
              </div>
            </div>
            <div className="w-full lg:w-7/12">
              <div className="flex flex-wrap mb-6 items-top">
                <div className="w-full px-4 mt-5 ml-auto lg:mt-0 lg:w-4/12">
                  <span className="block text-lg font-bold text-white">
                    Accesos rápidos
                  </span>
                  <Separator
                    style={{ height: "2px" }}
                    className="mt-2 bg-white w-9 sm:my-0"
                  />
                  <ul className="mt-4 list-unstyled">
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-white hover:text-white/80"
                        href="/properties"
                      >
                        Inmuebles
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-white hover:text-white/80"
                        href="/properties?search=Venta"
                      >
                        Comprar
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-white hover:text-white/80"
                        href="/properties?search=Alquiler"
                      >
                        Alquilar
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-white hover:text-white/80"
                        href="/contactus"
                      >
                        Contacto
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="w-full px-4 mt-5 lg:mt-0 lg:w-4/12">
                  <span className="block text-lg font-bold text-white">
                    Horario de atención
                  </span>
                  <Separator
                    style={{ height: "2px" }}
                    className="mt-2 bg-white w-9 sm:my-0"
                  />
                  <ul className="mt-4 list-unstyled">
                    <li>
                      <span className="block pb-2 text-sm font-medium text-white hover:text-white/80">
                        Lun. a Vie. de 10 a 17hs
                      </span>
                    </li>
                    <li>
                      <span className="block pb-2 text-sm font-medium text-white hover:text-white/80">
                        Sábados de 10 a 13hs
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="w-full px-4 mt-5 lg:mt-0 lg:w-4/12">
                  <span className="block text-lg font-bold text-white">
                    Contacto
                  </span>
                  <Separator
                    style={{ height: "2px" }}
                    className="mt-2 bg-white w-9 sm:my-0"
                  />
                  <ul className="mt-4 list-unstyled">
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-white hover:text-white/80"
                        href="https://wa.me/5492235423025"
                      >
                        +54 9 223 542-2030
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-white hover:text-white/80"
                        href="https://wa.me/5492235423025"
                      >
                        +54 9 223 442-5537
                      </Link>
                    </li>
                    <li>
                      <span className="block pb-2 text-sm font-medium text-white hover:text-white/80">
                        info@altivapropiedades.com.ar
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <hr className="my-6 border-blueGray-300" /> */}
          <Separator
            style={{ borderTop: "1px solid #ff00001a" }}
            className="mb-6 mt-7"
          />
          <div className="flex flex-col items-center justify-center gap-3 mb-3 sm:flex-row md:mb-0 h-fit md:justify-between">
            <div className="flex gap-2">
              <Link target="_blank" href={"https://www.instagram.com/"}>
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal text-white transition-all duration-300 bg-transparent border border-white rounded-lg shadow-none outline-none hover:outline hover:outline-white align-center focus:outline-none"
                  type="button"
                >
                  <FaInstagram className="m-auto text-white" />
                </button>
              </Link>
              <Link target="_blank" href={"https://www.facebook.com/"}>
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal text-white transition-all duration-300 bg-transparent border border-white rounded-lg shadow-none outline-none hover:outline hover:outline-white align-center focus:outline-none"
                  type="button"
                >
                  <FaFacebookSquare className="m-auto text-white" />
                </button>
              </Link>
              <Link target="_blank" href={"https://www.mercadolibre.com.ar/"}>
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal text-white transition-all duration-300 bg-transparent border border-white rounded-lg shadow-none outline-none hover:outline hover:outline-white align-center focus:outline-none"
                  type="button"
                >
                  <FaWhatsapp className="m-auto text-white" />
                </button>
              </Link>
            </div>

            <div>
              <span className="text-sm font-light text-white ">
                Desarrollado por{" "}
                <Link
                  target="_blank"
                  href={"https://www.tosunian.dev"}
                  className="font-semibold text-white transition-all duration-300 group hover:text-white/90"
                >
                  tosunian.dev
                  <Separator
                    style={{ height: "1px" }}
                    className="w-4 mt-2 transition-all duration-300 bg-white group-hover:w-full sm:my-0"
                  />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
