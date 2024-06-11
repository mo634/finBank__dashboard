import Image from 'next/image'
import React from 'react'

const BankCard = () => {
    return (

        <div className=" text-sm  bg-blue-500 bank-card flex justify-between ">

            {/* left side Card  */}
            <div className=" p-3  flex flex-col justify-between  " >
                <div className="">
                    <h2>Adrain JSM</h2>
                    <span>$123.50</span>
                </div>
                <div className="">

                    <div className=" mb-2 flex justify-between">
                        <span>Adrain JSM</span>
                        <span>**/**</span>
                    </div>

                    <div className="">
                        **** **** **** 1234
                    </div>

                </div>
            </div>

            {/* right side card */}
            <div className=" relative p-3 w-[70px] flex flex-col bg-blue-700 rounded-md ">
                <div className=" flex flex-col justify-between flex-1">
                    <Image
                        src="/icons/Paypass.svg"
                        width={20}
                        height={24}
                        alt="pay"
                    />
                    <Image
                        src="/icons/mastercard.svg"
                        width={45}
                        height={32}
                        alt="mastercard"
                        className=''
                    />
                </div>
                <Image
                    src="/icons/lines.png"
                    width={316}
                    height={190}
                    alt="lines"
                    className='absolute top-0 right-0 overflow-hidden h-full'
                />
            </div>
        </div>

    )
}

export default BankCard