"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { sidebarLinks } from '../../../constants'
import { cn } from '../../../lib/utils'
import { usePathname } from 'next/navigation'
const SideBar = ({ user }: User) => {
    const pathname = usePathname()

    return (
        <section className='main-container px-2 max-md:hidden'>
            {/*start header */}
            <Link className='mb-6 flex items-center gap-x-2' href={"/"}>
                <Image
                    src="/icons/icon.svg"
                    width={34}
                    height={34}
                    alt="n"
                    />

                <h1 className='text-2xl font-bold hidden lg:inline-block'>Horizon</h1>

            </Link>

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

                                    className={cn("link-text ", {
                                        "bg-bankGradient !text-[#ffff]": isActive
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
        </section>
    )
}

export default SideBar