interface link {
  route: string;
  nameOfRoute: string;
  isDynamic?: boolean;
}

export const links: link[] = [
  {
    route: "Home",
    nameOfRoute: "/home",
  },
  {
    route: "Posts",
    nameOfRoute: "/posts",
  },
  {
    route: "Profile",
    nameOfRoute: "/profile",
    isDynamic: true,
  },
  {
    route: "Messages",
    nameOfRoute: "/messages",
  },
];
