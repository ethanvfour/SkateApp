import Image from "next/image";
import spotsLogo from "../app/images/Spots_logo.png";
import AccountSquare from "./components/AccountSquare";
import NavLinks from "./components/NavLinks";

export default function Header() {
  return (
    <header className="w-full">
      <div
        id="header-top"
        className="flex justify-between items-center px-4 py-2 h-[125px]"
      >
        <div className="relative h-[100px] w-[100px] ml-10">
          <Image
            src={spotsLogo}
            alt="Spots Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="min-w-1/4 h-full flex justify-center items-center relative gap-5">
          <AccountSquare />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <NavLinks />
      </div>
    </header>
  );
}
