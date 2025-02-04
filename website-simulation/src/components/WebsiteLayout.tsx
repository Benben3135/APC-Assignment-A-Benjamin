import React from 'react';
import Link from 'next/link';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-primary-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Dynamic Website
          </Link>
          <div className="space-x-4">
            <Link href="/" className="hover:text-primary-200">
              Home
            </Link>
            <Link href="/cards" className="hover:text-primary-200">
              Cards
            </Link>
            <Link href="/wedding" className="hover:text-primary-200">
              Wedding
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}