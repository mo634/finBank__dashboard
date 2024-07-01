// src/lib/actions/user.action.ts
"use server";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite.ts"
import { ID } from "node-appwrite";
import { parseStringify } from "../utils.ts"; 



export async function signup(userData: SignUpParams) {
  try {

    const { email, password } = userData;

    const { account } = await createAdminClient();

    console.log("this is account",account)

    const newUser = await account.create(ID.unique(), email, password, `${userData.firstName} ${userData.lastName}`);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.log("Error", error);
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
    console.error('Sign-in error:', error);
    throw new Error('Invalid email or password');
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.log("Error" , error)
  }
}
