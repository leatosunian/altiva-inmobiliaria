import LoginForm from "@/components/admin/login/LoginForm";
import Image from "next/image";
import logo from "@/public/logo2-1.png";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Iniciar sesión | Panel de administración",
  description:
    "Distrito Automotor, concesionaria de vehículos ubicada en Mar del Plata, Buenos Aires",
};

const Login = () => {
  return (
    <>
      <div className="flex justify-center w-full h-fit">
        <Image alt="as" src={logo} className="mx-auto mt-6" width={200} />
      </div>
      <div
        style={{ height: "calc(100vh - 70px)" }}
        className="flex flex-col items-center justify-center w-full dark"
      >
        <div className="flex flex-col gap-8 w-fit h-fit dark">
          <span className="text-2xl font-normal text-left ">
            Iniciar sesión
          </span>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
