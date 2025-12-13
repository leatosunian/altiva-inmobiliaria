"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/public/logo2-1.png";

const navigation = [
    { name: "Inmuebles", href: "#testimonials" },
    { name: "Venta", href: "#features" },
    { name: "Alquiler", href: "#ai-team" },
    { name: "Contacto", href: "/car-dealerships" },
]

export function GlassmorphismNavBlack() {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [hasLoaded, setHasLoaded] = useState(false)
    const lastScrollY = useRef(0)

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
        <nav
            className={`fixed top-4 md:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 md:-translate-y-24 opacity-0"
                } ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
                transition: hasLoaded ? "all 0.5s ease-out" : "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
        >
            {/* Main Navigation Bar */}
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
                                        className="font-medium transition-all duration-200 text-white hover:scale-105"
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <button
                                        key={item.name}
                                        onClick={() => scrollToSection(item.href)}
                                        className="font-medium transition-all duration-200 text-white hover:scale-105"
                                    >
                                        {item.name}
                                    </button>
                                ),
                            )}
                        </div>

                        {/* Desktop CTA Button */}
                        <div className="hidden md:block">
                            <button
                                className="flex items-center px-6 py-2 font-medium text-white transition-all duration-300 bg-red-800 rounded-full hover:bg-red-70 hover:scale-105 group"
                                onClick={() => scrollToSection("#contact")}
                            >
                                <span className="mr-2">Tasar propiedad</span>
                                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>

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
                    className={ ` mt-2 w-[90vw] max-w-xs mx-auto transition-all duration-400 ease-out ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
                        }`}
                >
                    <div className="p-4 border shadow-2xl bg-white/20 backdrop-blur-md border-white/20 rounded-2xl">
                        <div className="flex flex-col space-y-1">
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

                            {/* Divider */}
                            <div className="h-px bg-white/10" />

                            {/* Mobile CTA Button */}
                            <button
                                className="flex items-center justify-center px-6 py-3 mt-5 font-medium text-white transition-all duration-300 bg-red-800 rounded-full hover:scale-105 group"
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
        </nav>
    )
}
