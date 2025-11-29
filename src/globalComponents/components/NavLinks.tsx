"use client";

import { links } from "@/features/navLinks/navLinks";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function NavLinks() {
  const { username } = useUser();
  const pathname = usePathname();

  return (
    <nav className="relative flex items-center justify-center p-2">
      <ul className="flex items-center gap-8">
        {links.map((curr) => {
          const href = curr.isDynamic
            ? `${curr.nameOfRoute}/${username}`
            : curr.nameOfRoute;

          const isActive = pathname === href;

          return (
            <li key={curr.route} className="relative">
              <Link
                href={href}
                className={`relative z-10 block text-lg font-bold uppercase tracking-tight transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-[#939393] hover:text-white"
                }`}
              >
                {curr.route}
                
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
