import React from 'react'
import HeaderBox from '../components/HeadeBox'
import TotalBalanceBox from '../components/TotalBalanceBox'
import RightSide from '../components/RightSide'
import { getLoggedInUser } from '../../../lib/actions/auth.actions'
import { getAccount, getAccounts } from '../../../lib/actions/bank.actions'
import RecentTransactions from '../components/RecentTransactions'
import MobileRightSide from '../components/MobileRightSide'



const Home = async ({
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
        <section className=" main-container flex items-start gap-y-[10px]  ">
            {/* start Middle part  */}

            <div className=" w-full ">

                {/*stat   Header  */}
                <header>
                    <HeaderBox
                        type="greeting"
                        tittle="Welcome"
                        user={loggedUser || "Guest"}
                        subtext="Access & manage your account and transactions efficiently."
                    />
                </header>
                {/*end   Header  */}

                {/* start total balance box  */}
                <div>
                    <TotalBalanceBox
                        accounts={accountData}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance}
                    />
                </div>
                {/* end total balance box  */}

                {/* start recent transactions  */}

                <div className="">
                    <RecentTransactions
                        accounts={accountData}
                        appwriteItemId={appwriteItemId}
                        page={currentPage}
                        transactions={account?.transactions}
                    />
                </div>

                {/* end recent transactions  */}
            </div>
            {/* end  Middle part  */}

            {/* start rightSide */}

            <RightSide
                banks={[{}, {}]}
                user={loggedUser || "Guest"}
                email={loggedUser?.email || "Guest@gmail.com"}
            />

            {/* end rightSide */}




        </section>
    )
}

export default Home