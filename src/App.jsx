import React from 'react';
import Background from './components/Background';
import QuoteGenerator from './components/QuoteGenerator';
import { motion } from 'framer-motion';

import BreathingCircle from './components/BreathingCircle';

function App() {
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent scrolling
        setIsPaused(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Background isPaused={isPaused}>
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
          {isPaused ? "Paused" : "Relax & Unwind"}
        </motion.h1>

        <BreathingCircle isPaused={isPaused} />

        <QuoteGenerator isPaused={isPaused} />
      </div>

      <motion.footer
        className="absolute bottom-4 text-xs text-slate-500/50 dark:text-white/30 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {isPaused ? "PRESS SPACE TO RESUME" : "PRESS SPACE TO PAUSE"}
      </motion.footer>
    </Background>
  );
}

export default App;
