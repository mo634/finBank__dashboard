// src/lib/server/appwrite.js
// this file contain 
//  1.createSessionClient wich help to link app to appwrite account and set session 
//  2. createAdminClient wich help to init admin client and add more authouries to admin
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
  
    const session = cookies().get("my-custom-session");
    if (!session || !session.value) {
      throw new Error("No session");
    }
  
    client.setSession(session.value);
  
    return {
      get account() {
        return new Account(client);
      },
    };
  }
  
  export async function createAdminClient() {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
      .setKey(process.env.NEXT_APPWRITE_KEY!);
  
    return {
      get account() {
        return new Account(client);
      },
    };
  }