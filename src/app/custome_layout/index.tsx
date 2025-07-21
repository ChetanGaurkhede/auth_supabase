"use client";
import { usePathname } from "next/navigation";
import path from "path";
import React from "react";
import PrivateLayout from "./private-layout";
import PublicLayout from "./public-layout";

const CustomeLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  if (pathName.includes("/accounts")) {
    return <PrivateLayout>{children}</PrivateLayout>;
  }
  return <PublicLayout>{children}</PublicLayout>;
};

export default CustomeLayout;
