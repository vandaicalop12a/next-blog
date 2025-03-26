'use client';

import AnimationProvider from '../components/animations/AnimationProvider';
import PageTransition from '../components/animations/PageTransition';
import AnimatedLogo from '../components/animations/AnimatedLogo';
import AnimatedNav from '../components/animations/AnimatedNav';
import AnimatedFooter from '../components/animations/AnimatedFooter';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <AnimationProvider>
          <PageTransition>
            <main className="flex-auto min-w-0 flex flex-col px-2 md:px-6 lg:px-0">
              <header className="header-animate mb-8 md:mb-12 lg:mb-16">
                <div className="flex justify-between items-center mb-10">
                  <AnimatedLogo />
                  <AnimatedNav />
                </div>
              </header>
              
              <section className="content-animate">
                {children}
              </section>
              
              <AnimatedFooter />
            </main>
          </PageTransition>
        </AnimationProvider>
      </body>
    </html>
  );
}
