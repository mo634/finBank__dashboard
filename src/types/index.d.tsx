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