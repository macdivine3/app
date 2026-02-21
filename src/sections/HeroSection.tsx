import { useRef } from 'react';
import { Sparkles, ArrowRight, Apple } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/hero-sky.jpg"
                    alt="Sky background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
            </div>

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
            >
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                        >
                            <span className="text-red-600">UBS.</span>{' '}
                            <span className="text-red-600">Because your wealth deserves more.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl text-gray-700 max-w-lg"
                        >
                            Talk to your account. Pay seamlessly. Save globally. Invest automatically.
                            <span className="text-red-600 font-medium"> Premium wealth management, made simple.</span>
                        </motion.p>

                        {/* AI Chat Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="bg-white rounded-3xl shadow-xl p-6 max-w-sm"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-red-500 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">UBS Advisor</p>
                                    <p className="text-sm text-gray-500">What would you like to know?</p>
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Ask your question here..."
                                    className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <ArrowRight className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content - Woman with Floating Cards */}
                    <div className="relative h-[600px] lg:h-[700px]">
                        {/* Woman Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="absolute bottom-0 right-0 w-full max-w-md"
                        >
                            <img
                                src="/hero-woman.png"
                                alt="Happy woman using phone"
                                className="w-full h-auto object-contain"
                            />
                        </motion.div>

                        {/* Floating Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="absolute top-20 right-0 animate-float"
                        >
                            <div className="bg-white rounded-2xl shadow-xl p-4 w-48">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                        <Apple className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-semibold text-sm">Apple</span>
                                    <span className="text-green-500 text-sm font-medium">+2.30%</span>
                                </div>
                                <div className="h-12 flex items-end gap-1">
                                    {[40, 60, 45, 80, 55, 70, 90].map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 bg-green-100 rounded-t"
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="absolute top-1/2 -left-4 animate-float-delayed"
                        >
                            <div className="bg-red-600 rounded-2xl shadow-xl p-4 w-40 text-white">
                                <p className="text-xs opacity-80 mb-1">Personal account</p>
                                <p className="text-2xl font-bold">3'260.60 CHF</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            className="absolute bottom-32 right-0 animate-float-slow"
                        >
                            <div className="bg-orange-400 rounded-2xl shadow-xl p-4 w-36 text-white">
                                <div className="text-3xl mb-1">🌴</div>
                                <p className="text-xs opacity-80">Vacation</p>
                                <p className="text-xl font-bold">1'850.00 CHF</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
