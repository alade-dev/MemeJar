import { home, profile, like } from "../assets/icons";
import { meme1, meme2, meme3, meme4, user } from "../assets/images";

export const AsideBar = [
  {
    id: 1,
    icon: home,
    title: "Home",
    active: true
  },

  {
    id: 3,
    icon: home,
    title: "Explore",
  },
  {
    id: 4,
    icon: profile,
    title: "Contest",
  },

  {
    id: 6,
    icon: home,
    title: "Saved",
  },
  // Add more course objects as needed
];

export const memes = [
  {
    id: 1,
    img: user,
    meme: meme1,
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, iste",
    like: like,
  },

  {
    id: 2,
    img: user,
    meme: meme3,
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, iste",
    like: like,
  },

  {
    id: 3,
    img: user,
    meme: meme4,
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, iste",
    like: like,
  },

  {
    id: 4,
    img: user,
    meme: meme2,
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, iste",
    like: like,
  },
];
