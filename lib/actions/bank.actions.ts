import { parseStringify } from "@/lib/utils";
import { getBanks } from "./user.action";
import { plaidClient } from "../plaid";

export const getAccounts = async ({ userId }: getAccountsProps) => {
    try {
        // get banks from db
        const banks = await getBanks({ userId });
        
        const accounts = await Promise.all(
            banks?.map(async (bank: Bank) => {
                // get each account info from plaid
                const accountsResponse = await plaidClient.accountsGet({
                    access_token: bank.accessToken,
                });
                const accountData = accountsResponse.data.accounts[0];

                // get institution info from plaid
                // const institution = await getInstitution({
                //     institutionId: accountsResponse.data.item.institution_id!,
                // });

                const account = {
                    id: accountData.account_id,
                    availableBalance: accountData.balances.available!,
                    currentBalance: accountData.balances.current!,
                    // institutionId: institution.institution_id,
                    name: accountData.name,
                    officialName: accountData.official_name,
                    mask: accountData.mask!,
                    type: accountData.type as string,
                    subtype: accountData.subtype! as string,
                    appwriteItemId: bank.$id,
                    sharaebleId: bank.shareableId,
                };

                return account;
            })
        );

        const totalBanks = accounts.length;
        const totalCurrentBalance = accounts.reduce((total, account) => {
            return total + account.currentBalance;
        }, 0);

        return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
    } catch (error) {
        console.error("An error occurred while getting the accounts:", error);
    }
};