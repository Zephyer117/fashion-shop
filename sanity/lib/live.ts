import "server-only";

import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";

//set viwer token
const token = process.env.SANITY_API_READ_TOKEN;

if(!token){
  throw new Error("Missing Sanity API READ TOKEN");
}

export const { sanityFetch, SanityLive} = defineLive({
  client: client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0 
  }
})  