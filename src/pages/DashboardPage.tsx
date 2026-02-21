import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home, TrendingUp, ArrowUpRight, ArrowDownRight,
    Send, Download, Bell, User, ChevronRight,
    Building2, Briefcase, LineChart, LogOut
} from 'lucide-react';
import {
    AreaChart, Area, ResponsiveContainer, PieChart as RePieChart,
    Pie, Cell, Tooltip
} from 'recharts';
import { useNavigate } from 'react-router-dom';

// Dynamic greeting based on real time
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
};

// Deny vibration — short sharp pattern like "access denied"
const denyVibrate = () => {
    if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50, 30, 80]);
    }
};

// Types
interface Stock {
    symbol: string;
    name: string;
    shares: number;
    price: number;
    change: number;
    value: number;
    color: string;
}

// Mock data - Total portfolio value: €14,000,000
const stocksData: Stock[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 5000, price: 185.50, change: 2.34, value: 927500, color: '#007AFF' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 2500, price: 420.75, change: 1.89, value: 1051875, color: '#00A4EF' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 1800, price: 890.25, change: 4.56, value: 1602450, color: '#76B900' },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 4000, price: 245.80, change: -1.23, value: 983200, color: '#CC0000' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 2000, price: 175.90, change: 0.87, value: 351800, color: '#4285F4' },
    { symbol: 'AMZN', name: 'Amazon.com', shares: 8000, price: 178.35, change: 1.45, value: 1426800, color: '#FF9900' },
    { symbol: 'META', name: 'Meta Platforms', shares: 2000, price: 505.20, change: 3.21, value: 1010400, color: '#0668E1' },
    { symbol: 'BTC', name: 'Bitcoin', shares: 5, price: 67500, change: 5.67, value: 337500, color: '#F7931A' },
    { symbol: 'ETH', name: 'Ethereum', shares: 150, price: 2450, change: 3.89, value: 367500, color: '#627EEA' },
    { symbol: 'GOVT', name: 'US Treasury Bonds', shares: 800, price: 980, change: 0.25, value: 784000, color: '#10B981' },
    { symbol: 'GLD', name: 'SPDR Gold Shares', shares: 2000, price: 185, change: 0.65, value: 370000, color: '#F59E0B' },
    { symbol: 'VTI', name: 'Vanguard Total Stock', shares: 1200, price: 255, change: 1.12, value: 306000, color: '#8B5CF6' },
    { symbol: 'BND', name: 'Vanguard Total Bond', shares: 2500, price: 72, change: -0.15, value: 180000, color: '#06B6D4' },
    { symbol: 'REIT', name: 'Real Estate ETF', shares: 1800, price: 89, change: 0.45, value: 160200, color: '#EC4899' },
    { symbol: 'CASH', name: 'Cash & Equivalents', shares: 1, price: 4140775, change: 0, value: 4140775, color: '#6B7280' },
];

const chartData = [
    { name: 'Jan', value: 12500000 },
    { name: 'Feb', value: 12800000 },
    { name: 'Mar', value: 13200000 },
    { name: 'Apr', value: 12900000 },
    { name: 'May', value: 13500000 },
    { name: 'Jun', value: 13800000 },
    { name: 'Jul', value: 14000000 },
];

// Format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
    }).format(amount);
};

// Shake animation keyframes for "denied" effect
const shakeAnimation = {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.5 }
};

