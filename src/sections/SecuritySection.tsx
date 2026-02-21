import { useRef } from 'react';
import { Shield, Eye, Fingerprint, Lock } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export default function SecuritySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const securityFeatures = [
        {
            icon: <Shield className="w-8 h-8 text-red-600" />,
            title: "Your money is safe",
            description: "With UBS, your money is safely held and protected by Swiss deposit insurance up to 100'000 CHF."
        },
        {
            icon: <Eye className="w-8 h-8 text-neon-teal" />,
            title: "Your data, your protection",
            description: "No unnecessary tracking, all data securely stored in Switzerland – your privacy comes first."
        },
        {
            icon: <Fingerprint className="w-8 h-8 text-purple-500" />,
            title: "Personal access",
            description: "Two-factor authentication – transfers are only possible from your activated mobile phone with your PIN. Secure login via fingerprint or Face ID."
        },
        {
            icon: <Lock className="w-8 h-8 text-orange-500" />,
            title: "State-of-the-art security",
            description: "With regular security tests and the latest technology, your app remains well protected at all times."
        }
    ];

    return (
        <section id="security" ref={ref} className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Security you can trust
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {securityFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
