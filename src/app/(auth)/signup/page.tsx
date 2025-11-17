import Image from "next/image";
import spotsLogo from "../../images/Spots_logo.png";
import SignUpForm from "./SignUpForm";

export default function signUp() {
  return (
    <div
      id="sign-up-page"
      className="w-full h-[750px] py-6 flex flex-1 justify-center items-center gap-1"
    >
      <div className="border-2 border-gray-300 h-5/6 w-1/2 flex flex-col items-center text-center justify-around shadow-lg">
        <div className="w-[100px] h-[100px] relative">
          <Image
            src={spotsLogo}
            alt="Spots Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h4 className="text-3xl font-thin mb-4">
          Sign up and get connected with other people now!
        </h4>
        <p className="font-light px-5 text-sm">Show people out there what you can do! Make friends by finding people with similar interests! Find new spots that fits your style!</p>
        <SignUpForm />
      </div>
    </div>
  );
}
