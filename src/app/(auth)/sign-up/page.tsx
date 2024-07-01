import AuthFrom from '@/app/components/AuthFrom'
import Header from '@/app/components/Header'
import React from 'react'
import { getLoggedInUser } from '../../../../lib/actions/user.action'

const SignUp =async () => {
    const loggedUser = await getLoggedInUser()
    console.log(loggedUser)
    return (
        <section className=' flex min-h-screen'>
            {/* start left side */}
            <div className="   flex-1 flex justify-center items-center">
                <div className="  flex flex-col ">

                    {/*start log-in header  */}
                    <header className=' mb-2'>
                        <Header />

                        <p className=' font-bold text-[1.4rem]'>Sign up</p>

                        <p className=' text-[.9rem]  mt-1 text-paragraphColor'>Welcome back! Please enter your details.</p>
                    </header>
                    {/*end log-in header  */}

                    {/* start log-in from  */}
                    <AuthFrom type="sign-up" />
                    {/* end  log-in from  */}
                </div>
            </div>

            {/* end left side  */}

            {/* start right side  */}
            <div className="flex-1">right</div>
            {/* end  right side  */}
        </section>
    )
}

export default SignUp