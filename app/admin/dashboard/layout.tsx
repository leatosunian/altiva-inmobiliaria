"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/admin/dashboard/Navbar";
import { BsFillBuildingsFill, BsShop } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { TbMailQuestion, TbUserEdit } from "react-icons/tb";

/* -----------------------------
   Tipos
------------------------------ */
type MenuItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  adminOnly?: boolean;
  matchChildren?: boolean;
};

/* -----------------------------
   Configuración del menú
------------------------------ */
const menuItems: MenuItem[] = [
  {
    href: "/admin/dashboard/stock",
    label: "Propiedades",
    icon: BsFillBuildingsFill,
    matchChildren: true, // Marca como activo si la ruta actual es hija
  },
  {
    href: "/admin/dashboard/employees",
    label: "Empleados",
    icon: TbUserEdit,
    adminOnly: true,
    matchChildren: true,
  },
  {
    href: "/admin/dashboard/branches",
    label: "Sucursales",
    icon: BsShop,
    adminOnly: true,
    matchChildren: true,
  },
  {
    href: "/admin/dashboard/leads",
    label: "Leads",
    icon: FaUsers,
    matchChildren: true,
  },
  {
    href: "/admin/dashboard/questions",
    label: "Consultas",
    icon: TbMailQuestion,
    matchChildren: true,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session }: any = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div />;

  /* -----------------------------
     Helpers
  ------------------------------ */
  const isActive = (item: MenuItem) => {
    if (item.matchChildren) {
      return (
        pathname === item.href ||
        pathname.startsWith(item.href + "/")
      );
    }

    return pathname === item.href;
  };

  const linkClasses = (active: boolean) =>
    `
    flex items-center p-2 text-base font-normal capitalize rounded-lg transition-colors
    ${active
      ? "bg-black text-white dark:bg-white dark:text-black"
      : "text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-gray-100 dark:hover:text-black"
    }
  `;

  return (
    <>
      <Navbar />

      <div className="flex pt-16 overflow-hidden bg-white dark:bg-background">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 z-20 hidden w-64 h-full pt-16 lg:flex">
          <div className="flex flex-col flex-1 bg-white border-r border-gray-200 dark:bg-background dark:border-border">
            <div className="flex-1 px-3 py-4 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  if (item.adminOnly && session?.user?.role !== "ADMIN") {
                    return null;
                  }

                  const Icon = item.icon;
                  const active = isActive(item);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={linkClasses(active)}
                      >
                        <Icon className="text-lg" />
                        <span className="ml-3">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="relative w-full lg:ml-64">
          <main className="px-4 pt-6">
            <div className="w-full min-h-[calc(100vh-230px)]">
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-background dark:border-border sm:p-6">
                {children}
              </div>
            </div>
          </main>

          <p className="my-10 text-sm font-thin text-center text-white opacity-30">
            developed by tosunian.dev
          </p>
        </div>
      </div>
    </>
  );
}
