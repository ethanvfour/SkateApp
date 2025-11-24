import Image from "next/image";
import spotsLogo from "../../images/Spots_logo.png";
import SignUpForm from "./components/SignUpForm";
import StatsCounterRight from "./components/StatsCounterRight";


export default function signUp() {
  return (
    <div id="sign-up-page" className="w-full min-h-screen flex bg-white">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 py-12 overflow-y-auto">
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Create an account
          </h1>
          <p className="text-sm text-gray-600 mb-8 px-4">
            Show people out there what you can do! Make friends by finding people with similar interests!
          </p>
          <SignUpForm />
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 bg-black relative justify-center items-center overflow-hidden">
        <StatsCounterRight />
      </div>
    </div>
  );
}
