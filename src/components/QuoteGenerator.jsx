import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
    "Breathe in deeply. Breathe out slowly.",
    "Peace comes from within. Do not seek it without.",
    "You are exactly where you need to be.",
    "Inhale the future, exhale the past.",
    "Simplicity is the ultimate sophistication.",
    "Nature does not hurry, yet everything is accomplished.",
    "Quiet the mind, and the soul will speak."
];

const QuoteGenerator = ({ isPaused }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Initial random quote if not set
        if (index === 0) setIndex(Math.floor(Math.random() * quotes.length));

        if (isPaused) return;

        // Rotate every 15 seconds
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length);
        }, 15000);
        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div className="h-24 flex items-center justify-center text-center mt-8 mb-4">
            <AnimatePresence mode='wait'>
                <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.8 }}
                    className="text-xl md:text-2xl font-serif text-slate-800/80 dark:text-slate-100/90 tracking-wide italic"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
                >
                    "{quotes[index]}"
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

export default QuoteGenerator;
