"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { sidebarLinks } from '../../../constants'

import { usePathname } from 'next/navigation'
import Header from './Header'
import { cn } from '../../../src/lib/utils'
import SideBarFooter from './SideBarFooter'
const SideBar = ({ user }: User) => {
    const pathname = usePathname()

    return (
        <section className='flex flex-col justify-between h-screen main-container px-2 max-md:hidden '>
            
            <div className=" ">
                {/*start header */}
                <Header applyMedia={true} />
                {/*end header */}

                {/* start links */}
                <nav className='flex flex-col gap-y-5'>
                    {
                        sidebarLinks.map((link) => {
                            const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)
                            return (
                                <div className="" key={link.label}>
                                    <Link
                                        href={link.route}

                                        className={cn("link-text w-fit lg:w-full", {
                                            "bg-bankGradient !text-[#ffff] ": isActive
                                        })}
                                    >
                                        <div className="lg:mr-3 relative w-[30px] h-[30px]">
                                            <Image
                                                src={link.imgURL}
                                                alt={link.label}
                                                fill
                                                className={cn({
                                                    'brightness-[3]': isActive
                                                })}
                                            />
                                        </div>

                                        <p className=' hidden lg:block'>{link.label}</p>


                                    </Link>
                                </div>
                            )
                        }
                        )
                    }
                </nav>
                {/* end links */}
            </div>
            
            {/* start side bar footer */}
            <div className="">
                <SideBarFooter user = {user}/>
            </div>
            {/* end side bar footer */}
        </section>
    )
}

export default SideBar