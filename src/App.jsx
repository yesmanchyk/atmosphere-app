import React from 'react';
import Background from './components/Background';
import QuoteGenerator from './components/QuoteGenerator';
import { motion } from 'framer-motion';

import BreathingCircle from './components/BreathingCircle';

function App() {
  return (
    <Background>
      <motion.header
        className="absolute top-0 w-full p-6 flex justify-between items-center opacity-80"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="font-serif text-lg tracking-widest text-slate-900/50 dark:text-white/50">ATMOSPHERE</span>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          {/* Simple audio icon placeholder */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-current text-slate-800/60 dark:text-white/60">
            <path d="M11 5L6 9H2V15H6L11 19V5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.header>

      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[80vh]">
        <motion.h1
          className="text-4xl md:text-6xl font-serif text-slate-900/90 dark:text-white/90 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Relax & Unwind
        </motion.h1>

        <BreathingCircle />

        <QuoteGenerator />
      </div>

      <motion.footer
        className="absolute bottom-4 text-xs text-slate-500/50 dark:text-white/30 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        PRESS SPACE TO PAUSE
      </motion.footer>
    </Background>
  );
}

export default App;
