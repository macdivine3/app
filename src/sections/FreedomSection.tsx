import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export default function FreedomSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Freedom is not just a buzzword for us – it is our motivation
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Since 2019, we've been developing an account that's all about you. This way,
                            you can manage your money independently and effortlessly at any time. For us,
                            freedom means doing things differently and better – even if they've "always been"
                            a certain way. No hidden fees, just intuitive handling, smart features, and full
                            transparency. Digital, yet still personal.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 text-red-600 font-semibold text-lg hover:gap-4 transition-all"
                        >
                            Learn more about us <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>

                    {/* Right Content - Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative bg-red-600 rounded-[3rem] p-8 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                            <img
                                src="/phone-app.jpg"
                                alt="UBS app"
                                className="relative z-10 w-full max-w-xs mx-auto rounded-3xl shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
