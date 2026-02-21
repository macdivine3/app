import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function PartnersSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const partners = [
        "Hypothekarbank Lenzburg",
        "Mastercard",
        "Google",
        "Apple",
        "Visa",
        "SIX"
    ];

    return (
        <section ref={ref} className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h3 className="text-xl font-semibold text-gray-700">Strong partners, shared vision</h3>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center items-center gap-12 opacity-50"
                >
                    {partners.map((partner) => (
                        <div key={partner} className="text-xl font-bold text-gray-400">
                            {partner}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
