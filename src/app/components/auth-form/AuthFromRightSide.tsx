import Image from 'next/image'
import React from 'react'

const AuthFromRightSide = () => {
    return (
        <div className="flex-1 flex items-center sticky top-0 h-screen w-full justify-end bg-sky-1  max-lg:hidden">
            <Image
                src={"/icons/auth-image.svg"}
                alt='auth-image'
                width={500}
                height={500}
                className=''
            />
        </div>
    )
}

export default AuthFromRightSide