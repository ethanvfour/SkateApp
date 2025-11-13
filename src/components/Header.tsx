import Image from "next/image";
import spotsLogo from "../app/images/Spots_logo.png";

export default function Header() {
  return (
    <header className="w-full flex justify-around items-center px-4 py-2 h-[125px]">
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
