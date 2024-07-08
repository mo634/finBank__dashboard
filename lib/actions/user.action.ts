"use server";
import { cookies, headers } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite.config.js"
import { Account, Client, ID, OAuthProvider } from "node-appwrite";
import { parseStringify } from "../../src/lib/utils";
import { redirect } from "next/navigation.js";

export async function signup(userData: SignUpParams) {
  try {
    const { email, password, firstName, lastName } = userData;
    const { account } = await createAdminClient();

    const newUser = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
    const session = await account.createEmailPasswordSession(email, password);

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
