'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#111113] border-t border-[#232229]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center">
              <div className="w-[100px] h-[100px] relative flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Subpace Logo"
                  width={100}
                  height={100}
                  className="object-contain brightness-200"
                />
              </div>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Building better communities together
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-gray-400 hover:text-white text-sm">Features</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white text-sm">Pricing</Link></li>
              <li><Link href="/docs" className="text-gray-400 hover:text-white text-sm">Documentation</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm">About</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm">Blog</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white text-sm">Careers</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-[#232229]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Subpace. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-github text-lg"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 