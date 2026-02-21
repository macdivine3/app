import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function CardShowcaseSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeTab, setActiveTab] = useState('card');

    const tabs = [
        { id: 'account', label: 'Account' },
        { id: 'card', label: 'Card' },
        { id: 'money', label: 'Money management' },
    ];

    return (
        <section ref={ref} className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Your account in a beautiful app
                    </h2>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mb-16"
                >
                    <div className="inline-flex bg-white rounded-full p-1 shadow-card">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-red-600 text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Card Display */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative flex justify-center items-center min-h-[400px]"
                >
                    <AnimatePresence mode="wait">
                        {activeTab === 'card' && (
                            <motion.div
                                key="card"
                                initial={{ opacity: 0, rotateY: -30 }}
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: 30 }}
                                transition={{ duration: 0.5 }}
                                className="relative"
                                style={{ perspective: '1000px' }}
                            >
                                <img
                                    src="/neon-card.png"
                                    alt="UBS card"
                                    className="w-full max-w-lg drop-shadow-2xl"
                                />
                                <motion.div
                                    animate={{
                                        rotateY: [0, 10, 0, -10, 0],
                                        rotateX: [0, 5, 0, -5, 0]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -right-20 -top-10"
                                >
                                    <img
                                        src="/neon-card.png"
                                        alt="UBS card floating"
                                        className="w-48 opacity-60"
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                        {activeTab === 'account' && (
                            <motion.div
                                key="account"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                            >
                                <img
                                    src="/phone-app.jpg"
                                    alt="Account view"
                                    className="w-full max-w-sm rounded-3xl shadow-2xl"
                                />
                            </motion.div>
                        )}
                        {activeTab === 'money' && (
                            <motion.div
                                key="money"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-3xl p-8 shadow-card max-w-md"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-gray-600">Monthly spending</span>
                                    <span className="text-2xl font-bold text-red-600">2,450 CHF</span>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { category: 'Groceries', amount: '650 CHF', color: 'bg-red-600', width: '60%' },
                                        { category: 'Transport', amount: '320 CHF', color: 'bg-neon-teal', width: '40%' },
                                        { category: 'Entertainment', amount: '480 CHF', color: 'bg-purple-500', width: '50%' },
                                    ].map((item) => (
                                        <div key={item.category} className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm text-gray-600">{item.category}</span>
                                                    <span className="text-sm font-medium">{item.amount}</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.width }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
