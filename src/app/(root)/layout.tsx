
export default function NestedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            SidBar
            {children}
        </main>
    );
}
