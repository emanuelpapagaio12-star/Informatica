import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ZenTask | High Performance Management',
    description: 'Minimalist task management for power users.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}
