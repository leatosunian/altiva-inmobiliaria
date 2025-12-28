"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/public/logo2-1.png";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const navigation = [
  { name: "Inmuebles", href: "/properties" },
  { name: "Venta", href: "/properties?search=Venta" },
  { name: "Alquiler", href: "/properties?search=Alquiler" },
  { name: "Contacto", href: "/contact" },
]

export function GlassmorphismNavBlack() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const lastScrollY = useRef(0)
  const [searchValue, setSearchValue] = useState<string>("");
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const handleSearch = () => {
    console.log(searchValue);
    const params = new URLSearchParams(searchParams);
    if (searchValue !== "") {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    push(`/properties/?${params.toString()}`);
    console.log(params.toString());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true)
    }, 100)

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY

        if (currentScrollY > 50) {
          if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
            setIsVisible(false)
            setIsOpen(false) // Close mobile menu when hiding navbar
          } else if (lastScrollY.current - currentScrollY > 5) {
            setIsVisible(true)
          }
        } else {
          setIsVisible(true)
        }

        lastScrollY.current = currentScrollY
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar, { passive: true })

      return () => {
        window.removeEventListener("scroll", controlNavbar)
        clearTimeout(timer)
      }
    }

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      return
    }

    const element = document.querySelector(href)
    if (element) {
      const rect = element.getBoundingClientRect()
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
      const elementAbsoluteTop = rect.top + currentScrollY
      const navbarHeight = 100
      const targetPosition = Math.max(0, elementAbsoluteTop - navbarHeight)

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  return (

    <>
      {/* Main Navigation Bar */}
      <motion.div
        style={{ zIndex: "99999999" }}
        className="fixed z-50 flex-shrink-0 w-full h-fit top-4 md:top-4"
        transition={{ duration: 0.5, ease: "circInOut", delay: 0.2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-[95vw] max-w-lg md:max-w-4xl mx-auto">
          <div className="px-4 py-3 border rounded-full bg-black/50 backdrop-blur-md border-white/20 md:px-6 md:py-2">
            <div className="flex items-center justify-between">
              {/* Logo */}

              <Link href="/" className="flex items-center transition-transform duration-200 hover:scale-105">
                <div className="flex items-center justify-center w-24 h-10 ml-2 md:w-28 md:h-12">
                  <Image
                    src={logo}
                    alt="Cliste"
                    width={80}

                    className="object-contain w-full h-full"
                  />
                </div>
              </Link>
              {/* Desktop Navigation */}
              <div className="items-center hidden space-x-8 md:flex">
                {navigation.map((item) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="font-medium text-white transition-all duration-200 hover:scale-105"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="font-medium text-white transition-all duration-200 hover:scale-105"
                    >
                      {item.name}
                    </button>
                  ),
                )}
              </div>

              {/* search input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="hidden w-fit md:block"
              >
                <div className="flex">
                  <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Buscar propiedad
                  </label>

                  <div className="relative w-full">
                    <input
                      type="text"
                      onChange={(e) => setSearchValue(e.target.value)}
                      id="search-dropdown"
                      className="z-20 block w-full px-2 py-1.5 text-xs text-gray-900 border border-gray-300  bg-gray-50 border-s-gray-50 border-s-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 rounded-full dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-red-500"
                      placeholder="Buscar propiedad"
                    />
                    <button
                      type="submit"
                      onClick={handleSearch}
                      className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-red-700 rounded-e-full border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      <svg
                        className="w-2.5 h-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
              {/* search input */}

              {/* Desktop CTA Button */}
              {/* <div className="hidden md:block">
                        <button
                            className="flex items-center px-6 py-2 font-medium text-white transition-all duration-300 bg-red-800 rounded-full hover:bg-red-70 hover:scale-105 group"
                            onClick={() => scrollToSection("#contact")}
                        >
                            <span className="mr-2">Tasar propiedad</span>
                            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div> */}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white transition-transform duration-200 md:hidden hover:scale-110"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                      }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                      }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="relative md:hidden">
          {/* Backdrop overlay - closes menu when tapping outside */}
          <div
            className={`fixed inset-0   transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            onClick={() => setIsOpen(false)}
            style={{ zIndex: -1 }}
          />

          {/* Menu container with glassmorphism effect */}
          <div
            className={` mt-2 w-[90vw] max-w-xs mx-auto transition-all duration-400 ease-out ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
              }`}
          >
            <div className="p-4 border shadow-2xl bg-black/50 backdrop-blur-md border-white/20 rounded-2xl">
              <div className="flex flex-col space-y-2 ">
                {navigation.map((item, index) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="px-3 py-3 font-medium text-left transition-all duration-200 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? "translateX(0)" : "translateX(-10px)",
                        transition: `all 0.3s ease-out ${index * 50 + 100}ms`,
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="px-3 py-3 font-medium text-left transition-all duration-200 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? "translateX(0)" : "translateX(-10px)",
                        transition: `all 0.3s ease-out ${index * 50 + 100}ms`,
                      }}
                    >
                      {item.name}
                    </button>
                  ),
                )}
              </div>
              <div className="flex flex-col gap-4 pt-2 space-y-1">
                {/* Divider */}
                <div className="h-px bg-white/10" />

                {/* Mobile CTA Button */}
                <button
                  className="flex items-center justify-center px-6 py-3 font-medium text-white transition-all duration-300 bg-red-800 rounded-full mt-7 hover:scale-105 group"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                    transition: `all 0.3s ease-out ${navigation.length * 50 + 150}ms`,
                  }}
                  onClick={() => scrollToSection("#contact")}
                >
                  <span className="mr-2">Tasar propiedad</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
