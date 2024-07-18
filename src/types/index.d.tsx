

declare interface HeaderBoxProps {
    type: "title" | "greeting"
    user?: string
    subtext: string
    tittle: string

}

declare interface TotalBalanceBoxProps {
    accounts: []
    totalBanks: number
    totalCurrentBalance: number
}


declare type User = {
    $id: string;
    email: string;
    userId: string;
    dwollaCustomerUrl: string;
    dwollaCustomerId: string;
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
};
declare interface MobileNavProps {
    user: User;
}


declare type SignUpParams = {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
    email: string;
    password: string;
};

declare type SignInParams = {
    email: string;
    password: string;
}

declare type PlaidLinkProps = {
    user: User,
    dwollaCustomerId?: string;
}

declare interface exchangePublicTokenProps {
    publicToken: string;
    user: User;
}

declare interface CreateFundingSourceOptions {
    customerId: string; // Dwolla Customer ID
    fundingSourceName: string; // Dwolla Funding Source Name
    plaidToken: string; // Plaid Account Processor Token
    _links: object; // Dwolla On Demand Authorization Link
}

declare type NewDwollaCustomerParams = {
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
};


declare type TransferParams = {
    sourceFundingSourceUrl: string;
    destinationFundingSourceUrl: string;
    amount: string;
};

declare type AddFundingSourceParams = {
    dwollaCustomerId: string;
    processorToken: string;
    bankName: string;
};


declare interface createBankAccountProps {
    accessToken: string;
    userId: string;
    accountId: string;
    bankId: string;
    fundingSourceUrl: string;
    shareableId: string;
}

declare interface getAccountsProps {
    userId: string;
}


declare type Bank = {
    $id: string;
    accountId: string;
    bankId: string;
    accessToken: string;
    fundingSourceUrl: string;
    userId: string;
    shareableId: string;
};
declare interface getUserInfoProps {
    userId: string;
}

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

declare interface getAccountProps {
    appwriteItemId: string;
}

declare interface getBankProps {
    documentId: string;
}

declare interface CreateTransactionProps {
    name: string;
    amount: string;
    senderId: string;
    receiverId: string;
    senderBankId: string;
    receiverBankId: string;
    email: string;
}
declare interface getTransactionsByBankIdProps {
    bankId: string;
}
declare type Transaction = {
    id: string;
    $id: string;
    name: string;
    paymentChannel: string;
    accountId: string;
    amount: number;
    pending: boolean;
    category: string;
    date: string;
    image: string;
    type: string;
    $createdAt: string;
    channel: string;
    senderBankId: string;
    receiverBankId: string;
};
declare interface getTransactionsProps {
    accessToken: string;
}
declare interface getInstitutionProps {
    institutionId: string;
}

declare interface RecentTransactionsProps {
    accounts: Account[];
    transactions: Transaction[];
    appwriteItemId: string;
    page: number;
}
declare interface TransactionTableProps {
    transactions: Transaction[];
}
declare interface CategoryBadgeProps {
    category: string;
}

declare type AccountTypes =
    | "depository"
    | "credit"
    | "loan "
    | "investment"
    | "other";


declare interface BankInfoProps {
    account: Account;
    appwriteItemId?: string;
    type: "full" | "card";
}

declare interface BankTabItemProps {
    account: Account;
    appwriteItemId?: string;
}
declare type Account = {
    id: string;
    availableBalance: number;
    currentBalance: number;
    officialName: string;
    mask: string;
    institutionId: string;
    name: string;
    type: string;
    subtype: string;
    appwriteItemId: string;
    shareableId: string;
};