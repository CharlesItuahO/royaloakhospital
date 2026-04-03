import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Royal Oak Hospital | Precision Care Result',
  description: 'Royal Oak Hospital delivers compassionate, world-class medical care 24/7 in Festac Town, Lagos.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen`} suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
