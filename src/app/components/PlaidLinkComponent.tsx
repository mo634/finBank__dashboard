"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { createLinkToken, exchangePublicToken } from '../../../lib/actions/user.action'

const PlaidLinkComponent = ({ user }) => {
    const router = useRouter()
    const [token, setToken] = useState("")

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);

            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user]);

    const onSuccess = useCallback(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })
        router.push('/')
    }, [user, router])

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    const { open, ready } = usePlaidLink(config)

    return (
        <Button
            className="w-full bg-bankGradient my-2"
            onClick={() => open()}
            disabled={!ready} // The button will be enabled when `ready` is true
        >
            Link to bank account
        </Button>
    )
}

export default PlaidLinkComponent
