"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '../../../constants'
import { usePathname } from 'next/navigation'
import { cn } from '../../../src/lib/utils'

const MobileSideBar = ({ user }: MobileNavProps) => {
    const pathname = usePathname()

    return (
        <section className=''>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={"/icons/hamburger.svg"}
                        height={34}
                        width={34}
                        alt="SideBar Icon"
                    />
                </SheetTrigger>

                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            {/*start header */}
                            <Link className='mb-6 flex items-center gap-x-2' href={"/"}>
                                <Image
                                    src="/icons/icon.svg"
                                    width={34}
                                    height={34}
                                    alt="n"
                                />
                                <h1 className='text-2xl font-bold'>Horizon</h1>
                            </Link>
                        </SheetTitle>
                    </SheetHeader>

                    <SheetDescription>
                        {/* start links */}
                        <nav className='flex flex-col gap-y-5'>
                            {
                                sidebarLinks.map((link) => {
                                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)
                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                href={link.route}
                                                className={cn("link-text ", {
                                                    "bg-bankGradient !text-[#ffff]": isActive
                                                })}
                                            >
                                                <div className="mr-3 relative w-[30px] h-[30px]">
                                                    <Image
                                                        src={link.imgURL}
                                                        alt={link.label}
                                                        fill
                                                        className={cn({
                                                            'brightness-[3]': isActive
                                                        })}
                                                    />
                                                </div>
                                                <p className=''>{link.label}</p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })
                            }
                        </nav>
                        {/* end links */}
                    </SheetDescription>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileSideBar
