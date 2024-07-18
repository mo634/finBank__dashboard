import Link from 'next/link'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trigger } from '@radix-ui/react-tabs'
import BankTabItem from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionInfo from './TransactionInfo'


const RecentTransactions = ({
    accounts,
    appwriteItemId,
    page = 1,
    transactions = []
}: RecentTransactionsProps) => {
    console.log("accounts data ", accounts)
    return (
        <section className=' p-4 '>

            <header className=' flex capitalize justify-between items-center' >
                <h1 className=' font-bold text-2xl mb-2'>Recent Transactions</h1>

                <Link href={`/transaction-history/?id=${appwriteItemId}`}
                    className='shadow-sm  bg-gray-200 border p-1 rounded-sm duration-500 hover:bg-[#ddd] hover:text-bankGradient'
                >
                    view all
                </Link>
            </header>

            {/*start  render recent transactions */}
            <Tabs defaultValue={appwriteItemId} className="w-full">
                <TabsList>
                    {
                        accounts.map((account) => (
                            <TabsTrigger key={account.id} value={account.appwriteItemId}
                                className='w-full py-3 mb-2 px-2  border-b-2 border-bankGradient'
                            >
                                <BankTabItem
                                    key={account.id}
                                    account={account}
                                    appwriteItemId={appwriteItemId}
                                />

                            </TabsTrigger>

                        ))
                    }
                </TabsList>
                {
                    accounts.map((account) => (
                        <TabsContent

                            key={account.id} value={account.appwriteItemId}
                        >

                            <BankInfo
                                account={account}
                                appwriteItemId={appwriteItemId}
                                type="full"
                            />

                            <TransactionInfo

                                transactions={transactions}
                            />


                        </TabsContent>
                    )
                    )
                }



            </Tabs>

            {/*end  render recent transactions */}


        </section>
    )
}

export default RecentTransactions