// Dashboard Component
function Dashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
    const [showBalance, setShowBalance] = useState(true);
    const [animatedBalance, setAnimatedBalance] = useState(0);
    const [greeting, setGreeting] = useState(getGreeting());
    const [userName, setUserName] = useState('User');
    const [shakeWithdraw, setShakeWithdraw] = useState(false);
    const [shakeTransfer, setShakeTransfer] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Set user name from session
        const storedName = sessionStorage.getItem('ubs_user_name');
        if (storedName) setUserName(storedName);

        // Update greeting every minute
        const greetingInterval = setInterval(() => {
            setGreeting(getGreeting());
        }, 60000);

        // Animate balance
        const duration = 2000;
        const steps = 60;
        const increment = 14000000 / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= 14000000) {
                setAnimatedBalance(14000000);
                clearInterval(timer);
            } else {
                setAnimatedBalance(current);
            }
        }, duration / steps);

        return () => {
            clearInterval(timer);
            clearInterval(greetingInterval);
        };
    }, []);

    const handleDenyAction = (type: 'withdraw' | 'transfer') => {
        denyVibrate();
        if (type === 'withdraw') {
            setShakeWithdraw(true);
            setTimeout(() => setShakeWithdraw(false), 600);
        } else {
            setShakeTransfer(true);
            setTimeout(() => setShakeTransfer(false), 600);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('ubs_authenticated');
        sessionStorage.removeItem('ubs_user_name');
        navigate('/');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white pt-12 pb-8 px-6 rounded-b-[32px]">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white/70 text-sm">{greeting},</p>
                            <p className="font-semibold text-lg">{userName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full"></span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                            title="Sign out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Balance Card */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm font-medium tracking-wider">TOTAL BALANCE</span>
                        <button
                            onClick={() => setShowBalance(!showBalance)}
                            className="text-white/70 hover:text-white transition-colors"
                        >
                            {showBalance ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-baseline gap-1"
                    >
                        <span className="text-white/70 text-2xl font-light">€</span>
                        <span className="text-4xl font-bold tracking-tight">
                            {showBalance ? formatCurrency(animatedBalance).replace('€', '') : '••••••'}
                        </span>
                    </motion.div>
                    <div className="flex items-center gap-2 mt-3">
                        <span className="bg-green-500/30 text-green-300 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> +12.5%
                        </span>
                        <span className="text-white/50 text-xs">vs last month</span>
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 -mt-4">
                <div className="flex gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDenyAction('withdraw')}
                        animate={shakeWithdraw ? shakeAnimation : {}}
                        className="flex-1 bg-white rounded-2xl p-4 shadow-lg shadow-red-100 flex flex-col items-center gap-2 border border-gray-100"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
                            <Download className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Withdraw</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDenyAction('transfer')}
                        animate={shakeTransfer ? shakeAnimation : {}}
                        className="flex-1 bg-white rounded-2xl p-4 shadow-lg shadow-red-100 flex flex-col items-center gap-2 border border-gray-100"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200">
                            <Send className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Transfer</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNavigate('stocks')}
                        className="flex-1 bg-white rounded-2xl p-4 shadow-lg shadow-red-100 flex flex-col items-center gap-2 border border-gray-100"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Stocks</span>
                    </motion.button>
                </div>
            </div>

            {/* Portfolio Overview */}
            <div className="px-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Portfolio Performance</h3>
                    <button className="text-red-600 text-sm font-medium flex items-center gap-1">
                        View all <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-100 border border-gray-100"
                >
                    <div className="h-40 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#dc2626"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between text-sm">
                        <div>
                            <p className="text-gray-500">Total Invested</p>
                            <p className="font-semibold text-gray-800">{formatCurrency(12500000)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500">Total Return</p>
                            <p className="font-semibold text-green-600">+{formatCurrency(1500000)}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Breathing space */}
            <div className="h-40"></div>

        </motion.div>
    );
}

