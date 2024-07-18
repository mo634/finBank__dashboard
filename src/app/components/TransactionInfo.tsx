import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { transactionCategoryStyles } from "@/constants"
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"

const CategoryBage = ({ category }: CategoryBadgeProps) => {
    const {
        borderColor,
        backgroundColor,
        textColor,
        chipBackgroundColor,
    } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default
    return (
        <div className={cn('flex items-center py-1 px-5 justify-center w-fit rounded-[20px]  border-2 ',borderColor,backgroundColor,chipBackgroundColor)}>
            <div className={cn(" rounded-full size-2  mr-2",backgroundColor)}/>
            <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
        </div>
    )
}
const TransactionInfo = ({ transactions }: TransactionTableProps) => {

    console.log("*******transactions**********", transactions)
    return (
        <Table>

            <TableHeader>
                <TableRow>
                    <TableHead className="px-2">Transactions</TableHead>
                    <TableHead className="px-2">Amount</TableHead>
                    <TableHead className="px-2">Status</TableHead>
                    <TableHead className="px-2">Date</TableHead>
                    <TableHead className="px-2 max-md:hidden">channel</TableHead>
                    <TableHead className="px-2 max-md:hidden" >Category</TableHead>
                </TableRow>
            </TableHeader>


            <TableBody>

                {
                    transactions.map((t) => {
                        // set needed variables 
                        const status = getTransactionStatus(new Date(t.date))

                        const amount = formatAmount(t.amount)

                        const isDebit = t.type === "debit"

                        const isCredit = t.type === "credit"

                        // start return the info in table 
                        return (

                            <TableRow key={t.$id}>

                                <TableCell className={`max-w-[250px] ${isDebit || amount[0] === "-" ? "bg-[#fffbfa]" : "bg-[#f6fef9]"}`}>
                                    <div className={`flex items-center gap-3`}>
                                        <h1 className="text-[#344054] font-semibold text-[14px] truncate">
                                            {removeSpecialCharacters(t.name)}
                                        </h1>
                                    </div>
                                </TableCell>

                                <TableCell className={` ${isDebit || amount[0] === "-" ? "text-[#f04438]" : "text-[#039855]"}`}>
                                    {isDebit ? `-${amount}` : `${amount}`}
                                </TableCell>

                                <TableCell>
                                    <CategoryBage category={status} />
                                </TableCell>

                                <TableCell className=" min-w-32 ">
                                    {formatDateTime(new Date(t.date)).dateTime}
                                </TableCell>

                                <TableCell className=" max-md:hidden">
                                    {t.paymentChannel}
                                </TableCell>

                                <TableCell className=" max-md:hidden">
                                    <CategoryBage category={t.category} />
                                </TableCell>

                            </TableRow>

                        )





                    })
                }



            </TableBody>
        </Table>

    )
}

export default TransactionInfo