"use server";
import { cookies, headers } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite.config.js"
import { Account, Client, ID, OAuthProvider } from "node-appwrite";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../../src/lib/utils";
import { redirect } from "next/navigation.js";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache.js";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

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

export async function createLinkToken(user: User) {
  try {
    console.log("create link token run")
    const tokenParams = {
      user: {
        client_user_id: user.$id
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }

    const response = await plaidClient.linkTokenCreate(tokenParams);
    console.log("response is ",response)

    return parseStringify({
      linkToken: response.data.link_token
    })
  } catch (error) {
    console.log("Error while creating link token", error)
  }

}

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {

    // store data in appwrite dataBase 

    //1. extract database of appwrite
    const { database } = await createAdminClient();

    //2.create new collection for bank document
    const bankAccount = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,// id for database
      process.env.APPWRITE_BANKS_COLLECTION_ID!, // id of doceument to insert collection
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      }

    )

    return parseStringify(bankAccount)



  } catch (error) {
    console.log("Error while creating bank account", error)
  }
}

export async function exchangePublicToken({ publicToken, user }: exchangePublicTokenProps) {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    })

    // store access token and itemID(unique bank id )
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // get account info using access token

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    // connect bank account to Dowlla for payment process (transfer money from account to another)

    //1. generate processor token 

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    //add funding source url "connect your bank account to dowlla"

    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;


    //  store bank account info in db
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });




  }
  catch (error) {
    console.log("Error while exchanging public token", error)
  }
}
