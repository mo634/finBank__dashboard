import React from 'react'
import HeaderBox from '../components/HeadeBox'
import TotalBalanceBox from '../components/TotalBalanceBox'

const Home = () => {
    const loggedUser = { firstName: "mohamed" }
    return (
        <section className=" max-w-2xl w-full flex flex-col gap-y-[10px] main-container">

            {/*stat   Header  */}

            <header>
                <HeaderBox
                    type="greeting"
                    tittle="Welcome"
                    user={loggedUser?.firstName || "Guest"}
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

        </section>
    )
}

export default Home