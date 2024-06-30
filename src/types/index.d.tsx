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