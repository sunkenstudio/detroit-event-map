import { Providers } from "./providers";

export const metadata = {
  title: "Detroit Event Map",
  description:
    "Find local events, music, concerts, art shows and things to do in the metro Detroit area",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%", width: "100%" }}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
