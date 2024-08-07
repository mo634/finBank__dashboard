import Image from "next/image";
import MobileSideBar from "../components/MobileSideBar";
import SideBar from "../components/SideBar";
import { getLoggedInUser } from "../../../lib/actions/auth.actions";
import { redirect } from "next/navigation";
export default async function NestedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) {
        redirect("/sign-in");
    }


    return (
        <main className=" flex h-fit items-start w-full  max-md:flex-col   ">
            <SideBar
                user={loggedIn}
            />
            {/* render mobile sidebar */}
            <div className="p-4 shadow-md hidden max-md:flex mb-3 justify-between w-full ">
                <div className="">
                    <Image
                        src={"/icons/icon.svg"}
                        height={34}
                        width={34}
                        alt="SideBar Icon"
                    />
                </div>

                <div className="">
                    <MobileSideBar user={loggedIn} />
                </div>
            </div>
            <div className="flex-1 ">
                {children}
            </div>
        </main>
    );
}
