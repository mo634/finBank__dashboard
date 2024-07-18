"use server";
import { cookies, headers } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite.config.js"
import { Account, Client, ID, OAuthProvider, Query } from "node-appwrite";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../../src/lib/utils";
import { redirect } from "next/navigation.js";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache.js";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";



// ************ start needed functions to integrate with Plaid platform and dwolla ************

export async function createLinkToken(user: User) {
  try {
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

// ************ end needed functions to integrate with Plaid platform and dwolla ************

// ************ start get Bank data from appwrite DB ************

// get all banks for one user 
export const getBanks = async ({ userId }: getAccountsProps) => {
  try {
    // get appwrite database


    const { database } = await createAdminClient();


    const bankAccounts = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANKS_COLLECTION_ID!,
      [Query.equal("userId", [userId])]

    );

    return parseStringify(bankAccounts.documents)
  } catch (error) {
    console.log("error while getting accounts data  from appwrite database", error)
  }
}

// get specific bank info
export const getBank = async ({ documentId }: getBankProps) => {
  try {


    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANKS_COLLECTION_ID!,
      [Query.equal('$id', [documentId])]
    )

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error)
  }
}

// ************ end get Bank data from appwrite DB ************

// ************ start get user data from appwrite DB ************
export const getUserInfo = async ({ userId }: getAccountsProps) => {
  try {



    const { database } = await createAdminClient();


    const user = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    )



    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log("error while getting user account  data  from appwrite database", error)
  }
}
// ************ end get user  data from appwrite DB ************
