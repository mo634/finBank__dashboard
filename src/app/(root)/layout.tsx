import Image from "next/image";
import MobileSideBar from "../components/MobileSideBar";
import SideBar from "../components/SideBar";

export default function NestedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn = {
        firstName: "Mohamed"
        , lastName: "Mostafa"
    }
    return (
        <main className=" flex max-md:flex-col ">
            <SideBar
                user={loggedIn}
            />

            {/* render mobile sidebar */}
            <div className="p-4 shadow-md hidden max-md:flex mb-3 justify-between ">
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
            {children}
        </main>
    );
}
