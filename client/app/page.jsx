// app/page.jsx
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // shadcn button (optional)
import { motion } from "framer-motion";
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b bg-white shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">
          Note<span className="text-blue-600">Wise</span>
        </h1>
        <nav className="space-x-6 hidden sm:block">
          <a href="#" className="hover:text-blue-600 transition">Home</a>
          <a href="#" className="hover:text-blue-600 transition">Features</a>
          <a href="#" className="hover:text-blue-600 transition">About</a>
          <a href="/login" className="hover:text-blue-600 transition">Login</a>
        </nav>
        <Link href='/signup'>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 cursor-pointer">
          Get Started
        </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between flex-grow px-8 py-20 lg:px-20">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 space-y-6 text-center lg:text-left"
        >
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Capture Your <span className="text-blue-600">Ideas</span> Effortlessly
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
            Stay organized, creative, and productive — all in one place.  
            Create, edit, and manage your notes from anywhere.
          </p>
          <div className="space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
              Start Writing
            </Button>
            <Button variant="outline" className="px-6 py-2 rounded-full">
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 flex justify-center mb-10 lg:mb-0"
        >
          <Image
            src="/note-illustration.png" // Replace with your image
            alt="Note Taking Illustration"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © {new Date().getFullYear()} NoteWise. All rights reserved.
      </footer>
    </main>
  );
}
