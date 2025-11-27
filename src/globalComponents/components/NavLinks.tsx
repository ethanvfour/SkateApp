"use client";

import { links } from "@/features/navLinks/navLinks";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/utils/client";
import Link from "next/link";
import { useState } from "react";

const supabase = createClient();

export default function NavLinks() {
  const { username } = useUser();

  return (
    <nav id="nav-links" className="w-3/4 px-4 flex flex-row justify-around">
      {links.map((curr, i) => {
        if (curr.isDynamic) {
          return (
            <Link key={i} href={`${curr.nameOfRoute}/${username}`}>
              {curr.route}
            </Link>
          );
        } else {
          return (
            <Link key={i} href={`${curr.nameOfRoute}`}>
              {curr.route}
            </Link>
          );
        }
      })}
    </nav>
  );
}