// Stocks Component
function Stocks({ onNavigate }: { onNavigate: (page: string) => void }) {
    const totalValue = stocksData.reduce((acc, stock) => acc + stock.value, 0);
    const totalChange = stocksData.reduce((acc, stock) => acc + (stock.value * stock.change / 100), 0);
    const changePercent = (totalChange / totalValue) * 100;

    const pieData = stocksData.map(stock => ({
        name: stock.symbol,
        value: stock.value,
        color: stock.color
    }));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white pt-12 pb-8 px-6">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => onNavigate('dashboard')}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <h1 className="text-xl font-semibold">My Portfolio</h1>
                </div>

                {/* Portfolio Value */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="text-white/70 text-sm font-medium tracking-wider mb-1">TOTAL PORTFOLIO VALUE</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-white/70 text-3xl font-light">€</span>
                        <span className="text-5xl font-bold tracking-tight">{formatCurrency(totalValue).replace('€', '')}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        <span className={`${changePercent >= 0 ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300'} text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
                            {changePercent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
                        </span>
                        <span className="text-white/50 text-xs">Today</span>
                    </div>
                </motion.div>
            </div>

            {/* Portfolio Chart */}
            <div className="px-6 -mt-4">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-100 border border-gray-100"
                >
                    <h3 className="font-semibold text-gray-800 mb-4">Asset Allocation</h3>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => formatCurrency(value)}
                                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                />
                            </RePieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {pieData.slice(0, 4).map((item) => (
                            <div key={item.name} className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-xs text-gray-600">{item.name}</span>
                            </div>
                        ))}
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            <span className="text-xs text-gray-600">+{pieData.length - 4} more</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Stock List */}
            <div className="px-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Your Holdings</h3>
                    <button className="text-red-600 text-sm font-medium flex items-center gap-1">
                        <LineChart className="w-4 h-4" /> View Chart
                    </button>
                </div>

                <div className="space-y-3">
                    {stocksData.map((stock, index) => (
                        <motion.div
                            key={stock.symbol}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                        style={{ backgroundColor: stock.color }}
                                    >
                                        {stock.symbol.slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{stock.symbol}</p>
                                        <p className="text-xs text-gray-500">{stock.shares.toLocaleString()} shares</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-800">{formatCurrency(stock.value)}</p>
                                    <div className={`flex items-center gap-1 text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {stock.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                                <span className="text-gray-500">Price per share</span>
                                <span className="font-medium text-gray-700">{formatCurrency(stock.price)}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Market Overview */}
            <div className="px-6 mt-6">
                <h3 className="font-semibold text-gray-800 mb-4">Market Overview</h3>
                <div className="grid grid-cols-2 gap-3">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Building2 className="w-5 h-5 text-red-600" />
                            <span className="text-sm font-medium text-gray-700">S&P 500</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800">4,783.45</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> +0.85%
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.65 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="w-5 h-5 text-red-600" />
                            <span className="text-sm font-medium text-gray-700">NASDAQ</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800">15,056.92</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> +1.23%
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

// Bottom Navigation
function BottomNav({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex justify-around items-center max-w-md mx-auto">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('dashboard')}
                    className={`flex flex-col items-center gap-1 ${currentPage === 'dashboard' ? 'text-red-600' : 'text-gray-400'}`}
                >
                    <div className={`p-2 rounded-xl transition-all ${currentPage === 'dashboard' ? 'bg-red-100' : ''}`}>
                        <Home className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium">Home</span>
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('stocks')}
                    className={`flex flex-col items-center gap-1 ${currentPage === 'stocks' ? 'text-red-600' : 'text-gray-400'}`}
                >
                    <div className={`p-2 rounded-xl transition-all ${currentPage === 'stocks' ? 'bg-red-100' : ''}`}>
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium">Stocks</span>
                </motion.button>
            </div>
        </div>
    );
}

// Main Dashboard Page (with auth guard)
export default function DashboardPage() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const navigate = useNavigate();

    // Auth guard — redirect to login if not authenticated
    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('ubs_authenticated');
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
            <AnimatePresence mode="wait">
                {currentPage === 'dashboard' && (
                    <Dashboard key="dashboard" onNavigate={setCurrentPage} />
                )}
                {currentPage === 'stocks' && (
                    <Stocks key="stocks" onNavigate={setCurrentPage} />
                )}
            </AnimatePresence>

            <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>
    );
}
