"use client";

type Post = {
  username: string;
  stars: number;
  dirtiness: number; // out of 5
  location: string;
  description: string;
};

const fakePosts: Post[] = [
  {
    username: "sk8rboi",
    stars: 5,
    dirtiness: 2,
    location: "Venice Beach, CA",
    description: "Pulled off a sick kickflip at the boardwalk!",
  },
  {
    username: "olliequeen",
    stars: 4,
    dirtiness: 3,
    location: "Brooklyn Banks, NY",
    description: "Nailed a high ollie over the rail.",
  },
  {
    username: "grindmaster",
    stars: 3,
    dirtiness: 5,
    location: "Southbank, London",
    description: "Epic grind session, got super dusty.",
  },
  {
    username: "fliptrick",
    stars: 5,
    dirtiness: 1,
    location: "MACBA, Barcelona",
    description: "Clean flip trick on the ledge.",
  },
  {
    username: "railsurfer",
    stars: 2,
    dirtiness: 4,
    location: "Love Park, Philly",
    description: "Slid the rail, but wiped out at the end.",
  },
];

import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { GiDustCloud } from "react-icons/gi";

function Card({ post }: { post: Post }) {
  return (
    <div className="bg-white shadow-md border-2 border-black p-5 mb-5 flex flex-col gap-2 max-w-[400px] mx-auto hover:scale-[1.03] transition-transform">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold uppercase text-sm text-gray-700 tracking-wide">
          @{post.username}
        </span>
        <span className="text-xs text-gray-500">{post.location}</span>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <span className="flex items-center gap-1 text-yellow-500">
          {[...Array(post.stars)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          {[...Array(post.dirtiness)].map((_, i) => (
            <GiDustCloud key={i} />
          ))}
        </span>
      </div>
      <p className="text-base text-gray-800 italic">{post.description}</p>
    </div>
  );
}

export default function TrendingPosts() {
  return (
    <div
      id="trending-posts"
      className="flex justify-center items-center w-full mt-8 flex-col"
    >
      <div className="flex flex-row flex-wrap w-3/4">
        {fakePosts.map((i, index) => (
          <Card key={index} post={i} />
        ))}
      </div>
      <Link href={"/posts"}
            className="p-3 bg-black text-white hover:scale-[1.05] transition-all">See all posts</Link>
    </div>
  );
}
