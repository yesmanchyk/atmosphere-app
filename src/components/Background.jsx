import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = {
    morning: {
        gradient: "from-orange-100 via-rose-100 to-amber-50",
        particleColor: "bg-orange-300",
        text: "Good Morning"
    },
    afternoon: {
        gradient: "from-sky-100 via-cyan-100 to-emerald-50",
        particleColor: "bg-sky-300",
        text: "Good Afternoon"
    },
    evening: {
        gradient: "from-indigo-900 via-slate-900 to-purple-900",
        particleColor: "bg-purple-300",
        text: "Good Evening"
    }
};

const Background = ({ children, isPaused }) => {
    const [timeOfDay, setTimeOfDay] = useState('morning');

    useEffect(() => {
        const hours = new Date().getHours();
        if (hours >= 5 && hours < 12) setTimeOfDay('morning');
        else if (hours >= 12 && hours < 18) setTimeOfDay('afternoon');
        else setTimeOfDay('evening');
    }, []);

    const currentTheme = themes[timeOfDay];

    return (
        <motion.div
            className={`min-h-screen w-full bg-gradient-to-br ${currentTheme.gradient} transition-colors duration-[2000ms] relative overflow-hidden flex flex-col items-center justify-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Ambient Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full opacity-30 blur-xl ${currentTheme.particleColor}`}
                        style={{
                            width: Math.random() * 300 + 50,
                            height: Math.random() * 300 + 50,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={isPaused ? {} : {
                            y: [0, Math.random() * 100 - 50],
                            x: [0, Math.random() * 100 - 50],
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center">
                {children}
            </div>
        </motion.div>
    );
};

export default Background;
