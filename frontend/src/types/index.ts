import { SiweMessage } from "siwe";

export type Wallet = {
  address: string;
  amount: string;
  symbol: string;
  destroy: () => void
}


export type Meme = {
  name: string;
  likes: number;
  id: string | number;
  poster: string;
  url: string;
};

export interface Message {
  message: SiweMessage;
  signature: `0x${string}`;
}

export interface CreateProfile{
    username: string;
    bio: string;
    pfp: string;
}


export interface Like {
    meme_id: Meme["id"];
    liker: string;
    likes: Meme["likes"];

}


// export interface IUnlike {
//     videoStatsId: string;
//     profileCapId: string;
// }

