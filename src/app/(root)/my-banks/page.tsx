import HeaderBox from '@/app/components/HeadeBox'
import React from 'react'
import { getLoggedInUser } from '../../../../lib/actions/auth.actions'
import { getAccounts } from '../../../../lib/actions/bank.actions'
import BankCard from '@/app/components/BankCard'

const MyBanks = async () => {

    const loggedUser = await getLoggedInUser()

    const accounts = await getAccounts({
        userId: loggedUser?.$id
    })

    return (
        <section className=' p-[2%]'>
            <HeaderBox type="title" tittle="My Banks" subtext="Effortlessly Manage Your Banking Activities"
            />

            <p>Your cards</p>

            {/* start render banks card  */}
            <div className="  flex flex-wrap text-white gap-2 ">
                {
                    accounts?.data?.map((a: Account) => (
                        <BankCard user={loggedUser} account={a} />
                    )
                    )
                }
            </div>
            {/* end  render banks card  */}



        </section>
    )
}

export default MyBanks