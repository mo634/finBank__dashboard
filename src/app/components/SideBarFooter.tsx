import Image from 'next/image'
import React from 'react'

const SideBarFooter = ({ user }) => {

    console.log("user ")
    return (
        <div className='flex items-center justify-between'>

            <div className=" bg-[#ffff]  rounded-full w-fit shadow-md p-1   hidden lg:block">
                <span className='capitalize text-[#0079ff] text-[1.5rem] font-bold bg-gray-300 rounded-full py-1 px-3 flex justify-center items-center '>{user.name[0]}</span>
            </div>

            <div className="mx-2 hidden lg:block ">
                <p className='font-bold text-[1.2rem] capitalize'>{user.name}</p>
                <p className='text-gray-500 text-[.9rem]'>{user.email}</p>
            </div>

            <div className="" >
            <Image className='' src={"icons/logout.svg"} alt='logout' width={25} height={25} />
            </div>

        </div>
    )
}

export default SideBarFooter