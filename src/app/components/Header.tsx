import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = ({applyMedia=false}:any) => {
    return (
        <>
            {/*start header */}
            <Link className='mb-6 flex items-center gap-x-2' href={"/"}>
                <Image
                    src="/icons/icon.svg"
                    width={34}
                    height={34}
                    alt="n"
                />

                <h1 className={`text-2xl font-bold ${applyMedia && "header-media"} `}>Horizon</h1>

            </Link>

            {/*end header */}
        </>
    )
}

export default Header