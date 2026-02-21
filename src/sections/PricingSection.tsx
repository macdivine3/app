import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function PricingSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activePlan, setActivePlan] = useState('plus');

    const plans = [
        { id: 'free', label: 'free', price: '0 CHF', color: 'bg-gray-200' },
        { id: 'plus', label: 'plus', price: '5 CHF', color: 'bg-red-600' },
        { id: 'global', label: 'global', price: '10 CHF', color: 'bg-purple-500' },
        { id: 'metal', label: 'metal', price: '15 CHF', color: 'bg-gray-800' },
    ];

    return (
        <section id="invest" ref={ref} className="py-24 bg-red-600 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        plus
                    </h2>
                    <p className="text-xl text-white/80">
                        The smart account with extra accessibility
                    </p>
                </motion.div>

                {/* Plan Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mb-16"
                >
                    <div className="inline-flex bg-white/20 backdrop-blur-sm rounded-full p-1">
                        {plans.map((plan) => (
                            <button
                                key={plan.id}
                                onClick={() => setActivePlan(plan.id)}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${activePlan === plan.id
                                        ? 'bg-white text-red-600'
                                        : 'text-white hover:bg-white/10'
                                    }`}
                            >
                                {plan.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Card Display */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex justify-center"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePlan}
                            initial={{ opacity: 0, rotateY: -30 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            exit={{ opacity: 0, rotateY: 30 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <img
                                src={activePlan === 'metal' ? '/metal-card.png' : '/neon-card.png'}
                                alt={`${activePlan} card`}
                                className="w-full max-w-md drop-shadow-2xl"
                            />
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-xl">
                                <span className="font-bold text-gray-900">{plans.find(p => p.id === activePlan)?.price}</span>
                                <span className="text-gray-500 text-sm">/month</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
