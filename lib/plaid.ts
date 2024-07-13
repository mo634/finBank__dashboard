import {PlaidApi , Configuration , PlaidEnvironments} from "plaid"

// create config object 

const config = new Configuration({
    // determine which plaid env to use
    basePath: PlaidEnvironments.sandbox,

    // add  info that wil included with each req for calling api 
    baseOptions: {
        headers: {
            "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
            "PLAID-SECRET": process.env.PLAID_SECRET
        }
    }
})

export const plaidClient = new PlaidApi(config)