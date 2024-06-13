import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Control, FieldPath } from 'react-hook-form'
import { formSchema } from '@/lib/utils'
import { z } from 'zod'


const authFormSchema = formSchema('sign-up')
interface CustomInput {
    control: Control<z.infer<typeof authFormSchema>>,
    name: FieldPath<z.infer<typeof authFormSchema>>,
    label?: string,
    placeholder: string
}
const CustomInputField = ({ control, name, placeholder }: CustomInput) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='capitalize'>{name}</FormLabel>
                    <FormControl>
                        <Input
                            type={name === 'password' ? 'password' : 'text'}
                            placeholder={placeholder}
                            {...field} />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default CustomInputField