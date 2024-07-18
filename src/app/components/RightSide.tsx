import React from 'react';
import BankCard from './BankCard';
import Image from 'next/image';

const RightSide = ({ banks, user, email }: any) => {
    return (
        <aside className='sticky top-0 right-0  p-2 w-[30%] max-xl:hidden'>
            {/* start top part */}
            <div className="">
                <div className="relative">
                    <div className="backGroundSide" />

                    <div className="absolute bottom-[-40px] bg-[#ffff] left-2 rounded-full w-fit shadow-md py-4 px-3">
                        <span className='text-[#0079ff] text-[2rem] bg-gray-300 rounded-full py-2 px-3 capitalize'>{user.firstName[0]}</span>
                    </div>
                </div>

                <div className="mt-12">
                    <p className='font-bold text-xl'>{user.firstName ? user.firstName : "Guest"}</p>
                    <p className='text-gray-500'>{email ? email : "Guest@gmail.com"}</p>
                </div>
            </div>
            {/* end top part */}

            {/* start Middle part */}
            <div className="mt-12">
                <div className="flex justify-between">
                    <p className='font-bold'>My Banks</p>
                    <div className="">
                        <Image
                            src="/icons/plus.svg"
                            width={20}
                            height={20}
                            alt="plus"
                        />
                    </div>
                </div>

                <div className="relative mt-4">
                    {
                        // if there banks will render card ui
                        banks?.length > 0 && (
                            <div className='text-[#ffff]'>
                                {/* first card */}
                                <div className="absolute z-10">
                                    <BankCard user={user} />
                                </div>

                                {/* second card */}
                                <div className="absolute left-[20px] top-[23px]">
                                    {
                                        banks[1] && <BankCard user={user} />
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            {/* middle Middle part */}
        </aside>
    );
};

export default RightSide;
