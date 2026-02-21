import { useRef } from 'react';
import { Star, Award, Quote } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export default function ReviewsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const reviews = [
        {
            text: "I've been using UBS as my main bank for four years now. I can't find any faults. Innovative and fresh. Keep it up.",
            author: "App Store Review",
            rating: 4.6,
            source: "Apple App Store"
        },
        {
            text: "UBS Wealth Management shows how simple and modern banking in Switzerland can be – fully digital, and with the option to invest directly in the app.",
            author: "Aljoscha from 'Become Wealthy'",
            rating: 5,
            source: "Finance Blog"
        },
        {
            text: "I have used UBS as my main account for multiple years and have been happy with it. It is simple and saved me money on foreign transactions.",
            author: "Baptiste from 'The Poor Swiss'",
            rating: 5,
            source: "Finance Blog"
        },
        {
            text: "The stability has massively improved and with the other offerings and the app, I am very satisfied – I can only recommend UBS.",
            author: "Marc from 'Mustachian Post'",
            rating: 5,
            source: "Finance Blog"
        }
    ];

    const awards = [
        { title: "#1 neobank", subtitle: "Top Banks 2025", source: "Handelszeitung & Statista" },
        { title: "#1 Swiss bank", subtitle: "World's Best Banks", source: "Forbes & Statista 2023" },
        { title: "4.5 stars", subtitle: "Banking apps comparison", source: "K-Geld" },
    ];

    return (
        <section ref={ref} className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-red-600 mb-4">
                        Often loved and regularly awarded
                    </h2>
                    <p className="text-xl text-gray-600">
                        More than 240'000 users and over 16'680 reviews
                    </p>
                </motion.div>

                {/* Ratings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center gap-8 mb-16"
                >
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-3xl font-bold text-gray-900">4.60</p>
                        <p className="text-sm text-gray-500">Apple App Store</p>
                        <p className="text-xs text-gray-400">with 7'000+ reviews</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-2">
                            {[1, 2, 3, 4].map((star) => (
                                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">4.3</p>
                        <p className="text-sm text-gray-500">Google Play Store</p>
                        <p className="text-xs text-gray-400">with 9'680+ reviews</p>
                    </div>
                </motion.div>

                {/* Awards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-6 mb-16"
                >
                    {awards.map((award, index) => (
                        <div key={index} className="bg-gray-50 rounded-2xl px-6 py-4 text-center">
                            <Award className="w-8 h-8 text-red-600 mx-auto mb-2" />
                            <p className="font-bold text-gray-900">{award.title}</p>
                            <p className="text-sm text-gray-600">{award.subtitle}</p>
                            <p className="text-xs text-gray-400">{award.source}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Reviews Carousel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative overflow-hidden"
                >
                    <div className="flex gap-6 animate-marquee hover:pause">
                        {[...reviews, ...reviews].map((review, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-80 bg-gray-50 rounded-3xl p-6"
                            >
                                <Quote className="w-8 h-8 text-red-600/30 mb-4" />
                                <p className="text-gray-700 mb-4 text-sm leading-relaxed">{review.text}</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(Math.floor(review.rating))].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                </div>
                                <p className="font-semibold text-gray-900 mt-2">{review.author}</p>
                                <p className="text-xs text-gray-500">{review.source}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
