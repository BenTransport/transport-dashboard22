"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";

const CompanyCard = () => {

  return (
    <div className="w-full min-w-40">
      <div className="cursor-pointer">
        <div className="flex items-center gap-2">
          <Link href={"/"}>
            <Image
              src={"/logo_new.png"}
              alt="Company Logo"
              width={100}
              height={100}
              className="h-auto w-48"
            />
          </Link>


        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
