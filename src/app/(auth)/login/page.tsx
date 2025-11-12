import Image from "next/image";
import spotsLogo from "../../images/Spots_logo.png";
import LoginForm from "./LoginForm";
import ImageCarousel from "./ImageCarousel";

export default function LogIn() {
  return (
    <div id="log-in-page" className="w-full h-[750px] py-6 flex flex-1">
      <div className="w-1/2 flex flex-col justify-evenly items-center">
        <ImageCarousel />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center text-center">
        <div className="relative w-[150px] h-[150px]">
          <Image
            src={spotsLogo}
            alt="Spots Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h4 className="text-2xl">Get connected with other skaters now!</h4>
        <p className="mt-2 text-sm text-gray-600">
          Join local events, find spots, share spots, and share your clips.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
