import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BreathingCircle = () => {
    const [text, setText] = useState("Breathe In");

    useEffect(() => {
        const cycle = () => {
            setText("Breathe In");
            setTimeout(() => setText("Hold"), 3000);
            setTimeout(() => setText("Breathe Out"), 5000);
            setTimeout(() => setText("Hold"), 8000);
        };
        cycle();
        const interval = setInterval(cycle, 10000); // 10s cycle? Need to match animation
        return () => clearInterval(interval);
    }, []);

    // Animation cycle: 
    // In: 3s
    // Hold: 2s
    // Out: 3s
    // Hold: 2s
    // Total: 10s

    return (
        <div className="relative flex items-center justify-center w-64 h-64 my-12 group cursor-pointer">
            {/* Outer Ripple */}
            <motion.div
                className="absolute inset-0 rounded-full border border-white/20"
                animate={{
                    scale: [1, 1.5, 1.5, 1, 1],
                    opacity: [0.3, 0.6, 0.6, 0.3, 0.3]
                }}
                transition={{
                    duration: 10,
                    times: [0, 0.3, 0.5, 0.8, 1],
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Main Circle */}
            <motion.div
                className="absolute inset-4 rounded-full bg-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center border border-white/10"
                animate={{ scale: [1, 1.3, 1.3, 1, 1] }}
                transition={{
                    duration: 10,
                    times: [0, 0.3, 0.5, 0.8, 1],
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="text-center">
                    <AnimatePresence mode='wait'>
                        <motion.span
                            key={text}
                            className="block text-lg font-medium tracking-[0.2em] uppercase text-white/90"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {text}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default BreathingCircle;
