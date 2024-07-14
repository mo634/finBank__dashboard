import React from 'react'
import HeaderBox from '../components/HeadeBox'
import TotalBalanceBox from '../components/TotalBalanceBox'
import RightSide from '../components/RightSide'
import { getLoggedInUser } from '../../../lib/actions/auth.actions'
import { getAccounts } from '../../../lib/actions/bank.actions'



const Home = async () => {
    const loggedUser = await getLoggedInUser()

    const accounts = await getAccounts({ 
        userId: loggedUser.$id 
      })

      if(!accounts) return 

      const accountData = accounts?.data

    //   console.log("accounts",accounts)

    return (
        <section className=" max-h-screen main-container flex  gap-y-[10px] ">
            {/* start Middle part  */}

            <div className="w-[70%] max-xl:w-full ">

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

            </div>
            {/* end  Middle part  */}

            {/* start rightSide */}

            <div className="w-[30%] h-screen px-3 max-xl:hidden">
                <RightSide
                    banks={[{}, {}]}
                    user={loggedUser || "Guest"}
                    email={loggedUser?.email || "Guest@gmail.com"}
                />
            </div>

            {/* end rightSide */}



        </section>
    )
}

export default Home