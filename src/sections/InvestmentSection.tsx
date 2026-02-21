import { useRef } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export default function InvestmentSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="pillar" ref={ref} className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden">
                            <img
                                src="/investment-woman.jpg"
                                alt="Woman investing"
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Floating Investment Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="absolute -right-4 top-1/4 bg-white rounded-2xl shadow-xl p-4 w-56 animate-float"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-neon-teal rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-semibold text-sm">Investment plan</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">Auto-invest monthly</p>
                            <p className="text-xl font-bold text-neon-teal">500 CHF</p>
                        </motion.div>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Invest automatically in assets of your choice and build wealth over the long term.
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Set up your investment plan in minutes and let your money work for you.
                            Choose from a variety of ETFs and stocks, and invest automatically every month.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-neon-teal hover:bg-neon-teal-dark text-white px-8 py-4 rounded-full font-semibold transition-colors shadow-lg shadow-neon-teal/30"
                            >
                                Start investing
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 text-neon-teal font-semibold text-lg hover:gap-4 transition-all"
                            >
                                Learn more <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
