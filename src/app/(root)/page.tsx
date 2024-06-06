import React from 'react'
import HeaderBox from '../components/HeadeBox'

const Home = () => {
    const loggedUser = { firstName: "mohamed" }
    return (
        <section className="flex flex-col gap-y-[10px] main-container">

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

        </section>
    )
}

export default Home