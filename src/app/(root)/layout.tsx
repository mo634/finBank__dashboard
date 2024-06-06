
export default function NestedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex">
            SidBar
            {children}
        </main>
    );
}
