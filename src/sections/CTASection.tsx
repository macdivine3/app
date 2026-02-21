import { useRef } from 'react';
import { Play, Apple } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export default function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 bg-red-600 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                            What are you waiting for?
                        </h2>
                        <p className="text-xl text-white/80">
                            Take control of your finances with your new favorite app. Paperless and in less than 10 minutes.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors"
                            >
                                <Play className="w-5 h-5" />
                                Google Play
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors"
                            >
                                <Apple className="w-5 h-5" />
                                App Store
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right - Phone */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex justify-center"
                    >
                        <img
                            src="/phone-app.jpg"
                            alt="UBS app"
                            className="w-full max-w-xs rounded-3xl shadow-2xl animate-float-slow"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
