"use server"
import { ID, OAuthProvider } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite.config";
import { createDwollaCustomer } from "./dwolla.actions";
import { extractCustomerIdFromUrl, parseStringify } from "@/lib/utils";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation.js";

export async function signup({password , ...userData}: SignUpParams) {
    try {
      const { email, firstName, lastName } = userData;
      
      console.log(userData)
  
      let newUserAccount
  
      const { account, database } = await createAdminClient();
  
  
      // create appwrite account
       newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
  
      if (!newUserAccount) throw new Error('Error creating user')
  
      // create dwolla customer url and id 
      const dwollaCustomerUrl = await createDwollaCustomer({
        ...userData,
        type: 'personal'
      })
  
      if (!dwollaCustomerUrl) throw new Error('Error creating Dwolla customer')
  
  
      const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
  
      // store user data in user collection 
  
      const newUser = await database.createDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_USER_COLLECTION_ID!,
        ID.unique(),
        {
          ...userData,
          userId: newUserAccount.$id,
          dwollaCustomerId,
          dwollaCustomerUrl
        }
      )
  
      // create session on appwrite
      const session = await account.createEmailPasswordSession(email, password);
  
      // set cookie on browser by retreiving session's secrete
      
      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
  
      return parseStringify(newUser);
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  }
  
  export async function signIn({ email, password }: SignInParams) {
    try {
      const { account } = await createAdminClient();
      const response = await account.createEmailPasswordSession(email, password);
  
      cookies().set("appwrite-session", response.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
  
      return parseStringify(response);
    } catch (error) {
      console.error("Sign-in error:", error);
      throw new Error("Invalid email or password");
    }
  }
  
  export async function signUpWithGithub() {
    const { account } = await createAdminClient();
  
    const origin = headers().get("origin");
  
    const redirectUrl = await account.createOAuth2Token(
      OAuthProvider.Github,
      `${origin}/oauth`,
      `${origin}/signup`,
    );
  
    return redirect(redirectUrl);
  };
  export async function signOut() {
    try {
      const { account } = await createSessionClient();
  
      cookies().delete('appwrite-session');
  
      await account.deleteSession('current');
    } catch (error) {
      return null;
    }
  }
  export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error) {
      console.error("Get logged-in user error:", error);
    }
  }