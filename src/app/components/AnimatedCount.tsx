"use client"
import React from 'react'
import CountUp from 'react-countup';
const AnimatedCount = ({ amount }: { amount: number }) => {
    return (
        <CountUp end={amount}
            decimals={2}
            decimal="."
            prefix="$"
        />
    )
}


export default AnimatedCount