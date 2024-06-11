import Header from '@/app/components/Header'
import React from 'react'

const SignIn = () => {
    return (
        <section className=' flex h-screen'>
            {/* start left side */}
            <div className="bg-green-500  flex-1 flex justify-center items-center bg-red-500">
                <div className=" bg-yellow-500 flex flex-col">
                    
                    {/*start log-in header  */}
                    <header className=' mb-3'>
                    <Header/>
                    </header>
                    {/*end log-in header  */}

                    {/* start log-in from  */}
                    <form action="">
                        log form
                    </form>
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