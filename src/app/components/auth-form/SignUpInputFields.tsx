import React from 'react'
import CustomInputField from './CustomInputField'

const SignUpInputFields = ({formControl}: any) => {
    return (
        <>
            <div className=" flex gap-x-5">
                <CustomInputField
                    control={formControl}
                    name="firstName"
                    placeholder="Enter Your First Name"
                />
                <CustomInputField
                    control={formControl}
                    name="lastName"
                    placeholder="Enter Your Last Name"
                />
            </div>
            <CustomInputField
                control={formControl}
                name="address"
                placeholder="Enter Your Address"
            />
            <div className="flex gap-x-5">
                <CustomInputField
                    control={formControl}
                    name="state"
                    placeholder="ex: NY"
                />
                <CustomInputField
                    control={formControl}
                    name="postalCode"
                    placeholder="ex: 11101"
                />
            </div>
            <div className="flex gap-x-5">
                <CustomInputField
                    control={formControl}
                    name="dateOfBirth"
                    placeholder="yyyy-mm-dd"
                />
                <CustomInputField
                    control={formControl}
                    name="ssn"
                    placeholder="SSN"
                />
            </div>
        </>
    )
}

export default SignUpInputFields