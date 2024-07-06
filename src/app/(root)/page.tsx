import React from 'react'
import HeaderBox from '../components/HeadeBox'
import TotalBalanceBox from '../components/TotalBalanceBox'
import RightSide from '../components/RightSide'
import { getLoggedInUser } from '../../../lib/actions/user.action.ts'



const Home = async () => {
    const loggedUser = await getLoggedInUser()
    console.log(loggedUser?.name)
    return (
        <section className="main-container flex  gap-y-[10px]">
            {/* start Middle part  */}

            <div className="w-[70%] max-xl:w-full ">

                {/*stat   Header  */}
                <header>
                    <HeaderBox
                        type="greeting"
                        tittle="Welcome"
                        user={loggedUser?.name || "Guest"}
                        subtext="Access & manage your account and transactions efficiently."
                    />
                </header>
                {/*end   Header  */}

                {/* start total balance box  */}
                <div>
                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250.35}
                    />
                </div>
                {/* end total balance box  */}

            </div>
            {/* end  Middle part  */}

            {/* start rightSide */}

            <div className="w-[30%] h-screen px-3 max-xl:hidden">
                <RightSide
                    banks={[{}, {}]}
                    user={loggedUser?.name || "Guest"}
                    email={loggedUser?.email || "Guest@gmail.com"}
                />
            </div>

            {/* end rightSide */}



        </section>
    )
}

export default Home