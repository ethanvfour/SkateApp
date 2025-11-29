import Image from "next/image";
import spotsLogo from "../../images/Spots_logo_black.png";
import LoginForm from "./components/LoginForm";
import ImageCarousel from "./components/ImageCarousel";



export default function LogIn() {
  return (
    <div id="log-in-page" className="w-full min-h-screen flex bg-white">
      <div className="hidden lg:flex w-1/2 bg-black relative justify-center items-center overflow-hidden">
        <ImageCarousel />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 py-12">
        <div className="w-full max-w-md flex flex-col items-center text-center">
          <div className="relative w-24 h-24 mb-6">
            <Image
              src={spotsLogo}
              alt="Spots Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600 mb-8">
            Join local events, find spots, share spots, and share your clips.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
