import { useRef } from 'react';
import { Wallet, TrendingUp } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export default function FeaturesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const features = [
        {
            title: "Joint account – for duos under one roof",
            description: "Share expenses seamlessly with your partner",
            image: "/phone-app.jpg",
            size: "large",
            bg: "bg-white"
        },
        {
            title: "Pay everywhere with your Debit Mastercard",
            description: "Worldwide acceptance, zero foreign transaction fees",
            image: "/neon-card.png",
            size: "medium",
            bg: "bg-gradient-to-br from-pink-50 to-purple-50"
        },
        {
            title: "Prices – affordable, fair & transparent",
            description: "No hidden fees, ever",
            icon: <Wallet className="w-12 h-12 text-red-600" />,
            size: "small",
            bg: "bg-white"
        },
        {
            title: "Keep track of your money",
            description: "Smart insights and spending analytics",
            icon: <TrendingUp className="w-12 h-12 text-neon-teal" />,
            size: "small",
            bg: "bg-white"
        }
    ];

    return (
        <section id="account" ref={ref} className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900">The digital account for your everyday finances</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`${feature.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''} ${feature.bg} rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-shadow cursor-pointer group`}
                        >
                            <div className="flex flex-col h-full">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 mb-6">{feature.description}</p>
                                {feature.image && (
                                    <div className="mt-auto">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-48 object-contain rounded-xl"
                                        />
                                    </div>
                                )}
                                {feature.icon && (
                                    <div className="mt-auto p-4 bg-gray-50 rounded-2xl">
                                        {feature.icon}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
