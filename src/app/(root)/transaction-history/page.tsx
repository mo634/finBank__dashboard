import HeaderBox from '@/app/components/HeadeBox'
import React from 'react'
import { getLoggedInUser } from '../../../../lib/actions/auth.actions'
import { getAccount, getAccounts } from '../../../../lib/actions/bank.actions'
import { formatAmount } from '@/lib/utils'
import TransactionInfo from '@/app/components/TransactionInfo'


const TransactionHistory = async ({
    searchParams: { id, page },
}: SearchParamProps) => {
    const currentPage = Number(page as string) || 1

    const loggedUser = await getLoggedInUser()

    const accounts = await getAccounts({
        userId: loggedUser?.$id
    })

    if (!accounts) return

    const accountData = accounts?.data

    const appwriteItemId = (id as string) || accountData[0]?.appwriteItemId

    const account = await getAccount({ appwriteItemId })

    return (
        <section className=' main-container'>
            {/* start header  */}
            <header>
                <h1 className=' capitalize font-bold text-xl mb-2'>{account?.data.name}</h1>
                <p className=' text-sm text-gray-600'>  {account?.data.officialName}</p>
            </header>

            {/* end header  */}

            {/* start middle part  */}
            <div className=" bg-bankGradient flex justify-between p-2 rounded-md text-white my-4">

                <div className="  flex flex-col gap-3">
                    <p>{account?.data.name}</p>
                    <p> {account?.data.officialName}</p>
                    <p>●●●● ●●●● ●●●● {account?.data.mask}</p>
                </div>

                <div className="bg-blue-500 border-2 rounded-md border-white p-2 flex items-center px-5 flex-col justify-center">
                    <p className="text-lg">current balance</p>

                    <p>{formatAmount(account?.data.currentBalance)}</p>
                </div>


            </div>

            {/* end middle part  */}

            {/* start transaction table  */}
            <div className="">
                <h1>Transaction History</h1>

                <TransactionInfo
                    transactions={account?.transactions}
                />
            </div>
            {/* end  transaction table  */}


        </section>
    )
}

export default TransactionHistory