import { Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
    const links = {
        Product: ['Everyday account', 'Invest', 'Pillar 3a', 'Cards'],
        Company: ['About us', 'Careers', 'Press', 'Blog'],
        Support: ['Help Center', 'Contact', 'Status'],
        Legal: ['Privacy', 'Terms', 'Imprint']
    };

    return (
        <footer className="bg-white py-16 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Logo */}
                    <div className="lg:col-span-1">
                        <img
                            src="/ubs-logo.png"
                            alt="UBS Wealth Management"
                            className="h-12 w-auto object-contain mb-4"
                        />
                    </div>

                    {/* Links */}
                    {Object.entries(links).map(([category, items]) => (
                        <div key={category}>
                            <h4 className="font-semibold text-gray-900 mb-4">{category}</h4>
                            <ul className="space-y-3">
                                {items.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-600 hover:text-red-600 transition-colors text-sm">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
                    <p className="text-sm text-gray-500 mb-4 md:mb-0">
                        © UBS Wealth Management 2025. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
                            <MessageCircle className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
