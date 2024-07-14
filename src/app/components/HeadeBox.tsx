import React from 'react'

const HeaderBox = ({type="title" ,tittle, user, subtext}:HeaderBoxProps) => {
    return (
        <div className=''>

            <h1 className=' text-2xl font-bold capitalize'>
                {tittle}
                , 
                {
                    type === "greeting" && <span className='text-bankGradient'>&nbsp;{user.firstName} {user.lastName}</span>
                }
                
            </h1>

            <p className='text-paragraphColor'>{subtext}</p>

        </div>
    )
}

export default HeaderBox