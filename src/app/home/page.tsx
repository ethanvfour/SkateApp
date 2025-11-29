import { getRandomWelcomeMessage } from "@/features/homePage/messages";
import MapSpots from "./components/MapSpots";
import TrendingPosts from "./components/TrendingPosts";
import InfiniteCarousel from "./components/InfiniteCarousel";

export default function Home() {
  return (
    <div
      className="min-h-screen py-10 flex flex-col items-center gap-10"
      id="main-content"
    >
      <div className="w-full flex flex-row">
        <div
          className="flex-col flex justify-center items-start w-1/2 pl-10 gap-5"
          id="text-content"
        >
          <h1 className="text-6xl self-start italic font-bold bg-linear-to-br from-black to-gray-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p>{getRandomWelcomeMessage()}</p>
        </div>
        <div className="flex w-1/2 flex-col justify-center items-center">
          <MapSpots />
        </div>
      </div>
      <InfiniteCarousel />

      <TrendingPosts />
    </div>
  );
}
