export default function RootLayout({ children }) {
    return (
        <html lang="en" style={{ margin: 0, padding: 0 }}>
            <head>
                <title>KM Origins</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cinzel&family=Open+Sans&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body style={{ margin: 0, padding: 0 }}>{children}</body>
        </html>
    );
}
