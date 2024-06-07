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
        <main className="flex">
            <SideBar
            user={loggedIn}
            />
            {children}
        </main>
    );
}
