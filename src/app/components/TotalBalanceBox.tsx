"use client"
import React from 'react'
import DoughnutChat from './DoughnutChat'
import AnimatedCount from './AnimatedCount'


const TotalBalanceBox = ({accounts, totalBanks, totalCurrentBalance}: TotalBalanceBoxProps) => {
    return (
        <div className='shadow-sm border flex p-3  '>
            {/* doughnut chart */}
            <div>
                <DoughnutChat/>
            </div>

            {/* total balance */}
            <div className='ml-3 self-center'>
                <h2 className=' mb-3 font-bold capitalize text-[#101828]'>Bank Accounts:{totalBanks}</h2>

                <p className='text-paragraphColor text-sm'>Total Current Balance</p>

                <span className='font-bold text-xl'>
                    <AnimatedCount amount={totalCurrentBalance}/>
                </span>

            </div>
        </div>
    )
}

export default TotalBalanceBox