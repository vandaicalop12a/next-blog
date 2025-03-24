import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Blog",
  description: "Personal blog created with Next.js",
  icons: {
    shortcut: "/favicon.ico",
  },
};

// Combine CSS classes
const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en"
      className={cx(
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 md:mx-auto md:max-w-2xl lg:mx-auto lg:max-w-2xl bg-white text-black dark:bg-black dark:text-white">
        <main className="flex-auto min-w-0 flex flex-col px-2 md:px-6 lg:px-0">
          <header className="mb-8 md:mb-12 lg:mb-16">
            <nav className="flex flex-row items-start space-x-4 md:space-x-6">
              <Link href="/" className="font-normal lowercase hover:text-neutral-800 dark:hover:text-neutral-200">home</Link>
              <Link href="/blog" className="font-normal lowercase hover:text-neutral-800 dark:hover:text-neutral-200">blog</Link>
            </nav>
          </header>
          
          {children}
          
          <footer className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-row gap-4 md:gap-6 mb-4">
              <Link href="/rss.xml" className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="3.5" cy="20.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 15C8.58985 15 11.5 17.9101 11.5 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2 9C10.8365 9 18 16.1635 18 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                rss
              </Link>
              <Link href="https://github.com" className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 16.419 4.865 20.166 8.84 21.489C9.34 21.581 9.5 21.278 9.5 21.017C9.5 20.756 9.5 20.175 9.5 19.388C6.73 19.987 6.14 18.047 6.14 18.047C5.68 17.017 5.03 16.725 5.03 16.725C4.12 16.18 5.1 16.199 5.1 16.199C6.1 16.267 6.63 17.136 6.63 17.136C7.5 18.559 8.97 18.091 9.54 17.839C9.63 17.195 9.89 16.759 10.17 16.489C7.95 16.22 5.62 15.426 5.62 11.598C5.62 10.521 6.01 9.641 6.65 8.958C6.55 8.719 6.2 7.766 6.75 6.326C6.75 6.326 7.59 6.064 9.5 7.42C10.29 7.199 11.15 7.089 12 7.089C12.85 7.089 13.71 7.199 14.5 7.42C16.41 6.064 17.25 6.326 17.25 6.326C17.8 7.766 17.45 8.719 17.35 8.958C17.99 9.641 18.38 10.521 18.38 11.598C18.38 15.437 16.04 16.22 13.82 16.48C14.17 16.787 14.5 17.429 14.5 18.391C14.5 19.747 14.5 20.674 14.5 21.017C14.5 21.278 14.66 21.581 15.17 21.488C19.135 20.165 22 16.418 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
                </svg>
                github
              </Link>
              <Link href="#" className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                view source
              </Link>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400">
              © {new Date().getFullYear()} MIT Licensed
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
