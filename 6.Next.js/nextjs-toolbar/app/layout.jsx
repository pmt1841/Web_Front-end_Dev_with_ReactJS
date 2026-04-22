import Link from "next/link";

export const metadata = {
    title: "Next Toolbar Demo",
    description: "Basic toolbar with routing in Next.js"
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body>
            <div>
                <Link href="/">• Home</Link>
            </div>
            <div>
                <Link href="/blog">• Blog</Link>
            </div>
            <div>
                <Link href="/about">• About</Link>
            </div>
            <div>
                {children}
            </div>
            </body>
        </html>
    );

}