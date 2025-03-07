

import "./globals.css";
import AuthProvider from "./app_components/auth/AuthProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <AuthProvider>
     <html lang="en">
      <head>
        <title>Summarizer</title>
      </head>
      <body
        
      >
        {children}
      </body>
    </html>
   </AuthProvider>
  );
}
