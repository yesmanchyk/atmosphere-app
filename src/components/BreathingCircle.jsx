import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BreathingCircle = ({ isPaused }) => {
    const [text, setText] = useState("Breathe In");
    const [cycleTime, setCycleTime] = useState(0); // Track progress in cycle
    const startTimeRef = useRef(Date.now());
    const pausedTimeRef = useRef(0);

    // Logic to handle "pausing" the text cycle is complex because of setTimeouts.
    // Simplifying approach: Reset cycle or Just hold current state?
    // Better user experience: Just freeze animation, text can stay or change to "Paused"

    // Actually, for a breathing exercise, "Pause" should probably just freeze current state.
    // Framer motion handles visual freeze if we pass null/empty animate object or specific control.
    // But the TEXT cycle needs to stop.

    // Simpler implementation for "Pause":
    // When paused, we stop the interval. When resumed, we restart? 
    // That desyncs animation and text. 

    // Let's rely on CSS variables or Framer motion controls? 
    // The previous implementation used timeouts inside an interval. That's hard to pause accurately.

    // Let's use a simpler "Phase" state machine for robust pausing.

    const [phase, setPhase] = useState('in'); // in, hold1, out, hold2

    useEffect(() => {
        if (isPaused) return;

        let timeout;
        const nextPhase = () => {
            if (phase === 'in') {
                setText("Hold");
                setPhase('hold1');
                timeout = setTimeout(nextPhase, 3000);
            } else if (phase === 'hold1') {
                setText("Breathe Out");
                setPhase('out');
                timeout = setTimeout(nextPhase, 5000);
            } else if (phase === 'out') {
                setText("Hold");
                setPhase('hold2');
                timeout = setTimeout(nextPhase, 8000); // Wait... logic from before was timeouts from 0.
            } else if (phase === 'hold2') {
                setText("Breathe In");
                setPhase('in');
                timeout = setTimeout(nextPhase, 10000); // Wait... previous logic was separate timeouts.
            }
        };

        // Re-implementing original logic but pausable is tricky without rewriting everything.
        // Let's just Freeze text update when paused?
    }, [isPaused, phase]);

    // Alternative: Just accept that pausing resets the cycle or completes current phase?
    // Let's stick to the simpler version: If paused, animations stop. 
    // We will clear interval on pause and restart on resume (resetting cycle).
    // This is "Good Enough" for V1.

    useEffect(() => {
        if (isPaused) {
            setText("Paused");
            return;
        }

        const cycle = () => {
            setText("Breathe In");
            setTimeout(() => !isPaused && setText("Hold"), 3000);
            setTimeout(() => !isPaused && setText("Breathe Out"), 5000);
            setTimeout(() => !isPaused && setText("Hold"), 8000);
        };

        cycle(); // Start immediately
        const interval = setInterval(cycle, 10000);
        return () => clearInterval(interval);
    }, [isPaused]);


    const variants = {
        animate: {
            scale: [1, 1.3, 1.3, 1, 1],
            transition: {
                duration: 10,
                times: [0, 0.3, 0.5, 0.8, 1],
                repeat: Infinity,
                ease: "easeInOut"
            }
        },
        paused: {
            scale: 1, // Reset to base or keep current? keeping current is hard without motion value
        }
    };

    // Ripple variants
    const rippleVariants = {
        animate: {
            scale: [1, 1.5, 1.5, 1, 1],
            opacity: [0.3, 0.6, 0.6, 0.3, 0.3],
            transition: {
                duration: 10,
                times: [0, 0.3, 0.5, 0.8, 1],
                repeat: Infinity,
                ease: "easeInOut"
            }
        },
        paused: {
            scale: 1,
            opacity: 0.3
        }
    };

    return (
        <div className="relative flex items-center justify-center w-64 h-64 my-12 group cursor-pointer">
            {/* Outer Ripple */}
            <motion.div
                className="absolute inset-0 rounded-full border border-white/20"
                variants={rippleVariants}
                animate={isPaused ? "paused" : "animate"}
            />

            {/* Main Circle */}
            <motion.div
                className="absolute inset-4 rounded-full bg-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center border border-white/10"
                variants={variants}
                animate={isPaused ? "paused" : "animate"}
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
