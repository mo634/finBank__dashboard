import AuthFrom from '@/app/components/auth-form/AuthFrom'
import Header from '@/app/components/Header'
import React from 'react'

const SignIn = () => {
    return (
        <section className=' flex h-screen'>
            {/* start left side */}
            <div className=" flex-1 flex justify-center items-center">
                <div className="  flex flex-col  p-2 ">

                    {/*start log-in header  */}
                    <header className=' mb-3'>
                        <Header applyMedia={false}/>

                        <p className=' font-bold text-[1.4rem]'>Log in</p>

                        <p className=' text-[.9rem]  mt-1 text-paragraphColor'>Welcome back! Please enter your details.</p>
                    </header>
                    {/*end log-in header  */}

                    {/* start log-in from  */}
                    <AuthFrom type="sign-in" />
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

export default SignIn