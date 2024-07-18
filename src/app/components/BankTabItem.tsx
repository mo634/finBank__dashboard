"use client"
import { useSearchParams, useRouter } from 'next/navigation'
import { cn, formUrlQuery } from "@/lib/utils";
import React from 'react'

const BankTabItem = (
    {
        account,
        appwriteItemId
    }: BankTabItemProps
) => {
    const searchParams = useSearchParams()

    const router = useRouter()

    const isActive = account.appwriteItemId === appwriteItemId

    const handleBankChange = () => {
        // when click push id to url 
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "id",
            value: account?.appwriteItemId,
        })

        console.log(newUrl)

        router.push(newUrl, { scroll: false });
    }

    return (
        <div
            onClick={handleBankChange}
        >
            <p className={cn("font-bold", isActive ? "text-bankGradient" : "text-gray-500")}>{account.name}</p>
        </div>
    )
}

export default BankTabItem