"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ShieldCheck, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  {
    icon: <Home className="w-6 h-6 text-purple-600" />,
    title: "Curated Listings",
    desc: "Handpicked properties from top sites."
  },
  {
    icon: <Search className="w-6 h-6 text-blue-600" />,
    title: "AI Search",
    desc: "Natural language, instant results."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
    title: "Verified Sources",
    desc: "Only trusted, real listings."
  },
];

const steps = [
  { num: 1, title: "Describe", desc: "Tell us what you want." },
  { num: 2, title: "AI Search", desc: "We find the best matches." },
  { num: 3, title: "Explore", desc: "View, compare, connect." },
];

// Dark mode toggle (uses localStorage and system preference)
function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    // Check system preference
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && systemDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);
  const toggle = () => {
    setIsDark((d) => {
      const next = !d;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };
  return [isDark, toggle] as const;
}

export default function LandingPage() {
  const [isDark, toggleDark] = useDarkMode();
  // Prevent horizontal scroll on root
  useEffect(() => {
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col items-center px-4 overflow-x-hidden relative">
      {/* Dark/Light mode toggle */}
      <button
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggleDark}
        className="fixed top-6 right-6 z-50 p-2 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur border border-white/30 dark:border-gray-700/30 shadow hover:bg-white/80 dark:hover:bg-gray-900/80 transition-colors"
      >
        {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
      </button>

      {/* Animated glassy blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-purple-300/40 rounded-full blur-3xl mix-blend-multiply animate-blob z-0 pointer-events-none"
        animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-blue-300/40 rounded-full blur-3xl mix-blend-multiply animate-blob z-0 pointer-events-none"
        animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 w-[28rem] h-[28rem] bg-pink-300/40 rounded-full blur-3xl mix-blend-multiply animate-blob z-0 pointer-events-none"
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Minimal Hero Section */}
      <motion.section
        className="w-full flex flex-col items-center justify-center mt-40 mb-28 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white text-center mb-6 tracking-tight leading-tight drop-shadow-sm">
          Find Your Next Home
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl">
          Search, filter, and discover the best properties with a minimal, modern, AI-powered experience.
        </p>
        <Link href="/search" passHref>
          <motion.a
            className="inline-block px-10 py-4 rounded-2xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-purple-700 dark:text-purple-200 font-semibold text-xl shadow-sm hover:bg-white/60 dark:hover:bg-gray-900/60 transition-all duration-200 hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Searching
          </motion.a>
        </Link>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="flex flex-col items-center flex-1 min-w-[200px] p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="mb-3">{f.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="w-full max-w-3xl flex flex-col items-center mb-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="flex flex-col items-center flex-1 min-w-[160px] p-6 rounded-2xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 mb-3 text-lg font-bold text-purple-700 dark:text-purple-300">
                {step.num}
              </div>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-center text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="w-full py-8 flex flex-col items-center text-gray-400 dark:text-gray-500 text-sm mt-8 border-t border-gray-100 dark:border-gray-800">
        <div className="mb-2">&copy; {new Date().getFullYear()} Real Estate Search. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-purple-600">Privacy</a>
          <a href="#" className="hover:text-purple-600">Terms</a>
          <a href="#" className="hover:text-purple-600">Contact</a>
        </div>
      </footer>
    </div>
  );
} 