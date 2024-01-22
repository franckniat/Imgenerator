import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DM_Sans } from "next/font/google";
import ThemeProvider from "@/context/ThemeProvider";
const dm_sans = DM_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${dm_sans.className}`}>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  )
}
