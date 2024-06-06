declare interface HeaderBoxProps{
    type: "title" | "greeting"
    user?:string
    subtext:string
    tittle:string

}

declare interface TotalBalanceBoxProps{
    accounts: []
    totalBanks: number
    totalCurrentBalance: number
}