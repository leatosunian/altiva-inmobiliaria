import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

const Breadcrumbs = ({ name }: { name: string | undefined }) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/properties" className="font-medium">Propiedades</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="block xs:hidden">
            <BreadcrumbPage className="font-semibold " style={{ color: "#1C4D8D" }}>
              {name?.substring(0, 26)}...
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbItem className="hidden xs:block">
            <BreadcrumbPage className="font-semibold textCutOneLine" style={{ color: "#1C4D8D" }}>
              {name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default Breadcrumbs;
