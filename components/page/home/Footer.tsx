import React from "react";
import Image from "next/image";
import logo from "@/public/logoblack2.png";
import { FaFacebook, FaFacebookF, FaFacebookSquare, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
const Footer = () => {
  return (
    <>
      <footer
        style={{ borderTop: "1px solid #ff00001a" }}
        className="relative pt-8 pb-6 bg-white"
      >
          <div className="container px-4 md:px-20 2xl:px-0 mx-auto">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full flex flex-col justify-center px-4 lg:w-5/12">
              {/* <h4 className="text-3xl fonat-semibold text-blueGray-700">
                HASCAR
              </h4> */}
              <Image
                src={logo}
                alt=""
                width={100}
                height={100}
                className="block md:hidden "
              />
              <Image
                src={logo}
                alt=""
                width={170}
                height={200}
                className="md:block hidden mb-4"
              />
              <h5 className="mt-3 mb-1  text-md md:text-lg text-black">
                Somos <b className="text-red-700">Altiva Propiedades</b>.
              </h5>
              <h5 className=" mb-2  text-md md:text-lg text-black">
                Hacemos realidad tu lugar en el mundo.
              </h5>
            </div>
            <div className="w-full  lg:w-7/12">
              <div className="flex flex-wrap mb-6 items-top">
                <div className="w-full px-4 mt-5 ml-auto lg:mt-0 lg:w-4/12">
                  <span className="block  text-lg font-bold text-black">
                    Accesos rápidos
                  </span>
                  <Separator
                    style={{ height: "2px" }}
                    className="mt-2  bg-red-800 w-9 sm:my-0"
                  />
                  <ul className="list-unstyled mt-4">
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-red-700 hover:text-blueGray-800"
                        href="https://www.creative-tim.com/presentation?ref=njs-profile"
                      >
                        Inmuebles
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-red-700 hover:text-blueGray-800"
                        href="https://www.creative-tim.com/presentation?ref=njs-profile"
                      >
                        Comprar
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-red-700 hover:text-blueGray-800"
                        href="https://blog.creative-tim.com?ref=njs-profile"
                      >
                        Alquilar
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-red-700 hover:text-blueGray-800"
                        href="https://www.github.com/creativetimofficial?ref=njs-profile"
                      >
                        Tasar propiedad
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-red-700 hover:text-blueGray-800"
                        href="https://www.github.com/creativetimofficial?ref=njs-profile"
                      >
                        Contacto
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="w-full px-4 mt-5 lg:mt-0 lg:w-4/12">
                  <span className="block  text-lg font-bold text-black">
                    Horario de atención
                  </span>
                  <Separator
                    style={{ height: "2px" }}
                    className="mt-2  bg-red-800 w-9 sm:my-0"
                  />
                  <ul className="list-unstyled mt-4">
                    <li>
                      <span className="block pb-2 text-sm font-medium text-red-700 hover:text-blueGray-800">
                        Lun. a Vie. de 10 a 17hs
                      </span>
                    </li>
                    <li>
                      <span className="block pb-2 text-sm font-medium text-red-700 hover:text-blueGray-800">
                        Sábados de 10 a 13hs
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="w-full px-4 mt-5 lg:mt-0 lg:w-4/12">
                  <span className="block  text-lg font-bold text-black">
                    Contacto
                  </span>
                  <Separator
                    style={{ height: "2px" }}
                    className="mt-2  bg-red-800 w-9 sm:my-0"
                  />
                  <ul className="list-unstyled mt-4">
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-red-700 hover:text-blueGray-800"
                        href="https://wa.me/5492235423025"
                      >
                        +54 9 223 542-2030
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium text-red-700 hover:text-blueGray-800"
                        href="https://wa.me/5492235423025"
                      >
                        +54 9 223 442-5537
                      </Link>
                    </li>
                    <li>
                      <span className="block pb-2 text-sm font-medium text-red-700 hover:text-blueGray-800">
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
          <div className="flex flex-col sm:flex-row gap-3 mb-3 md:mb-0 h-fit items-center justify-center md:justify-between">
            <div className="flex gap-2">
              <Link target="_blank" href={"https://www.instagram.com/"}>
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal transition-all hover:outline hover:outline-red-700 duration-300 bg-white rounded-lg shadow-lg outline-none text-lightBlue-600 align-center focus:outline-none"
                  type="button"
                >
                  <FaInstagram className="m-auto text-red-700" />
                </button>
              </Link>
              <Link target="_blank" href={"https://www.facebook.com/"}>
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal transition-all hover:outline hover:outline-red-700 duration-300 bg-white rounded-lg shadow-lg outline-none text-lightBlue-600 align-center focus:outline-none"
                  type="button"
                >
                  <FaFacebookSquare className="m-auto text-red-700" />
                </button>
              </Link>
              <Link target="_blank" href={"https://www.mercadolibre.com.ar/"}>
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal transition-all hover:outline hover:outline-red-700 duration-300 bg-white rounded-lg shadow-lg outline-none text-lightBlue-600 align-center focus:outline-none"
                  type="button"
                >
                  <FaWhatsapp className="m-auto text-red-700" />
                </button>
              </Link>
            </div>

            <div>
              <span className="text-black font-light text-sm ">
                Desarrollado por{" "}
                <Link
                  target="_blank"
                  href={"https://www.tosunian.dev"}
                  className="text-red-700 font-semibold group transition-all duration-300 hover:text-black"
                >
                  tosunian.dev
                  <Separator
                    style={{ height: "1px" }}
                    className="mt-2 group-hover:w-full transition-all duration-300 bg-red-800 w-4 sm:my-0"
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
