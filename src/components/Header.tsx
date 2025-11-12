"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import spotsLogo from "../app/images/Spots_logo.png";
import { log } from "console";

export default function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loggedIn) router.replace("/login");
    }, [loggedIn, router]);

    if(!loggedIn) return <></>

    return (
        <header className="w-full border border-amber-400 flex justify-around items-center px-4 py-2 h-[125px]">
            <div className="relative h-[100px] w-[100px] flex-1">
                <Image 
                    src={spotsLogo}
                    alt="Spots Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </header>
    );
}